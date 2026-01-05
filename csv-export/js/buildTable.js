export default function generateHtmlTable(data) {
  const output = document.querySelector('#tableContainer')
  const table = document.createElement('table')

  table.classList.add('striped', 'hovered')

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
