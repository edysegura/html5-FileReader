self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('download-file')) {
    const filename = 'my-filename.csv'
    const data = 'testing...'
    const response = new Response(data)
    response.headers.append(
      'Content-Disposition',
      `attachment; filename="${filename}"`
    )
    event.respondWith(response)
  }
})
