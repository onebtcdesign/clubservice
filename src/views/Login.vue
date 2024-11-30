<template>
  <div class="login-page">
    <!-- 星空背景 -->
    <div class="star-background">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div class="mouse-glow" ref="mouseGlow"></div>
    </div>

    <!-- 添加科技感容器 -->
    <div class="tech-container">
      <!-- 容器边框效果 -->
      <div class="container-border"></div>
      <div class="container-glow"></div>
      
      <div class="login-content">
        <!-- 增强的 Logo 效果 -->
        <div class="logo tech-logo">
          <div class="logo-wrapper">
            <img src="/images/logo.svg" alt="MetaQuirk" />
            <div class="logo-glow"></div>
            <div class="logo-border"></div>
            <div class="logo-scan-line"></div>
            <div class="logo-corner-lt"></div>
            <div class="logo-corner-rb"></div>
          </div>
        </div>

        <!-- 标题 -->
        <div class="title-section">
          <h1>METAQUIRK CLUB SERVICE</h1>
          <p>MetaQuirk uses innovative blockchain technology to turn your items into unique digital assets (NFTs), ensuring their authenticity and uniqueness on any public blockchain.</p>
        </div>

        <!-- 登录按钮 -->
        <button class="connect-btn tech-btn" @click="handleConnect">
          <span class="btn-text">Connect Wallet</span>
          <div class="btn-glow"></div>
          <div class="btn-border"></div>
        </button>

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
  </div>
</template>

<script>
export default {
  mounted() {
    // 添加鼠标移动效果
    document.addEventListener('mousemove', this.handleMouseMove);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.handleMouseMove);
  },
  methods: {
    handleConnect() {
      this.$router.push('/');
    },
    handleMouseMove(e) {
      if (this.$refs.mouseGlow) {
        this.$refs.mouseGlow.style.left = e.clientX + 'px';
        this.$refs.mouseGlow.style.top = e.clientY + 'px';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: transparent;
  position: relative;
  overflow: hidden;
  max-width: 1440px;
  margin: 0 auto;
}

.login-content {
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  text-align: center;
}

.logo {
  position: relative;
  padding: 20px;
  
  .logo-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      rgba(0,255,255,0.2) 0%,
      rgba(0,255,255,0) 70%
    );
    filter: blur(20px);
    opacity: 0;
    animation: logo-pulse 2s ease-in-out infinite;
  }
}

.title-section {
  text-align: center;

  h1 {
    font-size: 54px;
    margin-bottom: 24px;
    font-weight: 600;
    line-height: 1.2;
    text-transform: uppercase;
  }

  p {
    font-size: 18px;
    color: rgba(255,255,255,0.6);
    line-height: 1.6;
    max-width: 540px;
    margin: 0 auto;
  }
}

.connect-btn {
  position: relative;
  overflow: hidden;
  padding: 16px 48px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(0,255,255,0.3);
  background: linear-gradient(45deg, 
    rgba(0,0,0,0.9),
    rgba(0,40,40,0.9)
  );
  
  .btn-text {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    position: relative;
    z-index: 2;
    letter-spacing: 1px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(0,255,255,0.1),
      transparent
    );
    transform: rotate(45deg);
    animation: btn-shine 3s linear infinite;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(0,255,255,0.3);
    border-color: rgba(0,255,255,0.5);
    
    .btn-glow {
      opacity: 1;
    }

    .btn-text {
      text-shadow: 0 0 8px rgba(255,255,255,0.5);
    }
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 0 10px rgba(0,255,255,0.2);
  }
  
  .btn-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      rgba(0,255,255,0.2) 0%,
      rgba(0,255,255,0) 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .btn-border {
    position: absolute;
    inset: -1px;
    border: 1px solid rgba(0,255,255,0.3);
    border-radius: inherit;
    animation: borderPulse 2s linear infinite;
  }
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  .social-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    transition: all 0.3s ease;
    justify-content: center;
    position: relative;
    overflow: hidden;

    img {
      width: 24px;
      height: 24px;
      position: relative;
      z-index: 2;
    }

    // 添加发光效果
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        45deg,
        transparent,
        rgba(0,255,255,0.1),
        transparent
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    // 添加边框发光
    &::after {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      background: linear-gradient(
        45deg,
        rgba(0,255,255,0.1),
        transparent,
        rgba(0,255,255,0.1)
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: translateY(-2px);
      background: rgba(0, 0, 0, 0.5);
      border-color: rgba(0,255,255,0.3);
      box-shadow: 0 0 20px rgba(0,255,255,0.1);

      &::before,
      &::after {
        opacity: 1;
      }
    }

    &:active {
      transform: translateY(1px);
    }
  }
}

// 添加鼠标悬停时的文字发光效果
.social-btn {
  span {
    position: relative;
    z-index: 2;
    transition: text-shadow 0.3s ease;
  }

  &:hover span {
    text-shadow: 0 0 8px rgba(255,255,255,0.5);
  }
}

// 确保图标和文字都有正确的定位
.social-btn img,
.social-btn span {
  position: relative;
  z-index: 2;
}

// 响应式布局调整
@media (max-width: 1440px) {
  .login-content {
    max-width: 500px;
    margin-right: 5%;
  }

  .bg-image {
    left: 3%;
  }
}

@media (max-width: 1024px) {
  .bg-image {
    width: 42%;
    height: 600px;
    left: 2%;
  }

  .login-content {
    max-width: 450px;
    margin-right: 4%;
  }

  .title-section h1 {
    font-size: 36px;
  }
}

@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
    padding: 40px 20px;
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 300px;
    transform: none;
    top: 0;
    margin-bottom: 40px;
    background-position: center;
  }

  .login-content {
    margin: 0 auto;
    align-items: center;
    text-align: center;
  }

  .title-section {
    text-align: center;

    h1 {
      font-size: 32px;
    }
  }
}

@media (max-width: 480px) {
  .bg-image {
    height: 240px;
  }

  .title-section h1 {
    font-size: 28px;
  }
}

.tech-effect {
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -5px;
    background: linear-gradient(45deg, 
      rgba(0,255,255,0.1),
      rgba(0,255,255,0),
      rgba(0,255,255,0.1)
    );
    border-radius: 16px;
    animation: border-glow 2s linear infinite;
  }
}

@keyframes border-glow {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

@keyframes logo-pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes btn-shine {
  0% {
    left: -50%;
  }
  100% {
    left: 150%;
  }
}

@keyframes borderPulse {
  0%, 100% {
    opacity: 0.5;
    box-shadow: 0 0 5px rgba(0,255,255,0.3);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 15px rgba(0,255,255,0.5);
  }
}

// 星空背景样式
.star-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

// 鼠标跟随效果
.mouse-glow {
  position: fixed;
  width: 100px;
  height: 100px;
  pointer-events: none;
  background: radial-gradient(circle, rgba(0,255,255,0.15) 0%, rgba(0,255,255,0) 70%);
  transform: translate(-50%, -50%);
  z-index: 1;
  filter: blur(5px);
}

// Logo 科技效果
.tech-logo {
  position: relative;
  padding: 20px;
  
  .logo-wrapper {
    position: relative;
    padding: 30px;
    
    img {
      position: relative;
      z-index: 2;
      filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.3));
    }

    .logo-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at center,
        rgba(0, 255, 255, 0.2) 0%,
        rgba(0, 255, 255, 0) 70%
      );
      filter: blur(15px);
      opacity: 0;
      animation: logoGlow 3s ease-in-out infinite;
    }

    .logo-border {
      position: absolute;
      inset: 0;
      border: 2px solid rgba(0, 255, 255, 0.2);
      border-radius: 12px;
      animation: borderPulse 2s linear infinite;
    }

    .logo-scan-line {
      position: absolute;
      width: 100%;
      height: 2px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(0, 255, 255, 0.5),
        transparent
      );
      top: 0;
      left: 0;
      animation: scanLine 2s linear infinite;
    }

    .logo-corner-lt,
    .logo-corner-rb {
      position: absolute;
      width: 20px;
      height: 20px;
    }

    .logo-corner-lt {
      top: 0;
      left: 0;
      border-top: 2px solid rgba(0, 255, 255, 0.5);
      border-left: 2px solid rgba(0, 255, 255, 0.5);
    }

    .logo-corner-rb {
      bottom: 0;
      right: 0;
      border-bottom: 2px solid rgba(0, 255, 255, 0.5);
      border-right: 2px solid rgba(0, 255, 255, 0.5);
    }
  }
}

// 按钮科技效果
.tech-btn {
  position: relative;
  overflow: hidden;
  
  .btn-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(0,255,255,0.2) 0%, rgba(0,255,255,0) 70%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .btn-border {
    position: absolute;
    inset: 0;
    border: 1px solid rgba(0,255,255,0.3);
    border-radius: inherit;
    animation: borderPulse 2s linear infinite;
  }

  &:hover {
    .btn-glow {
      opacity: 1;
    }
  }
}

// 星星动画
@function multiple-box-shadow($n) {
  $value: '#{random(2000)}px #{random(2000)}px #FFF';
  @for $i from 2 through $n {
    $value: '#{$value} , #{random(2000)}px #{random(2000)}px #FFF';
  }
  @return unquote($value);
}

#stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: multiple-box-shadow(700);
  animation: starAnimation 50s linear infinite;
  &:after {
    content: " ";
    position: absolute;
    left: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: multiple-box-shadow(700);
  }
}

#stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: multiple-box-shadow(200);
  animation: starAnimation 100s linear infinite;
  &:after {
    content: " ";
    position: absolute;
    left: 2000px;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: multiple-box-shadow(200);
  }
}

#stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: multiple-box-shadow(100);
  animation: starAnimation 150s linear infinite;
  &:after {
    content: " ";
    position: absolute;
    left: 2000px;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: multiple-box-shadow(100);
  }
}

// 动画关键帧
@keyframes starAnimation {
  from { transform: translateX(0px); }
  to { transform: translateX(-2000px); }
}

@keyframes logoGlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

@keyframes borderGlow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@keyframes borderPulse {
  0%, 100% { opacity: 0.5; box-shadow: 0 0 5px rgba(0,255,255,0.3); }
  50% { opacity: 1; box-shadow: 0 0 15px rgba(0,255,255,0.5); }
}

// 科技感容器样式
.tech-container {
  position: relative;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 60px 40px;
  backdrop-filter: blur(3px);
  box-shadow: 0 0 40px rgba(0, 255, 255, 0.1);
  overflow: hidden;
  z-index: 1;
  
  // 容器边框效果
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid rgba(0, 255, 255, 0.1);
    border-radius: inherit;
  }

  // 角落装饰
  &::after {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    border-top: 2px solid rgba(0, 255, 255, 0.3);
    border-left: 2px solid rgba(0, 255, 255, 0.3);
    top: 0;
    left: 0;
    border-radius: 24px 0 0 0;
  }

  .container-border {
    position: absolute;
    inset: 0;
    border: 1px solid transparent;
    border-radius: inherit;
    background: linear-gradient(45deg,
      rgba(0, 255, 255, 0.1),
      transparent 40%,
      transparent 60%,
      rgba(0, 255, 255, 0.1)
    ) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    animation: borderRotate 4s linear infinite;
  }

  .container-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 0,
      rgba(0, 255, 255, 0.1),
      transparent 70%
    );
    opacity: 0.5;
  }
}

// 新增动画
@keyframes scanLine {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes borderRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 