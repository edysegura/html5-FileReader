const input = document.getElementById('upload')
const output = document.querySelector('output')

function showData(data) {
  output.textContent = data
}

function processCSV(csv) {
  const output =
    csv.split('\n').map(line => line.split(','))
  showData(output)
}

function readCSVFile(csvFile) {
  const reader = new FileReader()
  reader.onloadstart = () => output.textContent = 'Loading...'
  reader.onloadend = (event) => processCSV(event.target.result)
  reader.onerror = () => output.textContent = 'Could not read the file'
  reader.readAsText(csvFile)
}

input.addEventListener('change', (event) => {
  readCSVFile(event.currentTarget.files[0])
})