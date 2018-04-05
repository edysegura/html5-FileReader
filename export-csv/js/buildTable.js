'use strict'

export default function buildTable(data) {
  const output = document.querySelector('output')
  const table = document.createElement('table')

  const createRow = (rowData) => {
    const row = table.insertRow()
    const createColumn = (colData) => {
      const column = row.insertCell()
      column.textContent = colData
    }
    rowData.forEach(createColumn)
  }

  data.forEach(createRow)
  output.appendChild(table)
}