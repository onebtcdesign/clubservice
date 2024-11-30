<template>
  <div class="star-background">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
    <div class="mouse-effect" ref="mouseEffect"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.addEventListener('mousemove', this.handleMouseMove);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.handleMouseMove);
  },
  methods: {
    handleMouseMove(e) {
      const mouseEffect = this.$refs.mouseEffect;
      if (mouseEffect) {
        mouseEffect.style.left = e.clientX + 'px';
        mouseEffect.style.top = e.clientY + 'px';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.star-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.mouse-effect {
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(0,255,255,0.1) 0%, rgba(0,255,255,0) 70%);
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
  filter: blur(5px);
}

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
  animation: animStar 50s linear infinite;
  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
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
  animation: animStar 100s linear infinite;
  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
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
  animation: animStar 150s linear infinite;
  &:after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: multiple-box-shadow(100);
  }
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}
</style> 