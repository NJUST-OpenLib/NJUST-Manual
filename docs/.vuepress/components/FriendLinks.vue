<template>
  <div class="friend-links-container">
    <div class="header-wrapper">
      <h3 class="friend-links-title">{{ title || '友情链接' }}</h3>
      <a 
        :href="applyUrl" 
        class="apply-link" 
        target="_self"
        :aria-label="`申请添加友情链接`"
      >
        <span>申请</span>
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <span>加载链接中...</span>
    </div>
    
    <!-- 错误状态 -->
    <div v-else-if="error" class="error-state">
      <i class="error-icon">⚠️</i>
      <span>{{ error }}</span>
    </div>
    
    <!-- 链接列表 -->
    <div v-else class="links-grid">
      <a 
        v-for="(link, index) in links" 
        :key="index" 
        :href="link.url" 
        class="link-card" 
        target="_blank" 
        rel="noopener noreferrer"
        :aria-label="`访问${link.name}网站`"
      >
        <div class="link-logo">
          <img :src="link.logo" :alt="link.name + ' logo'" class="logo-img" loading="lazy" />
        </div>
        <div class="link-info">
          <h4 class="link-name">{{ link.name }}</h4>
          <p class="link-desc">{{ link.desc }}</p>
        </div>
        <div class="link-arrow">
          <i class="fas fa-external-link-alt"></i>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FriendLinks',
  props: {
    title: {
      type: String,
      default: '友情链接'
    },
    dataUrl: {
      type: String,
      default: '/friend-links.json' // JSON数据文件路径
    },
    applyUrl: {
      type: String,
      default: '/apply-link' // 申请页面URL
    }
  },
  data() {
    return {
      links: [],
      loading: true,
      error: null
    }
  },
  async mounted() {
    try {
      // 从JSON文件加载链接数据
      const response = await fetch(this.dataUrl);
      
      if (!response.ok) {
        throw new Error(`加载失败: ${response.statusText}`);
      }
      
      const data = await response.json();
      this.links = data;
    } catch (err) {
      console.error('友情链接加载错误:', err);
      this.error = '无法加载友情链接数据';
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
/* 基础样式与日夜间模式变量定义 */
:root {
  /* 日间模式变量 */
  --bg-card: #ffffff;
  --bg-hover: #f8fafc;
  --text-title: #1e293b;
  --text-primary: #334155;
  --text-secondary: #64748b;
  --text-tertiary: #94a3b8;
  --brand: #3b82f6;
  --brand-light: #60a5fa;
  --shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  --shadow-hover: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  --danger: #dc2626;
  --danger-bg: #fff5f5;
}

/* 夜间模式变量 */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-card: #1e293b;
    --bg-hover: #334155;
    --text-title: #f8fafc;
    --text-primary: #e2e8f0;
    --text-secondary: #cbd5e1;
    --text-tertiary: #94a3b8;
    --brand: #60a5fa;
    --brand-light: #93c5fd;
    --shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    --shadow-hover: 0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
    --danger: #f87171;
    --danger-bg: #1f2937;
  }
}

/* 容器样式 */
.friend-links-container {
  margin: 2.5rem 0;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: var(--bg-card);
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* 头部标题与申请按钮容器 */
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.5rem;
}

/* 标题样式 */
.friend-links-title {
  margin: 0 0 0.75rem 0;
  padding-bottom: 0.75rem;
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--text-title);
  border-bottom: 2px solid var(--brand);
  display: inline-block;
}

/* 申请链接按钮 */
.apply-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--brand);
  text-decoration: none;
  border-radius: 6px;
  background-color: transparent;
  border: 1px solid var(--brand);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 0.75rem;
}

.apply-link:hover {
  color: var(--bg-card);
  background-color: var(--brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
}

.apply-link i {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.apply-link:hover i {
  transform: translateX(3px);
}

/* 链接网格布局 */
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

/* 链接卡片样式 */
.link-card {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  background-color: var(--bg-card);
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* 卡片悬停动画效果 */
.link-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  background-color: var(--bg-hover);
}

/* 悬停时的装饰效果 */
.link-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: var(--brand);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.link-card:hover::before {
  transform: scaleY(1);
}

/* Logo容器 */
.link-logo {
  flex: 0 0 64px;
  margin-right: 1.25rem;
  z-index: 1;
}

/* Logo图片 */
.logo-img {
  width: 100%;
  height: 64px;
  object-fit: contain;
  border-radius: 4px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 4px;
  background-color: var(--bg-card);
}

.link-card:hover .logo-img {
  transform: scale(1.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* 链接信息区域 */
.link-info {
  flex: 1;
  min-width: 0;
  z-index: 1;
}

/* 链接名称 */
.link-name {
  margin: 0 0 0.35rem 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-title);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s ease;
}

.link-card:hover .link-name {
  color: var(--brand);
}

/* 链接描述 */
.link-desc {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.link-card:hover .link-desc {
  color: var(--text-primary);
}

/* 箭头图标 */
.link-arrow {
  flex: 0 0 auto;
  color: var(--text-tertiary);
  transition: all 0.3s ease;
  z-index: 1;
  padding-left: 0.5rem;
  opacity: 0.7;
}

.link-card:hover .link-arrow {
  color: var(--brand);
  transform: translateX(4px);
  opacity: 1;
}

/* 加载和错误状态 */
.loading-state, .error-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem;
  border-radius: 8px;
  background-color: var(--bg-hover);
}

.loading-state {
  color: var(--text-secondary);
}

.error-state {
  color: var(--danger);
  background-color: var(--danger-bg);
}

/* 加载动画 */
.spinner {
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid currentColor;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: spinner-rotate 1s linear infinite;
}

@keyframes spinner-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .links-grid {
    grid-template-columns: 1fr;
  }
  
  .friend-links-container {
    margin: 2rem 0;
    padding: 1rem;
  }
  
  .link-card {
    padding: 1rem;
  }
  
  .link-logo {
    flex: 0 0 56px;
    margin-right: 1rem;
  }
  
  .logo-img {
    height: 56px;
  }
  
  .apply-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
}

/* 动画延迟效果 */
.links-grid a:nth-child(1) { transition-delay: 0.05s; }
.links-grid a:nth-child(2) { transition-delay: 0.1s; }
.links-grid a:nth-child(3) { transition-delay: 0.15s; }
.links-grid a:nth-child(4) { transition-delay: 0.2s; }
.links-grid a:nth-child(5) { transition-delay: 0.25s; }
.links-grid a:nth-child(6) { transition-delay: 0.3s; }
</style>
    