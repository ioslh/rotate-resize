<template>
  <div class="controller">
  <div class="absolute internal" :style="internalStyle" @mousedown.stop="onMouseDown($event, 'move')">
    <template v-if="showHandlers">
    <i 
      v-for="handler in handlers"
      :key="handler"
      class="handler absolute"
      :class="handler === 'rotate' ? handler : handler.split('')"
      @mousedown.stop="onMouseDown($event, handler)"
    ></i>
    </template>
  </div>
  <div class="absolute external"></div>
  <div
    class="absolute resize-guide"
    v-if="showResizeGuide"
    :style="resizeGuideStyle"
  ></div>
  <div
    class="absolute rotate-guide"
    v-if="showRotateGuide"
    :style="rotateGuideStyle"
  ></div>
  </div>
</template>

<script>
import { roughlyToPlain } from '../utils'
import rotateResize, {
  angleDegrees,
  lineDegrees,
  computeEndPoints,
  pointsDistance,
  centerPoint
} from '../../rotateResize'

const handlers = [
  'rotate',
  'lt',
  'ct',
  'rt',
  'lm',
  'rm',
  'lb',
  'cb',
  'rb'
]

export default {
  props: {
    rect: Object
  },

  data() {
    return {
      handlers,
      adjustType: null,
      isAdjusting: false,
      fixedRatio: false,
      bodyCursor: 'auto'
    }
  },
  watch: {
    bodyCursor() {
      document.body.style.cursor = this.bodyCursor
    },
  },

  computed: {
    bounds() {
      return computeEndPoints(this.rect)
    },

    showRotateGuide() {
      return this.adjustType === 'rotate'
    },

    rotateGuideStyle() {
      if (!this.showRotateGuide) {
        return {}
      }
      const { center, lt, rb } = this.bounds
      const { x, y } = center
      const w = pointsDistance(lt, rb)
      return {
        left: `${x - w / 2}px`,
        top: `${y - w / 2}px`,
        width: `${w}px`,
        height: `${w}px`
      }
    },

    showResizeGuide() {
      return this.fixedRatio
        && this.adjustType
        && this.adjustType !== 'rotate'
    },

    resizeGuideStyle() {
      if (!this.showResizeGuide) {
        return {}
      }
      let p0, p1
      const t = this.adjustType
      const e = this.bounds
      if (t === 'lt' || t === 'rb') {
        [p0, p1] = [e.lt, e.rb]
      } else if (t === 'rt' || t === 'lb') {
        [p0, p1] = [e.rt, e.lb]
      } else if (t === 'cb' || t === 'ct') {
        [p0, p1] = [e.cb, e.ct]
      } else {
        [p0, p1] = [e.lm, e.rm]
      }
      const height = 2000
      const center = centerPoint(p0, p1)
      const r = lineDegrees(p0, p1)
      return {
        left: `${center.x}px`,
        top: `${center.y - height / 2}px`,
        height: `${height}px`,
        transform: `rotate(${r}deg)`
      }
    },

    internalStyle() {
      const { x, y, w, h, r } = this.rect
      const rad = (Math.PI / 180) * r
      const a = Math.cos(rad)
      const c = -Math.sin(rad)
      const b = -c
      const d = a
      return {
        width: `${w}px`,
        height: `${h}px`,
        transform: ` matrix(${a}, ${b}, ${c}, ${d}, ${x}, ${y})`,
      }
    },

    showHandlers() {
      if (this.isAdjusting && this.adjustType === 'move') {
        return false
      }
      return true
    }
  },
  
  methods: {
    computeMousePosition(e) {
      const { pageX, pageY } = e
      return {
        x: pageX,
        y: pageY
      }
    },

    onMouseDown(e, type) {
      this.adjustType = e.metaKey ? 'rotate' : type
      this.mouseStart = this.computeMousePosition(e)
      this.rectStart = roughlyToPlain(this.rect)
      this.fixedRatio = e.shiftKey

      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    },

    onMouseMove(e) {
    this.mouseEnd = this.computeMousePosition(e)
    const [x, y] = ['x', 'y'].map(t => Math.abs(this.mouseEnd[t] - this.mouseStart[t]))
      if (x > 2 || y > 2) {
        this.isAdjusting = true
        this.setDocumentCursor(this.mouseEnd)
        const rectEnd = rotateResize(
          this.adjustType,
          this.mouseStart,
          this.mouseEnd,
          this.rectStart,
          this.fixedRatio
        )
        this.$emit('transformed', rectEnd)
      }
    },

    onMouseUp() {
      this.adjustType = null
      this.bodyCursor = 'auto'
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    },

    setDocumentCursor(point, tolerate = true) {
      if (this.adjustType === 'move') {
        return this.bodyCursor = 'move'
      }
      if (this.adjustType === 'rotate') {
        return this.bodyCursor = '-webkit-grab'
      }
      const { center } = this.bounds
      const vector = {
        x: (point.x || 0) - center.x,
        y: (point.y || 0) - center.y
      }
      const degrees = angleDegrees(vector)
      const toleratance = tolerate ? 10 : 0
      switch (true) {
      case degrees <= -180 + toleratance:
        return this.bodyCursor = 'ew-resize'
      case degrees < -90 - toleratance:
        return this.bodyCursor = 'nwse-resize'
      case degrees <= -90 + toleratance:
        return this.bodyCursor = 'ns-resize'
      case degrees < 0 - toleratance:
        return this.bodyCursor = 'nesw-resize'
      case degrees <= 0 + toleratance:
        return this.bodyCursor = 'ew-resize'
      case degrees < 90 - toleratance:
        return this.bodyCursor = 'nwse-resize'
      case degrees <= 90 + toleratance:
        return this.bodyCursor = 'ns-resize'
      case degrees < 180 - toleratance:
        return this.bodyCursor = 'nesw-resize'
      case degrees <= 180 + toleratance:
        return this.bodyCursor = 'ew-resize'
      }
    },
    preventDrag(e) {
      e.stopPropagation()
      e.preventDefault()
    }
  },

  mounted() {
    document.addEventListener('drag', this.preventDrag)
    document.addEventListener('dragstart', this.preventDrag)
  },

  beforeDestroy() {
    document.removeEventListener('drag', this.preventDrag)
    document.removeEventListener('dragstart', this.preventDrag)
  }
}
</script>

<style lang="scss" scoped>
.controller {
  .internal {
    border: 1px solid var(--control-color);
  }
  .handler {
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: 1px solid var(--control-color);
    margin-left: -4px;
    margin-top: -4px;
    background: white;
    &.rotate {
      left: 50%;
      top: -15px;
      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 7px;
        border-left: 1px solid var(--control-color);
        height: 10px;
        left: 3px;
      }
    }
    &.l {
      left: 0;
    }
    &.c {
      left: 50%;
    }
    &.r {
      left: 100%;
    }
    &.t {
      top: 0;
    }
    &.m {
      top: 50%;
    }
    &.b {
      top: 100%;
    }
  }
  .external {
    display: none;
  }
  .rotate-guide {
    pointer-events: none;
    border-radius: 50%;
    border: 1px dashed var(--control-color);
  }
  .resize-guide {
    pointer-events: none;
    width: 0;
    border-left: 1px dashed var(--control-color);
    height: 2000px;
  }
}
</style>
