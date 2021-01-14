const btnGetFile = document.getElementById('btnGetFile')
const btnSaveFile = document.getElementById('btnSaveFile')
const output = document.querySelector('output')

function convertToKB(size) {
  return size / 1024
}

btnGetFile.addEventListener('click', async () => {
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

btnSaveFile.addEventListener('click', async () => {
  const textFile = new File(['Hello File System API'], 'hello.txt', {
    type: 'text/plain',
  })
  const handle = await window.showSaveFilePicker()
  const writable = await handle.createWritable()
  await writable.write(textFile)
  await writable.close()
})