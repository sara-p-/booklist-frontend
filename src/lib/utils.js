// Range function
export function range(start, end, step = 1) {
  const result = []
  for (let i = start; i <= end; i += step) {
    result.push(i)
  }
  return result
}

// Convert string to date
export function convertStringToDate(ymdString) {
  // Extract year, month, and day from the Ymd string
  const year = parseInt(ymdString.substring(0, 4), 10)
  // Month in JavaScript Date objects is 0-indexed (0 for January, 11 for December)
  const month = parseInt(ymdString.substring(4, 6), 10) - 1
  const day = parseInt(ymdString.substring(6, 8), 10)

  // Create a new Date object
  // Note: If you don't specify time components, they will default to 00:00:00 local time.
  return new Date(year, month, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
