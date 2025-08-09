// Range function
export function range(start, end, step = 1) {
  const result = []
  for (let i = start; i <= end; i += step) {
    result.push(i)
  }
  return result
}
