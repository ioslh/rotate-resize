import angleDegrees from './angleDegrees'

export default (center, start, end) => {
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
