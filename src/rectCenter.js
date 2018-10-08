export default rect => {
  const { x, y, w, h } = rect
  return {
    x: x + w / 2,
    y: y + h / 2
  }
}
