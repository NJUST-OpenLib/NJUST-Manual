import fs from 'fs/promises';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';

// 站点地图路径，建议绝对路径
const SITEMAP_PATH = path.resolve(process.cwd(), "docs/.vuepress/dist/sitemap.xml");

// 配置项 - 从环境变量中读取或使用默认值
const HOST = process.env.SITE_HOST || "manual.njust.wiki";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "7a431b3685664b3082d8f4ea797f90a4";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const BAIDU_ENDPOINT = "http://data.zz.baidu.com/urls";
const BAIDU_SITE = process.env.BAIDU_SITE || `https://${HOST}`;
const BAIDU_TOKEN = process.env.BAIDU_TOKEN || "G85y0II523x6MKWv";
const BAIDU_URL = `${BAIDU_ENDPOINT}?site=${BAIDU_SITE}&token=${BAIDU_TOKEN}`;
const BAIDU_BATCH_SIZE = parseInt(process.env.BAIDU_BATCH_SIZE, 10) || 5;

const ENABLE_INDEXNOW = (process.env.ENABLE_INDEXNOW || "true").toLowerCase() === "true";
const ENABLE_BAIDU = (process.env.ENABLE_BAIDU || "true").toLowerCase() === "true";

const MAX_RETRIES = 3;
const RETRY_DELAY = 3000; // 毫秒

// XML解析器配置，忽略命名空间前缀
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  ignoreNameSpace: true,
});

/**
 * 暂停指定毫秒数
 * @param {number} ms - 毫秒数
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 读取并解析 sitemap 文件，提取 URL 列表
 * @param {string} filePath 
 * @returns {Promise<string[]|null>}
 */
async function loadSitemap(filePath) {
  try {
    const xmlContent = await fs.readFile(filePath, 'utf-8');
    const parsedData = parser.parse(xmlContent);

    // 调试打印解析结构，确认正确
    // console.log("解析后的sitemap结构:", JSON.stringify(parsedData, null, 2));

    const urlSet = parsedData["urlset"];
    if (!urlSet || !urlSet["url"]) {
      console.log("⚠️ sitemap 文件没有找到 URL 列表。");
      return null;
    }

    // urlSet["url"] 可能是数组或单个对象，统一成数组处理
    const urlEntries = Array.isArray(urlSet["url"]) ? urlSet["url"] : [urlSet["url"]];
    const urls = urlEntries.map(entry => entry["loc"]);
    return urls;
  } catch (e) {
    console.error(`❌ 读取或解析 sitemap 文件失败：${e.message}`);
    return null;
  }
}

/**
 * 推送 URL 到 IndexNow
 * @param {string[]} urls 
 * @returns {Promise<boolean>}
 */
async function pushToIndexnow(urls) {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    console.log(`📤 第 ${attempt} 次尝试推送到 IndexNow，共 ${MAX_RETRIES} 次...`);
    try {
      const response = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        timeout: 10000,
      });

      if (response.ok) {
        console.log(`✅ 成功推送 ${urls.length} 个链接到 IndexNow。`);
        return true;
      } else {
        const text = await response.text();
        console.log(`❌ 推送到 IndexNow 失败，状态码：${response.status}`);
        console.log(`响应内容：${text}`);
      }
    } catch (e) {
      console.error(`❌ 请求异常：${e.message}`);
    }

    if (attempt < MAX_RETRIES) {
      console.log(`⏳ 等待 ${RETRY_DELAY / 1000} 秒后重试...`);
      await sleep(RETRY_DELAY);
    }
  }

  console.error("🚨 达到最大重试次数，推送到 IndexNow 失败。");
  return false;
}

/**
 * 推送 URL 到百度，支持批次分批推送
 * @param {string[]} urls 
 * @returns {Promise<boolean>}
 */
async function pushToBaidu(urls) {
  if (urls.length > BAIDU_BATCH_SIZE) {
    console.log(`🔢 URL数量(${urls.length})超过单批次限制(${BAIDU_BATCH_SIZE})，将分批推送`);
    const batches = [];
    for (let i = 0; i < urls.length; i += BAIDU_BATCH_SIZE) {
      batches.push(urls.slice(i, i + BAIDU_BATCH_SIZE));
    }

    let successCount = 0;
    const totalBatches = batches.length;

    for (let i = 0; i < totalBatches; i++) {
      console.log(`\n📦 推送批次 ${i + 1}/${totalBatches} (包含 ${batches[i].length} 个URL)`);
      if (await pushToBaiduBatch(batches[i])) {
        successCount++;
      } else {
        console.log(`❌ 批次 ${i + 1} 推送失败，停止后续批次推送`);
        break;
      }

      if (i < totalBatches - 1) {
        console.log(`⏱️ 批次间隔等待 ${RETRY_DELAY / 1000} 秒...`);
        await sleep(RETRY_DELAY);
      }
    }

    return successCount > 0;
  } else {
    return pushToBaiduBatch(urls);
  }
}

/**
 * 推送一批 URL 到百度
 * @param {string[]} urls 
 * @returns {Promise<boolean>}
 */
async function pushToBaiduBatch(urls) {
  const urlBody = urls.join('\n');

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    console.log(`📤 第 ${attempt} 次尝试推送到百度，共 ${MAX_RETRIES} 次...`);
    try {
      const response = await fetch(BAIDU_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: urlBody,
        timeout: 10000,
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        if (result.success && result.success > 0) {
          console.log(`✅ 成功推送 ${result.success} 个链接到百度。`);
          if (result.remain !== undefined) {
            console.log(`📊 今日剩余的可推送 URL 条数：${result.remain}`);
          }
          return true;
        } else {
          console.log(`❌ 百度推送响应异常：${JSON.stringify(result)}`);
        }
      } else {
        console.log(`❌ 推送到百度失败，状态码：${response.status}`);
        console.log(`响应内容：${JSON.stringify(result)}`);

        if (response.status === 400 && result.message === "over quota") {
          console.log("⚠️ 百度推送配额已用尽，今日无法继续推送。请明天再试。");
          return false;
        }
      }
    } catch (e) {
      console.error(`❌ 百度推送请求异常：${e.message}`);
    }

    if (attempt < MAX_RETRIES) {
      console.log(`⏳ 等待 ${RETRY_DELAY / 1000} 秒后重试...`);
      await sleep(RETRY_DELAY);
    }
  }

  console.error("🚨 达到最大重试次数，推送到百度失败。");
  return false;
}

/**
 * 主函数，协调推送流程
 */
async function main() {
  console.log("🔍 搜索引擎推送工具启动");
  console.log("📋 配置信息：");
  console.log(` - 站点: ${HOST}`);
  console.log(` - IndexNow推送: ${ENABLE_INDEXNOW ? '启用' : '禁用'}`);
  console.log(` - 百度推送: ${ENABLE_BAIDU ? '启用' : '禁用'}`);
  console.log(` - 百度批次大小: ${BAIDU_BATCH_SIZE}`);

  const urls = await loadSitemap(SITEMAP_PATH);
  if (!urls) {
    console.log("🚫 退出：未能加载 sitemap.xml");
    process.exit(1);
  }

  if (urls.length === 0) {
    console.log("⚠️ 没有从 sitemap 中提取到任何链接，跳过推送。");
    process.exit(0);
  }

  console.log(`📊 从sitemap中提取到 ${urls.length} 个URL`);

  let successChannels = 0;
  let totalChannels = 0;
  let indexnowSuccess = false;
  let baiduSuccess = false;

  if (ENABLE_INDEXNOW) {
    totalChannels++;
    console.log("\n🔄 开始推送到 IndexNow...");
    indexnowSuccess = await pushToIndexnow(urls);
    if (indexnowSuccess) successChannels++;
  } else {
    console.log("\n⏭️ IndexNow推送已禁用，跳过");
  }

  if (ENABLE_BAIDU) {
    totalChannels++;
    console.log("\n🔄 开始推送到百度...");
    baiduSuccess = await pushToBaidu(urls);
    if (baiduSuccess) successChannels++;
  } else {
    console.log("\n⏭️ 百度推送已禁用，跳过");
  }

  console.log(`\n📝 推送总结: ${successChannels}/${totalChannels} 个渠道成功`);

  if (totalChannels > 0 && successChannels === 0) {
    console.log("\n❌ 所有推送渠道均失败");
    process.exit(1);
  } else {
    console.log("\n✅ 推送完成");
    if (ENABLE_INDEXNOW) console.log(indexnowSuccess ? "✅ IndexNow 推送正常" : "⚠️ IndexNow 推送失败");
    if (ENABLE_BAIDU) console.log(baiduSuccess ? "✅ 百度推送正常" : "⚠️ 百度推送失败");
  }
}

// 运行主函数
main();
