importScripts('./js/data-sw.js')

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  self.clients.claim()
})

function loadContent() {
  const filename = 'my-file.txt'
  const downloadResponse = new Response(arrayToCSV(data))
  downloadResponse.headers.append(
    'Content-Disposition',
    `attachment; filename="${filename}"`
  )
  return downloadResponse
}

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('download-file')) {
    event.respondWith(loadContent())
  }
})
