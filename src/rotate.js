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
