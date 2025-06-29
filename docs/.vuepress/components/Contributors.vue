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
        v-for="(contributor, index) in customContributors" 
        :key="'custom-' + index"
        :href="contributor.url"
        target="_blank"
        rel="noopener noreferrer"
        class="contributor-card"
      >
        <img 
          :src="contributor.avatar" 
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
    }
  },
  data() {
    return {
      contributors: [],
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