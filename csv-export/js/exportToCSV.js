'use strict'

function arrayToCSV(data) {
  let csvText = ''
  data.forEach(row => {
    csvText += row.join(',') + '\n'
  })
  return csvText
}

export default function exportToCSV(filename, data) {
  let csvText = arrayToCSV(data)
  console.log(csvText)
}