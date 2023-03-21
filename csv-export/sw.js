importScripts('./js/data-sw.js')

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', () => {
  self.clients.claim()
})

function loadContent(fileName) {
  const downloadResponse = new Response(arrayToCSV(data))
  downloadResponse.headers.append(
    'Content-Disposition',
    `attachment; filename="${fileName}"`,
  )
  return downloadResponse
}

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('download-file/')) {
    const regexp = /\/([^\/]+)$/
    const [, fileName] = regexp.exec(event.request.url)
    event.respondWith(loadContent(fileName))
  }
})
