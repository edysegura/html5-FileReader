import Papa from 'https://cdn.jsdelivr.net/npm/papaparse@5.4.0/+esm'

const uploadContainer = document.getElementById('upload-container')
const input = document.getElementById('upload')
const output = document.querySelector('output')

function showData(data) {
  const header = data.shift()

  data.splice(50)

  const lines = data.map(
    (line) => `
    <tr>
      <td>${line.join('</td><td>')}</td>
    </tr>
  `,
  )

  const tableHtml = `
    <table>
      <tr>
        <th>${header.join('</th><th>')}</th>
      </tr>
      ${lines.join('')}
    </table>
  `

  output.innerHTML = tableHtml
}

async function processCSV(file) {
  Papa.parse(file, {
    // header: true,
    worker: true,
    step: (results) => {
      console.log('Row:', results.data)
    },
    complete: () => {
      console.log('Finished!')
    },
  })
}

input.addEventListener('change', (event) => {
  const [firstSelectedFile] = event.currentTarget.files
  processCSV(firstSelectedFile)
})

uploadContainer.addEventListener('dragover', (event) => {
  uploadContainer.classList.add('dragover')
  event.preventDefault()
})

uploadContainer.addEventListener('dragleave', (event) => {
  uploadContainer.classList.remove('dragover')
  event.preventDefault()
})

uploadContainer.addEventListener('drop', (event) => {
  const [firstDroppedFile] = event.currentTarget.files
  processCSV(firstDroppedFile)
  uploadContainer.classList.remove('dragover')
  event.preventDefault()
})
