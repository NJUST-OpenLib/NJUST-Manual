import time
import requests
import xml.etree.ElementTree as ET
import traceback
import time
import os

SITEMAP_PATH = "docs/.vuepress/dist/sitemap.xml"

# 站点配置
HOST = os.environ.get("SITE_HOST", "manual.njust.wiki")

# IndexNow配置
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"
INDEXNOW_KEY = os.environ.get("INDEXNOW_KEY", "7a431b3685664b3082d8f4ea797f90a4")
KEY_LOCATION = f"https://{HOST}/{INDEXNOW_KEY}.txt"

# 百度推送配置
BAIDU_ENDPOINT = "http://data.zz.baidu.com/urls"
BAIDU_SITE = os.environ.get("BAIDU_SITE", f"https://{HOST}")
BAIDU_TOKEN = os.environ.get("BAIDU_TOKEN", "G85y0II523x6MKWv")
BAIDU_URL = f"{BAIDU_ENDPOINT}?site={BAIDU_SITE}&token={BAIDU_TOKEN}"
BAIDU_BATCH_SIZE = int(os.environ.get("BAIDU_BATCH_SIZE", "5"))  # 百度推送每批次URL数量限制

# 是否启用各推送渠道
ENABLE_INDEXNOW = os.environ.get("ENABLE_INDEXNOW", "true").lower() == "true"
ENABLE_BAIDU = os.environ.get("ENABLE_BAIDU", "true").lower() == "true"

MAX_RETRIES = 3
RETRY_DELAY = 3  # 秒

NS = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}

def load_sitemap(path):
    try:
        tree = ET.parse(path)
        root = tree.getroot()
        return root
    except Exception as e:
        print(f"❌ 读取 sitemap 文件失败：{e}")
        print(traceback.format_exc())
        return None

def extract_urls(root):
    try:
        urls = [url.find("ns:loc", NS).text for url in root.findall("ns:url", NS) if url.find("ns:loc", NS) is not None]
        return urls
    except Exception as e:
        print(f"❌ 解析 sitemap URL 失败：{e}")
        print(traceback.format_exc())
        return []

def push_to_indexnow(payload):
    for attempt in range(1, MAX_RETRIES + 1):
        print(f"📤 第 {attempt} 次尝试推送到 IndexNow，共 {MAX_RETRIES} 次...")
        try:
            response = requests.post(INDEXNOW_ENDPOINT, json=payload, timeout=10)
            if response.status_code == 200:
                print(f"✅ 成功推送 {len(payload['urlList'])} 个链接到 IndexNow。")
                return True
            else:
                print(f"❌ 推送到 IndexNow 失败，状态码：{response.status_code}")
                print(f"响应内容：{response.text}")
        except requests.exceptions.RequestException as e:
            print(f"❌ 请求异常：{e}")
            print(traceback.format_exc())
        if attempt < MAX_RETRIES:
            print(f"⏳ 等待 {RETRY_DELAY} 秒后重试...")
            time.sleep(RETRY_DELAY)
        else:
            print("🚨 达到最大重试次数，推送到 IndexNow 失败。")
            return False

def push_to_baidu(urls):
    # 如果URL数量超过批次大小，分批推送
    if len(urls) > BAIDU_BATCH_SIZE:
        print(f"🔢 URL数量({len(urls)})超过单批次限制({BAIDU_BATCH_SIZE})，将分批推送")
        batches = [urls[i:i + BAIDU_BATCH_SIZE] for i in range(0, len(urls), BAIDU_BATCH_SIZE)]
        
        success_count = 0
        total_batches = len(batches)
        
        for i, batch in enumerate(batches):
            print(f"\n📦 推送批次 {i+1}/{total_batches} (包含 {len(batch)} 个URL)")
            if push_to_baidu_batch(batch):
                success_count += 1
            else:
                print(f"❌ 批次 {i+1} 推送失败，停止后续批次推送")
                break
            
            # 批次之间暂停，避免频率过高
            if i < total_batches - 1:
                print(f"⏱️ 批次间隔等待 {RETRY_DELAY} 秒...")
                time.sleep(RETRY_DELAY)
        
        return success_count > 0
    else:
        return push_to_baidu_batch(urls)

def push_to_baidu_batch(urls):
    # 创建临时文件存储URL列表
    temp_file = "urls.txt"
    with open(temp_file, "w") as f:
        f.write("\n".join(urls))
    
    for attempt in range(1, MAX_RETRIES + 1):
        print(f"📤 第 {attempt} 次尝试推送到百度，共 {MAX_RETRIES} 次...")
        try:
            with open(temp_file, "rb") as f:
                headers = {"Content-Type": "text/plain"}
                response = requests.post(BAIDU_URL, headers=headers, data=f, timeout=10)
                
                # 尝试解析响应为JSON
                try:
                    result = response.json()
                except:
                    result = {}
                    
                if response.status_code == 200:
                    if "success" in result and result["success"] > 0:
                        print(f"✅ 成功推送 {result['success']} 个链接到百度。")
                        if "remain" in result:
                            print(f"📊 今日剩余的可推送 URL 条数：{result['remain']}")
                        os.remove(temp_file)  # 删除临时文件
                        return True
                    else:
                        print(f"❌ 百度推送响应异常：{response.text}")
                else:
                    print(f"❌ 推送到百度失败，状态码：{response.status_code}")
                    print(f"响应内容：{response.text}")
                    
                    # 检查是否是配额超限错误
                    if response.status_code == 400 and isinstance(result, dict):
                        if result.get("message") == "over quota":
                            print("⚠️ 百度推送配额已用尽，今日无法继续推送。请明天再试。")
                            try:
                                os.remove(temp_file)  # 删除临时文件
                            except:
                                pass
                            return False  # 配额用尽，不再重试
        except Exception as e:
            print(f"❌ 百度推送请求异常：{e}")
            print(traceback.format_exc())
            
        # 判断是否需要重试
        if attempt < MAX_RETRIES:
            print(f"⏳ 等待 {RETRY_DELAY} 秒后重试...")
            time.sleep(RETRY_DELAY)
        else:
            print("🚨 达到最大重试次数，推送到百度失败。")
            try:
                os.remove(temp_file)  # 删除临时文件
            except:
                pass
            return False

def main():
    print("🔍 搜索引擎推送工具启动")
    print(f"📋 配置信息：")
    print(f"  - 站点: {HOST}")
    print(f"  - IndexNow推送: {'启用' if ENABLE_INDEXNOW else '禁用'}")
    print(f"  - 百度推送: {'启用' if ENABLE_BAIDU else '禁用'}")
    print(f"  - 百度批次大小: {BAIDU_BATCH_SIZE}")
    
    root = load_sitemap(SITEMAP_PATH)
    if not root:
        print("🚫 退出：未能加载 sitemap.xml")
        exit(1)

    urls = extract_urls(root)
    if not urls:
        print("⚠️ 没有从 sitemap 中提取到任何链接，跳过推送。")
        exit(0)
    
    print(f"📊 从sitemap中提取到 {len(urls)} 个URL")
    
    success_channels = 0
    total_channels = 0
    
    # 推送到 IndexNow
    indexnow_success = False
    if ENABLE_INDEXNOW:
        total_channels += 1
        print("\n🔄 开始推送到 IndexNow...")
        payload = {
            "host": HOST,
            "key": INDEXNOW_KEY,
            "keyLocation": KEY_LOCATION,
            "urlList": urls,
        }
        indexnow_success = push_to_indexnow(payload)
        if indexnow_success:
            success_channels += 1
    else:
        print("\n⏭️ IndexNow推送已禁用，跳过")
    
    # 推送到百度
    baidu_success = False
    if ENABLE_BAIDU:
        total_channels += 1
        print("\n🔄 开始推送到百度...")
        baidu_success = push_to_baidu(urls)
        if baidu_success:
            success_channels += 1
    else:
        print("\n⏭️ 百度推送已禁用，跳过")
    
    # 输出总结
    print(f"\n📝 推送总结: {success_channels}/{total_channels} 个渠道成功")
    
    # 只要有一个推送成功，就算成功
    if success_channels == 0 and total_channels > 0:
        print("\n❌ 所有推送渠道均失败")
        exit(1)
    else:
        print("\n✅ 推送完成")
        if ENABLE_INDEXNOW:
            if not indexnow_success:
                print("⚠️ IndexNow 推送失败")
            else:
                print("✅ IndexNow 推送正常")
        if ENABLE_BAIDU:
            if not baidu_success:
                print("⚠️ 百度推送失败")

if __name__ == "__main__":
    main()
