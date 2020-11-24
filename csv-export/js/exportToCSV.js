export default function exportToCSV(data, filename) {
  const csvText = arrayToCSV(data)
  const csvBlob = new Blob([csvText], { type: 'text/csv;charset=UTF-8' })

  if (navigator.msSaveBlob) {
    // IE10+
    navigator.msSaveBlob(csvBlob, filename)
  } else {
    const linkToDownload = document.createElement('a')
    const csvURL = URL.createObjectURL(csvBlob)

    linkToDownload.href = csvURL
    linkToDownload.download = filename
    linkToDownload.style.display = 'none'

    document.body.appendChild(linkToDownload)
    linkToDownload.click()
    document.body.removeChild(linkToDownload)
    URL.revokeObjectURL(csvURL)
  }
}

function arrayToCSV(data) {
  return data.map((row) => row.join(',')).join('\n')
}
