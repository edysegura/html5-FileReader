const button = document.querySelector('button')
const output = document.querySelector('output')

function convertToKB(size) {
  return size / 1024
}

button.addEventListener('click', async () => {
  const [ handle ] = await window.showOpenFilePicker()
  const file = await handle.getFile()

  console.log(file)

  output.innerHTML = `
    <ul>
      <li>File name: ${file.name}</li>
      <li>File type: ${file.type || "Unknow"}</li>
      <li>File size: ${convertToKB(file.size).toFixed(2)} KB</li>
    </ul>
  `
})
