<template>
  <router-view></router-view>
</template>

<script setup>
</script>

<style>
/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  background: #000;
  color: #fff;
}

* {
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  background: #000;
  color: #fff;
  position: relative;
  overflow: hidden;
}

#app::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1200px; /* 固定宽度 */
  height: 800px; /* 固定高度 */
  max-width: 90vw; /* 确保不超过视窗宽度 */
  max-height: 90vh; /* 确保不超过视窗高度 */
  background: url('/images/bg02.png') center/contain no-repeat;
  opacity: 0.8;
  z-index: -1;
  pointer-events: none;
}

/* 添加全局过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 