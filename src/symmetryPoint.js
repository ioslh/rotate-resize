export default (start, center) => {
  const [x, y] = ['x', 'y'].map(k => start[k] + 2 * (center[k] - start[k]))
  return { x, y } 
}
