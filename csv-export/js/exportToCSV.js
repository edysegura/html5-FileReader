export default function exportToCSV(data, filename) {
  const csvText = arrayToCSV(data)
  const csvBlob = new Blob([csvText], { type: 'text/csv;charset=UTF-8' })

  if (navigator.msSaveBlob) {
    // IE10+
    navigator.msSaveBlob(csvBlob, filename)
  } else {
    const link = document.createElement('a')
    const csvURL = URL.createObjectURL(csvBlob)

    link.href = csvURL
    link.download = filename
    link.style.display = 'none'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(csvURL)
  }
}

function arrayToCSV(data) {
  return data.map((row) => row.join(',')).join('\n')
}
