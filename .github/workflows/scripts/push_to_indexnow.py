import requests
import xml.etree.ElementTree as ET

SITEMAP_PATH = "docs/.vuepress/dist/sitemap.xml"
DOMAIN = "manual.njust.wiki"
KEY = "7a431b3685664b3082d8f4ea797f90a4"
KEY_LOCATION = f"https://{DOMAIN}/{KEY}.txt"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow"

def parse_urls_from_sitemap(path):
    tree = ET.parse(path)
    root = tree.getroot()
    urls = []
    for url in root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url"):
        loc = url.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
        if loc is not None and loc.text:
            urls.append(loc.text.strip())
    return urls

def push_to_indexnow(urls):
    payload = {
        "host": DOMAIN,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls
    }

    headers = {"Content-Type": "application/json; charset=utf-8"}
    response = requests.post(INDEXNOW_ENDPOINT, headers=headers, json=payload)

    if response.status_code == 200:
        print(f"✅ 成功推送 {len(urls)} 个链接到 IndexNow")
    else:
        print(f"❌ 推送失败（HTTP {response.status_code}）")
        print(response.text)

if __name__ == "__main__":
    urls = parse_urls_from_sitemap(SITEMAP_PATH)
    print(f"🌐 从 sitemap.xml 提取 {len(urls)} 个 URL")
    push_to_indexnow(urls)
print(f"Finished")