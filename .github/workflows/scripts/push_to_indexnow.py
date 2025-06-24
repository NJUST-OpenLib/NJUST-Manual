import time
import requests
import xml.etree.ElementTree as ET
import traceback

SITEMAP_PATH = "docs/.vuepress/dist/sitemap.xml"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"
KEY = "7a431b3685664b3082d8f4ea797f90a4"
HOST = "manual.njust.wiki"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
MAX_RETRIES = 3
RETRY_DELAY = 5  # 秒

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
        print(f"📤 第 {attempt} 次尝试推送，共 {MAX_RETRIES} 次...")
        try:
            response = requests.post(INDEXNOW_ENDPOINT, json=payload, timeout=10)
            if response.status_code == 200:
                print(f"✅ 成功推送 {len(payload['urlList'])} 个链接到 IndexNow。")
                return True
            else:
                print(f"❌ 推送失败，状态码：{response.status_code}")
                print(f"响应内容：{response.text}")
        except requests.exceptions.RequestException as e:
            print(f"❌ 请求异常：{e}")
            print(traceback.format_exc())
        if attempt < MAX_RETRIES:
            print(f"⏳ 等待 {RETRY_DELAY} 秒后重试...")
            time.sleep(RETRY_DELAY)
        else:
            print("🚨 达到最大重试次数，推送失败。")
            return False

def main():
    root = load_sitemap(SITEMAP_PATH)
    if not root:
        print("🚫 退出：未能加载 sitemap.xml")
        exit(1)

    urls = extract_urls(root)
    if not urls:
        print("⚠️ 没有从 sitemap 中提取到任何链接，跳过推送。")
        exit(0)

    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }

    success = push_to_indexnow(payload)
    if not success:
        exit(1)

if __name__ == "__main__":
    main()
