export default point => {
  const { x, y } = point
  return Math.atan2(y, x) * 180 / Math.PI
}
