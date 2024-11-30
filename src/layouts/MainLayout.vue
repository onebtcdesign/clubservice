<template>
  <div class="main-layout">
    <!-- 移动端顶部栏 -->
    <div class="mobile-header">
      <div class="logo" @click="goToHome">
        <img src="/images/logo.svg" alt="MetaQuirk" />
      </div>
      <div class="mobile-nav-toggle" @click="toggleMobileNav">
        <div class="hamburger" :class="{ active: isMobileNavOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <!-- 移动端下拉菜单 -->
    <div class="mobile-nav" :class="{ active: isMobileNavOpen }">
      <nav class="nav-menu">
        <router-link 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path" 
          class="nav-item" 
          :class="{ active: $route.path === item.path }"
          @click="closeMobileNav"
        >
          {{ item.name }}
        </router-link>
      </nav>

      <!-- 添加移动端底部信息 -->
      <div class="mobile-footer">
        <div class="club-info">
          <h1>Metaquirk Club Service</h1>
          <p>MetaQuirk uses innovative blockchain technology to turn your items into unique digital assets (NFTs), ensuring their authenticity and uniqueness on any public blockchain.</p>
        </div>
        
        <div class="social-links">
          <a href="#" class="social-btn">
            <img src="/images/tg.svg" alt="Telegram" />
            Join Telegram
          </a>
          <a href="#" class="social-btn">
            <img src="/images/x.svg" alt="X" />
            Follow X
          </a>
        </div>
      </div>
    </div>

    <!-- 左侧导航栏（桌面端） -->
    <div class="sidebar">
      <!-- Logo -->
      <div class="logo" @click="goToHome">
        <img src="/images/logo.svg" alt="MetaQuirk" />
      </div>

      <!-- 导航菜单 -->
      <nav class="nav-menu">
        <router-link 
          to="/" 
          class="nav-item" 
          :class="{ active: $route.path === '/' }"
        >
          HOME
        </router-link>
        <router-link 
          to="/info" 
          class="nav-item" 
          :class="{ active: $route.path === '/info' }"
        >
          INFO
        </router-link>
        <router-link 
          to="/airdrop" 
          class="nav-item" 
          :class="{ active: $route.path === '/airdrop' }"
        >
          AIRDROP
        </router-link>
      </nav>

      <!-- 底部信息 -->
      <div class="sidebar-footer">
        <div class="club-info">
          <h1>Metaquirk Club Service</h1>
          <p>MetaQuirk uses innovative blockchain technology to turn your items into unique digital assets (NFTs), ensuring their authenticity and uniqueness on any public blockchain.</p>
        </div>
        
        <!-- 社交媒体链接 -->
        <div class="social-links">
          <a href="#" class="social-btn">
            <img src="/images/tg.svg" alt="Telegram" />
            Join Telegram
          </a>
          <a href="#" class="social-btn">
            <img src="/images/x.svg" alt="X" />
            Follow X
          </a>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobileNavOpen = ref(false)

const navItems = [
  { path: '/', name: 'HOME' },
  { path: '/info', name: 'INFO' },
  { path: '/airdrop', name: 'AIRDROP' }
]

const toggleMobileNav = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value
  document.body.style.overflow = isMobileNavOpen.value ? 'hidden' : ''
}

const closeMobileNav = () => {
  isMobileNavOpen.value = false
  document.body.style.overflow = ''
}

const goToHome = () => {
  router.push('/')
  if (isMobileNavOpen.value) {
    closeMobileNav()
  }
}
</script>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  background: #000;
}

.sidebar {
  width: 360px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255,255,255,0.1);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: #000;
}

.logo {
  margin-bottom: 60px;
  cursor: pointer;
  
  img {
    width: 187px;
    height: 42px;
  }
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: auto;
}

.nav-item {
  padding: 20px 40px;
  border-radius: 100px;
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  transition: all 0.3s;
  background: rgba(0,0,0,0.3);

  &:hover {
    background: rgba(255,255,255,0.1);
  }

  &.active {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.2);
  }
}

.sidebar-footer {
  margin-top: auto;
}

.club-info {
  margin-bottom: 32px;

  h1 {
    font-size: 32px;
    margin-bottom: 16px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    line-height: 1.6;
  }
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.social-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: rgba(255,255,255,0.1);
  }
}

.main-content {
  flex: 1;
  margin-left: 360px;
  padding: 40px;
  position: relative;
}

@media (max-width: 1440px) {
  .main-content {
    &::before {
      width: 600px;
      height: 600px;
      left: calc(50% + 180px);
    }
  }
}

@media (max-width: 1024px) {
  .main-content {
    margin-left: 0;
    padding: 90px 20px 20px;
    width: 100%;

    &::before {
      width: 500px;
      height: 500px;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 80px 16px 16px;

    &::before {
      width: 400px;
      height: 400px;
    }
  }
}

// 添加移动端顶部栏样式
.mobile-header {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  padding: 0 20px;
  background: rgba(0,0,0,0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  z-index: 1002;
  align-items: center;
  justify-content: space-between;

  .logo {
    margin: 0;
    cursor: pointer;
    
    img {
      height: 32px;
      width: auto;
    }
  }
}

// 修改汉堡菜单样式
.mobile-nav-toggle {
  cursor: pointer;
  padding: 12px;
  
  .hamburger {
    width: 24px;
    height: 20px;
    position: relative;
    
    span {
      display: block;
      position: absolute;
      height: 2px;
      width: 100%;
      background: #fff;
      border-radius: 2px;
      transition: all 0.3s ease;

      &:nth-child(1) { top: 0; }
      &:nth-child(2) { top: 9px; }
      &:nth-child(3) { top: 18px; }
    }

    &.active {
      span {
        &:nth-child(1) {
          transform: rotate(45deg);
          top: 9px;
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:nth-child(3) {
          transform: rotate(-45deg);
          top: 9px;
        }
      }
    }
  }
}

// 修改移动端导航样式
.mobile-nav {
  display: none;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.95);
  backdrop-filter: blur(10px);
  padding: 20px;
  transform: translateY(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  overflow-y: auto;

  &.active {
    transform: translateY(0);
  }

  .nav-menu {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;
  }

  .nav-item {
    padding: 16px 24px;
    border-radius: 12px;
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
    transition: all 0.3s;
    text-align: center;

    &:hover, &.active {
      background: rgba(255,255,255,0.1);
    }
  }

  .mobile-footer {
    padding: 24px 0;
    border-top: 1px solid rgba(255,255,255,0.1);

    .club-info {
      margin-bottom: 32px;

      h1 {
        font-size: 28px;
        margin-bottom: 16px;
        font-weight: 600;
      }

      p {
        font-size: 16px;
        color: rgba(255,255,255,0.6);
        line-height: 1.6;
      }
    }

    .social-links {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .social-btn {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 32px;
        border-radius: 100px;
        border: 1px solid rgba(255,255,255,0.1);
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        transition: all 0.3s;

        img {
          width: 24px;
          height: 24px;
        }

        &:hover {
          background: rgba(255,255,255,0.1);
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .sidebar {
    display: none; // 隐藏桌面端侧边栏
  }

  .mobile-header {
    display: flex;
  }

  .mobile-nav {
    display: block;
  }

  .main-content {
    margin-left: 0;
    padding: 90px 20px 20px;
    width: 100%; // 确保内容区域占满宽度
  }
}

@media (max-width: 768px) {
  .mobile-header {
    height: 60px; // 减小顶部栏高度
    
    .logo img {
      height: 24px;
    }
  }

  .mobile-nav {
    top: 60px; // 对应顶部栏高度
    padding: 16px;

    .mobile-footer {
      padding: 24px 0;

      .club-info {
        h1 {
          font-size: 24px;
        }

        p {
          font-size: 15px;
        }
      }

      .social-links .social-btn {
        padding: 14px 28px;
        font-size: 15px;

        img {
          width: 22px;
          height: 22px;
        }
      }
    }
  }

  .main-content {
    padding: 80px 16px 16px; // 调整内容区域间距
  }
}

// 添加小屏幕适配
@media (max-width: 480px) {
  .mobile-header {
    padding: 0 16px;
  }

  .mobile-nav {
    padding: 12px;

    .mobile-footer {
      padding: 20px 0;

      .club-info {
        h1 {
          font-size: 22px;
        }

        p {
          font-size: 14px;
        }
      }

      .social-links .social-btn {
        padding: 12px 24px;
        font-size: 14px;

        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .main-content {
    padding: 76px 12px 12px;
  }
}
</style> 