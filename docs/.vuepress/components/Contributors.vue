<template>
  <div class="contributors-container">
    <h3 v-if="title">{{ title }}</h3>
    <div v-if="fetchGithub && loading && !customContributors.length" class="loading">加载中...</div>
    <div v-else-if="fetchGithub && error && !customContributors.length" class="error">{{ error }}</div>
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
      >
        <img 
          :src="contributor.avatar_url" 
          :alt="contributor.login"
          class="avatar"
        />
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
      >
        <img 
          :src="contributor.avatarUrl" 
          :alt="contributor.name"
          class="avatar"
        />
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
    },
    // 移除hashType属性，直接使用MD5
  },
  
  watch: {
    // 监听customContributors变化，重新处理头像URL
    customContributors: {
      handler() {
        this.processCustomContributors();
      },
      deep: true
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
    // 处理自定义贡献者的头像URL
    this.processCustomContributors()
    
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
        const response = await fetch(`https://api.github.com/repos/${this.repo}/contributors`)
        
        if (!response.ok) {
          throw new Error(`获取贡献者信息失败: ${response.statusText}`)
        }
        
        this.contributors = await response.json()
        this.loading = false
      } catch (error) {
        console.error('获取贡献者信息出错:', error)
        this.error = `获取贡献者信息失败: ${error.message}`
        this.loading = false
      }
    },
    
    // 处理自定义贡献者数据，为每个贡献者生成正确的头像URL
    processCustomContributors() {
      const processed = [];
      
      for (const contributor of this.customContributors) {
        let avatarUrl;
        
        if (contributor.avatar) {
          avatarUrl = contributor.avatar;
        } else if (contributor.email) {
          // 使用email生成WeAvatar URL，使用MD5哈希
          const hash = this.calculateMD5(contributor.email.trim().toLowerCase());
          avatarUrl = `https://weavatar.com/avatar/${hash}?d=retro`;
        } else {
          // 如果既没有avatar也没有email，WeAvatar会返回默认头像
          avatarUrl = 'https://weavatar.com/avatar/?d=retro';
        }
        
        processed.push({
          ...contributor,
          avatarUrl
        });
      }
      
      this.processedCustomContributors = processed;
    },
    
    // 直接使用MD5哈希算法
    
    // 计算MD5哈希值 - 纯JavaScript实现
    calculateMD5(text) {
      // 以下是一个简单的MD5实现
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
  margin: 2rem 0;
}

.contributors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.contributor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--c-text);
  transition: transform 0.2s;
  padding: 0.5rem;
  border-radius: 8px;
}

.contributor-card:hover {
  transform: translateY(-5px);
  background-color: var(--c-bg-light);
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--c-brand);
}

.username {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.loading, .error {
  text-align: center;
  padding: 1rem;
  color: var(--c-text-lighter);
}

.error {
  color: var(--c-danger);
}

@media (max-width: 719px) {
  .contributors-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
  
  .avatar {
    width: 50px;
    height: 50px;
  }
  
  .username {
    font-size: 0.8rem;
  }
}
</style>