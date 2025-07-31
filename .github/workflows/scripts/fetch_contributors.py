#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
import json
import os
from pathlib import Path
from dotenv import load_dotenv

# === 可配置项 ===
OWNER = "NJUST-OpenLib"       # GitHub 仓库所属组织或用户
REPO = "NJUST-Manual"     # 仓库名
PER_PAGE = 100        # 每页拉取数量
OUT_FILE = Path("docs/.vuepress/public/contributors.json")  # 输出路径

# === 加载 Token（推荐将 GITHUB_TOKEN 写入 .env 文件）===
load_dotenv()
TOKEN = os.environ.get("GITHUB_TOKEN")

# === 请求头 ===
headers = {
    "Accept": "application/vnd.github+json"
}
if TOKEN:
    headers["Authorization"] = f"Bearer {TOKEN}"


def fetch_all_contributors():
    """分页拉取 GitHub 贡献者信息"""
    contributors = []
    page = 1
    while True:
        url = f"https://api.github.com/repos/{OWNER}/{REPO}/contributors?per_page={PER_PAGE}&page={page}"
        print(f"[...] Fetching page {page}")
        resp = requests.get(url, headers=headers)
        if resp.status_code != 200:
            raise Exception(f"[×] Failed to fetch data: {resp.status_code} {resp.text}")
        data = resp.json()
        if not data:
            break
        contributors.extend(data)
        page += 1
    print(f"[✓] Total contributors fetched: {len(contributors)}")
    return contributors


def simplify_fields(raw_data):
    """只保留必要字段"""
    keys = ["login", "avatar_url", "html_url", "contributions"]
    return [{k: user[k] for k in keys if k in user} for user in raw_data]


def save_to_file(data):
    """保存为 JSON 文件"""
    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with OUT_FILE.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"[✓] Saved to {OUT_FILE}")


if __name__ == "__main__":
    try:
        raw = fetch_all_contributors()
        simplified = simplify_fields(raw)
        save_to_file(simplified)
    except Exception as e:
        print(f"[×] Error: {e}")
