const input = document.getElementById('upload')
const output = document.querySelector('output')

function showData(data) {
  output.textContent = data
}

function processCSV(csvData) {
  const lineDelimiter = '\n', colunmDelimiter = ','
  const output =
    csvData
      .split(lineDelimiter)
      .map(line => line.split(colunmDelimiter))
  return output
}

function readCSVFile(csvFile) {
  const reader = new FileReader()
  reader.onloadstart = () => output.textContent = 'Loading...'
  reader.onloadend = ( event ) => showData(processCSV(event.target.result))
  reader.onerror = () => output.textContent = 'Could not read the file'
  reader.readAsText(csvFile)
}

input.addEventListener('change', (event) => {
  readCSVFile(event.currentTarget.files[0])
})