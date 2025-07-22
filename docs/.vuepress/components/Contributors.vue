<template>
  <div class="contributors-container">
    <h3 v-if="title" class="contributors-title">{{ title }}</h3>
    
    <!-- 状态提示 -->
    <div v-if="fetchGithub && loading && !customContributors.length" class="status-indicator loading">
      <div class="spinner"></div>
      <span>加载贡献者信息中...</span>
    </div>
    <div v-else-if="fetchGithub && error && !customContributors.length" class="status-indicator error">
      <i class="error-icon">⚠️</i>
      <span>{{ error }}</span>
    </div>
    
    <!-- 贡献者网格 -->
    <div class="contributors-grid">
      <!-- GitHub贡献者 -->
      <a 
        v-if="fetchGithub"
        v-for="contributor in contributors" 
        :key="'github-' + contributor.id"
        :href="contributor.html_url"
        target="_blank"
        rel="noopener noreferrer"
        class="contributor-card"
        :aria-label="`访问${contributor.login}的GitHub主页`"
      >
        <div class="avatar-container">
          <img 
            :src="contributor.avatar_url" 
            :alt="contributor.login"
            class="avatar"
            loading="lazy"
          />
          <div class="hover-overlay">
            <i class="external-icon">↗</i>
          </div>
        </div>
        <span class="username">{{ contributor.login }}</span>
      </a>
      
      <!-- 自定义贡献者 -->
      <a 
        v-for="(contributor, index) in processedCustomContributors" 
        :key="'custom-' + index"
        :href="contributor.url"
        target="_blank"
        rel="noopener noreferrer"
        class="contributor-card"
        :aria-label="`访问${contributor.name}的主页`"
      >
        <div class="avatar-container">
          <img 
            :src="contributor.avatarUrl" 
            :alt="contributor.name"
            class="avatar"
            loading="lazy"
          />
          <div class="hover-overlay">
            <i class="external-icon">↗</i>
          </div>
        </div>
        <span class="username">{{ contributor.name }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contributors',
  props: {
    title: {
      type: String,
      default: '贡献者'
    },
    repo: {
      type: String,
      default: 'NJUST-OpenLib/NJUST-Manual'
    },
    customContributors: {
      type: Array,
      default: () => []
    },
    fetchGithub: {
      type: Boolean,
      default: true
    }
  },
  
  watch: {
    // 监听自定义贡献者变化，重新处理头像URL
    customContributors: {
      handler() {
        this.processCustomContributors();
      },
      deep: true,
      immediate: true
    }
  },
  
  data() {
    return {
      contributors: [],
      processedCustomContributors: [],
      loading: true,
      error: null
    }
  },
  
  mounted() {
    if (this.fetchGithub) {
      this.fetchContributors()
    } else {
      this.loading = false
    }
  },
  
  methods: {
    async fetchContributors() {
      try {
        this.loading = true
        this.error = null
        const response = await fetch(`https://api.github.com/repos/${this.repo}/contributors`)
        
        if (!response.ok) {
          throw new Error(`HTTP错误: ${response.status}`)
        }
        
        this.contributors = await response.json()
      } catch (error) {
        console.error('获取贡献者信息出错:', error)
        this.error = '无法加载GitHub贡献者信息'
      } finally {
        this.loading = false
      }
    },
    
    // 处理自定义贡献者数据
    processCustomContributors() {
      this.processedCustomContributors = this.customContributors.map(contributor => {
        let avatarUrl;
        
        if (contributor.avatar) {
          avatarUrl = contributor.avatar;
        } else if (contributor.email) {
          // 使用email生成WeAvatar URL
          const hash = this.calculateMD5(contributor.email.trim().toLowerCase());
          avatarUrl = `https://weavatar.com/avatar/${hash}?d=retro`;
        } else {
          // 默认头像
          avatarUrl = 'https://weavatar.com/avatar/?d=retro';
        }
        
        return {
          ...contributor,
          avatarUrl
        };
      });
    },
    
    // MD5哈希算法（保持不变）
    calculateMD5(text) {
      function md5cycle(x, k) {
        let a = x[0], b = x[1], c = x[2], d = x[3];
        
        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897);
        d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341);
        b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416);
        d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063);
        b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682);
        d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290);
        b = ff(b, c, d, a, k[15], 22, 1236535329);
        
        a = gg(a, b, c, d, k[1], 5, -165796510);
        d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713);
        b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691);
        d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335);
        b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438);
        d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961);
        b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467);
        d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473);
        b = gg(b, c, d, a, k[12], 20, -1926607734);
        
        a = hh(a, b, c, d, k[5], 4, -378558);
        d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562);
        b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060);
        d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632);
        b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174);
        d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979);
        b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487);
        d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520);
        b = hh(b, c, d, a, k[2], 23, -995338651);
        
        a = ii(a, b, c, d, k[0], 6, -198630844);
        d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905);
        b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571);
        d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523);
        b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359);
        d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380);
        b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070);
        d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259);
        b = ii(b, c, d, a, k[9], 21, -343485551);
        
        x[0] = add32(a, x[0]);
        x[1] = add32(b, x[1]);
        x[2] = add32(c, x[2]);
        x[3] = add32(d, x[3]);
      }
      
      function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
      }
      
      function ff(a, b, c, d, x, s, t) {
        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
      }
      
      function gg(a, b, c, d, x, s, t) {
        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
      }
      
      function hh(a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t);
      }
      
      function ii(a, b, c, d, x, s, t) {
        return cmn(c ^ (b | (~d)), a, b, x, s, t);
      }
      
      function md51(s) {
        const n = s.length;
        const state = [1732584193, -271733879, -1732584194, 271733878];
        let i;
        
        for (i = 64; i <= s.length; i += 64) {
          md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        
        s = s.substring(i - 64);
        const tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        
        for (i = 0; i < s.length; i++) {
          tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        }
        
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        
        if (i > 55) {
          md5cycle(state, tail);
          for (i = 0; i < 16; i++) tail[i] = 0;
        }
        
        tail[14] = n * 8;
        md5cycle(state, tail);
        return state;
      }
      
      function md5blk(s) {
        const md5blks = [];
        for (let i = 0; i < 64; i += 4) {
          md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
      }
      
      function hex_md5(s) {
        const result = md51(s);
        return hex(result[0]) + hex(result[1]) + hex(result[2]) + hex(result[3]);
      }
      
      function hex(x) {
        const hexChars = '0123456789abcdef';
        let output = '';
        for (let i = 0; i < 4; i++) {
          const value = (x >> (i * 8)) & 0xff;
          output += hexChars.charAt((value >> 4) & 0xf) + hexChars.charAt(value & 0xf);
        }
        return output;
      }
      
      function add32(a, b) {
        return (a + b) & 0xffffffff;
      }
      
      return hex_md5(text);
    }
  }
}
</script>

<style scoped>
.contributors-container {
  margin: 2.5rem 0;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: var(--c-bg-card, #ffffff);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* 标题样式 */
.contributors-title {
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--c-text-title, #1e293b);
  border-bottom: 2px solid var(--c-brand, #3b82f6);
  display: inline-block;
}

/* 状态指示器 */
.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.status-indicator.loading {
  color: var(--c-text-secondary, #64748b);
  background-color: var(--c-bg-soft, #f8fafc);
}

.status-indicator.error {
  color: var(--c-danger, #dc2626);
  background-color: var(--c-danger-bg, #fff5f5);
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

.error-icon {
  font-size: 1.2rem;
}

/* 贡献者网格 */
.contributors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 1.25rem;
}

/* 贡献者卡片 */
.contributor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--c-text, #334155);
  border-radius: 8px;
  transition: all 0.3s ease;
  padding: 0.75rem 0.5rem;
  position: relative;
}

.contributor-card:hover {
  transform: translateY(-4px);
  background-color: var(--c-bg-hover, #f1f5f9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* 头像容器 */
.avatar-container {
  position: relative;
  width: 72px;
  height: 72px;
  margin-bottom: 0.75rem;
}

/* 头像样式 */
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--c-border, #e2e8f0);
  transition: all 0.3s ease;
}

.contributor-card:hover .avatar {
  transform: scale(1.05);
  border-color: var(--c-brand, #3b82f6);
}

/* 悬停覆盖层 */
.hover-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.contributor-card:hover .hover-overlay {
  opacity: 1;
}

.external-icon {
  color: white;
  font-size: 1rem;
  transform: translate(1px, -1px);
}

/* 用户名样式 */
.username {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--c-text, #334155);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
  transition: color 0.3s ease;
}

.contributor-card:hover .username {
  color: var(--c-brand, #3b82f6);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .contributors-container {
    margin: 2rem 0;
    padding: 1rem;
  }
  
  .contributors-grid {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 1rem;
  }
  
  .avatar-container {
    width: 64px;
    height: 64px;
  }
  
  .username {
    font-size: 0.85rem;
    max-width: 80px;
  }
}

@media (max-width: 480px) {
  .contributors-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
  
  .contributors-title {
    font-size: 1.2rem;
  }
}
</style>