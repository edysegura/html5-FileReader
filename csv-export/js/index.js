import data from './data.js'
import generateHtmlTable from './buildTable.js'
import exportToCSV from './exportToCSV.js'

generateHtmlTable(data)

const linkExportCSV = document.querySelector('a')
linkExportCSV.addEventListener('click', (e) => {
  e.preventDefault()
  exportToCSV(data, 'my-filename.csv')
})

navigator.serviceWorker
  .register('sw.js')
  .then(() => console.log('Service Worker Registered!'))
