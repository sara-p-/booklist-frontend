export async function fetchData(url: string) {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (data.data.status === 404) {
      return []
    }
    return data
  } catch (error) {
    console.error('Error fetching book data:', error)
    return []
  }
}
