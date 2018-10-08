export const EndPoints = class EndPoints {
  constructor(rect) {
    this.rect = rect
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

  get center() {
    if (!this._center) {
      this._center = rectCenter(this.rect)
    }
    return this._center
  }

  get lt () {
    if (!this._lt) {
      const { x, y, r } = this.rect
      this._lt = rotatePositionRelatively({ x, y }, this.center, r)
    }
    return this._lt
  }

  get rt() {
    if (!this._rt) {
      const { x, y, w, r } = this.rect
      this._rt = rotatePositionRelatively(
        { x: x + w, y },
        this.center,
        r
      )
    }
    return this._rt
  }

  get rb() {
    if (!this._rb) {
      this._rb = symmetryPoint(this.lt, this.center)
    }
    return this._rb
  }

  get lb() {
    if (!this._lb) {
      this._lb = symmetryPoint(this.rt, this.center)
    }
    return this._lb
  }

  get ct() {
    if (!this._ct) {
      this._ct = centerPoint(this.lt, this.rt)
    }
    return this._ct
  }

  get cb() {
    if (!this._cb) {
      this._cb = centerPoint(this.rb, this.lb)
    }
    return this._cb
  }

  get rm() {
    if (!this._rm) {
      this._rm = centerPoint(this.rt, this.rb)
    }
    return this._rm
  }

  get lm() {
    if (!this._lm) {
      this._lm = centerPoint(this.lt, this.lb)
    }
    return this._lm
  }
}

export const symmetryPoint = (start, center) => {
  const [x, y] = ['x', 'y'].map(k => start[k] + 2 * (center[k] - start[k]))
  return { x, y } 
}

const PRECISION = 1e-5

const roughlyEqual = (x, y, precision = PRECISION) => Math.abs(x - y) < precision

/*
 * 原始矩形，倾斜角度为 0 deg
 * A----------------------B
 * |                      |
 * |                      |
 * |                      |
 * |                      |
 * |                      |
 * C----------------------D
 * 
 */

/**
 * 传入两点坐标，以及(线段 AC 的)倾斜角度
 * 返回唯一确定的矩形的位置
 * @param {Object} pa
 * @param {Object} pb
 * @param {Number} angel
 */
export const computeRectWithCrossPoints = (pa, pb, angle) => {
  const center = centerPoint(pa, pb)
  const rotatedPosition = rotatePositionRelatively(pb, center, -angle)
  const { x, y } = rotatedPosition
  const width = Math.abs((x - center.x) * 2)
  const height = Math.abs((y - center.y) * 2)
  return {
    x: center.x - width / 2,
    y: center.y - height / 2,
    w: width,
    h: height,
    r: angle
  }
}

/**
 * 根据一条线段（由 pinnedPoints 两点确定），拖拽点坐标（dragPoint），以及倾斜角度（angle）返回一个确定的矩形
 * @param {Object[]} pinnedPoints
 * @param {Object} dragPoint
 * @param {Number} angle
 */
export const computeRectWithPinnedLine = (pinnedPoints, dragPoint, angle) => {
  const [rotateP0, rotateP1] = pinnedPoints.map(p => rotatePosition(p, -angle))
  const rotateDrag = rotatePosition(dragPoint, -angle)
  let w, h, rotatedCenter
  if (roughlyEqual(rotateP0.y, rotateP1.y)) {
    w = Math.abs(rotateP0.x - rotateP1.x)
    h = Math.abs(rotateDrag.y - rotateP0.y)
    rotatedCenter = {
      x: (rotateP0.x + rotateP1.x) / 2,
      y: (rotateP0.y + rotateDrag.y) / 2
    }
  } else if (roughlyEqual(rotateP0.x, rotateP1.x)) {
    h = Math.abs(rotateP0.y - rotateP1.y)
    w = Math.abs(rotateDrag.x - rotateP0.x)
    rotatedCenter = {
      x: (rotateP0.x + rotateDrag.x) / 2,
      y: (rotateP0.y + rotateP1.y) / 2
    }
  }
  const center = rotatePosition(rotatedCenter, angle)
  const x = center.x - w / 2
  const y = center.y - h / 2
  return {
    x, y, w, h, r: angle
  }
}

/**
 * 根据一条边（pinnedPoints 两点确定），和对应的拖拽点（dragPoint），生成一个宽高比固定的矩形
 * @param {Object[]} pinnedPoints 拖拽固定边
 * @param {Object} dragPoint 拖拽点
 * @param {Number} rectRatio 原始矩形的宽高比
 * @param {String} activeExpand 拖拽的属性（width / height）
 */
export const computeRatioedRectWithPinnedLine = (pinnedPoints, dragPoint, rectStart, activeExpand) => {
  const [p0, p1] = pinnedPoints
  const middle1 = centerPoint(p0, p1)
  const middle2 = dragPoint
  const center = centerPoint(middle1, middle2)
  const distance = pointsDistance(middle1, middle2)
  const rectRatio = rectStart.w / rectStart.h
  let width, height
  if (activeExpand === 'width') {
    width = distance
    height = width / rectRatio
  } else {
    height = distance
    width = rectRatio * height
  }
  return {
    x: center.x - width / 2,
    y: center.y - height / 2,
    w: width,
    h: height,
    r: rectStart.r
  }
}

/**
 * 传入两个点 p0， p1，返回两点连线的倾斜角度
 * 垂直状态是 0，遵循 DOM 的 rotation 规则，值域范围 [-90, 90]
 * @param {Object} p0
 * @param {Object} p1
 */
export const lineDegrees = (p0, p1) => {
  if (roughlyEqual(p0.x, p1.x)) {
    return 0
  }
  const slope = lineSlope(p0, p1)
  const degrees = Math.atan(slope) / Math.PI * 180
  return 90 + degrees
}

/**
 * 根据两点坐标，计算距离
 * @param {Object} p0
 * @param {Object} p1
 */
export const pointsDistance = (p0, p1) => {
  const x = p0.x - p1.x
  const y = p0.y - p1.y
  return Math.sqrt(x * x + y * y)
}

/**
 * 页面坐标点 position 以页面左上角为原点，顺时针旋转 angle 角度后得到的坐标点
 * @param {Object} position
 * @param {Number} angle
 */
export const rotatePosition = (position, angle) => {
  const radical = angle / 180 * Math.PI
  const sinA = Math.sin(radical)
  const cosA = Math.cos(radical)
  const { x, y } = position
  return {
    x: x * cosA - y * sinA,
    y: x * sinA + y * cosA
  }
}

/**
 * 页面坐标点 position 以 relative 点为原点
 * 顺时针旋转 angle 角度后得到的坐标点
 * @param {Object} position
 * @param {Object} relative
 * @param {Number} angle
 */
export const rotatePositionRelatively = (position, relative, angle) => {
  const shiftPosition = {
    x: position.x - relative.x,
    y: position.y - relative.y
  }
  const resultPosition = rotatePosition(shiftPosition, angle)
  return {
    x: resultPosition.x + relative.x,
    y: resultPosition.y + relative.y
  }
}

/**
 * 计算一个矩形的中心点坐标
 * @param {*} rect
 */
export const rectCenter = rect => {
  const { x, y, w, h } = rect
  return {
    x: x + w / 2,
    y: y + h / 2
  }
}

/**
 * 计算向量 point 的角度
 * @param {Object} point
 */
export const angleDegrees = point => {
  const { x, y } = point
  return Math.atan2(y, x) * 180 / Math.PI
}

/**
 * 根据两点坐标，计算其连线的斜率。注意，垂直时斜率是 Infinity
 * @param {Object} p0
 * @param {Object} p1
 */
export const lineSlope = (p0, p1) => (p1.y - p0.y) / (p1.x - p0.x)

/**
 * @param {Object} pa
 * @param {Object} pb
 * 获取坐标 pa 和 pb 的中间点坐标
 */
export const centerPoint = (pa, pb) => ({
  x: (pa.x + pb.x) / 2,
  y: (pa.y + pb.y) / 2
})

/**
 * 计算鼠标从 start 点拖到到 end 点时的旋转角度
 * @param {Object[]} pinnedPoints
 * @param {Object} start
 * @param {Object} end
 */
export const computeRotation = (center, start, end) => {
  const shiftStart = {
    x: start.x - center.x,
    y: start.y - center.y
  }
  const shiftEnd = {
    x: end.x - center.x,
    y: end.y - center.y
  }
  const startDegrees = angleDegrees(shiftStart)
  const endDegrees = angleDegrees(shiftEnd)
  return endDegrees - startDegrees
}

/**
 * 计算一条直线上（由 points 两点确定）离 point 点最近的点，即垂直交叉点
 * @param {Object[]} points
 * @param {Object} point
 */
export const squareCrossPoint = (points, point) => {
  const {x, y} = point
  const [p0, p1] = points
  if (roughlyEqual(p0.x, p1.x)) {
    return { x: p0.x, y }
  } else if (roughlyEqual(p0.y, p1.y)) {
    return { x, y: p0.y }
  }
  const baseSlope = lineSlope(p0, p1)
  const verticalSlope = -1 / baseSlope
  const nextX = (baseSlope * p0.x + y - p0.y - verticalSlope * x) / (baseSlope - verticalSlope)
  const nextY = p0.y - baseSlope * (p0.x - nextX)
  return {x: nextX, y: nextY}
}

/**
 * 计算矩形的八个关键端点以及中心点
 * @param {*} rect
 */
export const computeEndPoints = rect => {
  const center = rectCenter(rect)
  const { x, y, w, h, r } = rect
  const [p0, p1, p2, p3] = [
    {x, y},
    {x: x + w, y},
    {x: x + w, y: y + h},
    {x, y: y + h}
  ].map(point => rotatePositionRelatively(point, center, r))

  return {
    center,
    lt: p0,
    // 右上
    rt: p1,
    // 右下
    rb: p2,
    // 左下
    lb: p3,
    ct: centerPoint(p0, p1),
    rm: centerPoint(p1, p2),
    cb: centerPoint(p2, p3),
    lm: centerPoint(p3, p0)
  }
}

/**
 * 移动矩形，返回移动的矩形数据
 * @param {*} mouseStart
 * @param {*} mouseEnd
 * @param {*} rectStart
 */
const moveRect = (mouseStart, mouseEnd, rectStart) => {
  const x = mouseEnd.x - mouseStart.x
  const y = mouseEnd.y - mouseStart.y
  return {
    ...rectStart,
    x: rectStart.x + x,
    y: rectStart.y + y
  }
}

/**
 * 计算鼠标从 mouseStart 点开始按住旋转到 mouseEnd 后返回的矩形，值域为 [-180, 180]
 * @param {*} mouseStart
 * @param {*} mouseEnd
 * @param {*} rectStart
 */
const rotateRect = (mouseStart, mouseEnd, rectStart) => {
  const center = rectCenter(rectStart)
  // const shrotcutRotations = [-180, -135, -90, -45, 0, 45, 90, 135, 180]
  const offsetRotation = computeRotation(center, mouseStart, mouseEnd)
  let nextRotation = rectStart.r + offsetRotation
  if (nextRotation >= 180) {
    nextRotation = nextRotation - 360
  }
  if (nextRotation <= -180) {
    nextRotation = nextRotation + 360
  }
  return {
    ...rectStart,
    r: nextRotation
  }
}

/**
 * resize 矩形，返回 resize 后的矩形数据
 * @param {*} mouseStart
 * @param {*} mouseEnd
 * @param {*} adjustType
 * @param {*} rectStart
 * @param {*} fixedRatio
 */
const resizeRect = (mouseStart, mouseEnd, adjustType, rectStart, fixedRatio) => {
  const e = new EndPoints(rectStart)
  let activeExpand = null
  let acrossPoints = []
  let fixedMouseEnd = mouseEnd
  if (fixedRatio) {
    switch (adjustType) {
    case 'lt':
    case 'rb':
      acrossPoints = [e.lt, e.rb]
      break
    case 'rt':
    case 'lb':
      acrossPoints = [e.rt, e.lb]
      break
    case 'ct':
    case 'cb':
      acrossPoints = [e.ct, e.cb]
      activeExpand = 'height'
      break
    case 'lm':
    case 'rm':
      acrossPoints = [e.lm, e.rm]
      activeExpand = 'width'
      break
    default:
      acrossPoints = []
    }
    if (acrossPoints.length === 2) {
      fixedMouseEnd = squareCrossPoint(acrossPoints, mouseEnd)
    }
  }

  let pinnedPoints = []
  switch (adjustType) {
  case 'lt':
    pinnedPoints = [e.rb]
    break
  case 'rt':
    pinnedPoints = [e.lb]
    break
  case 'lb':
    pinnedPoints = [e.rt]
    break
  case 'rb':
    pinnedPoints = [e.lt]
    break
  case 'cb':
    pinnedPoints = [e.lt, e.rt]
    break
  case 'ct':
    pinnedPoints = [e.lb, e.rb]
    break
  case 'lm':
    pinnedPoints = [e.rt, e.rb]
    break
  case 'rm':
    pinnedPoints = [e.lt, e.lb]
    break
  default:
    pinnedPoints = []
  }

  const { length } = pinnedPoints
  let result
  if (length === 1) {
    result = computeRectWithCrossPoints(pinnedPoints[0], fixedMouseEnd, rectStart.r)
  } else if (length === 2) {
    if (fixedRatio) {
      result = computeRatioedRectWithPinnedLine(pinnedPoints, fixedMouseEnd, rectStart, activeExpand)
    } else {
      result = computeRectWithPinnedLine(pinnedPoints, fixedMouseEnd, rectStart.r)
    }
  }
  return result
}

/**
 * 计算入口
 * @param {Position} mouseStart
 * @param {Position} mouseEnd
 * @param {String} adjustType: 'rotate'|'move'|'lt'|'rt'|'ct'|'lb'|'rb'|'cb'|'lm'|'rm'
 * @param {Rect} rectStart: { x: Number, y: Number, w: Number, h: Number, r: Number }
 * @param {Boolean} fixedRatio
 */
export default (
  adjustType,
  mouseStart,
  mouseEnd,
  rectStart,
  fixedRatio
) => {
  if (adjustType === 'move') {
    return moveRect(mouseStart, mouseEnd, rectStart)
  }
  if (adjustType === 'rotate') {
    return rotateRect(mouseStart, mouseEnd, rectStart)
  }
  return resizeRect(
    mouseStart,
    mouseEnd,
    adjustType,
    rectStart,
    fixedRatio
  )
}
