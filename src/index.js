import { rotatePositionRelatively } from './rotate'
import rectCenter from './rectCenter'
import symmetryPoint from './symmetryPoint'
import centerPoint from './centerPoint'
import computeRotation from './computeRotation'

class Controller {
  constructor(options) {
    this.adjustType = options.adjustType
    this.mouseStart = options.mouseStart
    this.mouseEnd = options.mouseEnd
    this.rectStart = options.rectStart
    this.isFixedRatio = options.isFixedRatio

    this._p0 = null
    this._p1 = null
    this._p2 = null
    this._p3 = null
    this._lt = null
    this._rt = null
    this._rb = null
    this._lb = null
    this._ct = null
    this._cb = null
    this._rm = null
    this._lm = null
    this._center = null
  }

  moveRect() {
    const [x, y] = ['x', 'y'].map(k =>
      this.mouseEnd[k] - this.mouseStart[k]
    )
    return {
      ...this.rectStart,
      x: this.rectStart.x + x,
      y: this.rectStart.y + y
    }
  }

  rotateRect() {
    // const shrotcutRotations = [-180, -135, -90, -45, 0, 45, 90, 135, 180]
    const offsetRotation = computeRotation(this.center, mouseStart, mouseEnd)
    let nextRotation = this.rectStart.r + offsetRotation
    if (nextRotation >= 180) {
      nextRotation = nextRotation - 360
    }
    if (nextRotation <= -180) {
      nextRotation = nextRotation + 360
    }
    return {
      ...this.rectStart,
      r: nextRotation
    }
  }

  resizeRect() {
    
  }

  // key end points
  get center() {
    if (!this._center) {
      this._center = rectCenter(this.rectStart)
    }
    return this._center
  }

  get lt () {
    if (!this._p0) {
      const { x, y, r } = this.rectStart
      this._p0 = rotatePositionRelatively({ x, y }, this.center, r)
    }
    return this._p0
  }

  get rt() {
    if (!this._p1) {
      const { x, y, w, r } = this.rectStart
      this._p1 = rotatePositionRelatively(
        { x: x + w, y },
        this.center,
        r
      )
    }
    return this._p1
  }

  get rb() {
    if (!this._p2) {
      this._p2 = symmetryPoint(this.p0, this.center)
    }
    return this._p2
  }

  get lb() {
    if (!this._p3) {
      this._p3 = symmetryPoint(this.p1, this.center)
    }
    return this._p3
  }

  get ct() {
    if (!this._ct) {
      this._ct = centerPoint(this.p0, this.p1)
    }
    return this._ct
  }

  get cb() {
    if (!this._cb) {
      this._cb = centerPoint(this.p2, this.p3)
    }
    return this._cb
  }

  get rm() {
    if (!this._rm) {
      this._rm = centerPoint(this.p1, this.p2)
    }
    return this._rm
  }

  get lm() {
    if (!this._lm) {
      this._lm = centerPoint(this.p0, this.p3)
    }
    return this._lm
  }

}
