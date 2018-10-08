export default (mouseStart, mouseEnd, rect) => {
  const x = mouseEnd.x - mouseStart.x
  const y = mouseEnd.y - mouseStart.y
  return {
    ...rect,
    x: rect.x + x,
    y: rect.y + y
  } 
}
