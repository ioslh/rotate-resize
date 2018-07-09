<template>
  <div class="wrapper">
    <Controller :rect="rect" @transformed="onTransformed" />
    <Info :rect="rect" @transformed="onTransformed"/>
    <GitHub />
  </div>
</template>

<script>
import Info from './components/Info'
import GitHub from './components/GitHub'
import Controller from './components/Controller'

export default {
  components: {
    Info,
    GitHub,
    Controller
  },

  data() {
    return {
      rect: {
        x: 100,
        y: 100,
        w: 100,
        h: 100,
        r: 0
      }
    }
  },

  methods: {
    onTransformed(rectEnd) {
      const keys = ['x', 'y', 'w', 'h', 'r']
      Object.keys(rectEnd).forEach(key => {
        if (keys.includes(key)) {
          this.rect[key] = rectEnd[key]
        }
      })
    }
  }
}
</script>

<style lang="scss">
:root {
  --control-color: #5188f1;
  --info-bd-color: #bbb;
}
* {
  margin: 0;
  padding: 0;
}
html, body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.absolute {
  position: absolute;
}
</style>
