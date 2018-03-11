const input = document.getElementById('upload')
const output = document.querySelector('output')

function showData(data) {
  const header = data.shift()
  const lines = data.map(line => `
    <tr>
      <td>${ line.join('</td><td>') }</td>
    </tr>
  `)
  const tableHtml = `
    <table>
      <tr>
        <th>${ header.join('</th><th>') }</th>
      </tr>
      ${ lines.join('') }
    </table>
  `
  output.innerHTML = tableHtml
}

function processCSV(csvData) {
  const lineDelimiter = '\n'
  const colunmDelimiter = ','

  const output =
    csvData
      .split(lineDelimiter)
      .map(line => line.split(colunmDelimiter))

  return output
}

function loadCSVFile(csvFile) {
  const reader = new FileReader()
  reader.onloadstart = () => output.textContent = 'Loading...'
  reader.onloadend = ( event ) => showData(processCSV(event.target.result))
  reader.onerror = () => output.textContent = 'This file could not be read'
  reader.readAsText(csvFile)
}

input.addEventListener('change', (event) => {
  loadCSVFile(event.currentTarget.files[0])
})