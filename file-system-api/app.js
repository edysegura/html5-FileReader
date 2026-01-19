const btnGetFile = document.getElementById('btnGetFile')
const btnSaveFile = document.getElementById('btnSaveFile')
const output = document.getElementById('output')

function convertToKB(size) {
  return size / 1024
}

btnGetFile.addEventListener('click', async () => {
  try {
    const [handle] = await window.showOpenFilePicker()
    const file = await handle.getFile()

    console.log(file)

    output.innerHTML = `
      <ul>
        <li>File name: ${file.name}</li>
        <li>File type: ${file.type || 'Unknown'}</li>
        <li>File size: ${convertToKB(file.size).toFixed(2)} KB</li>
      </ul>
    `
  } catch (err) {
    output.textContent = 'No file selected.'
    console.warn(err)
  }
})

btnSaveFile.addEventListener('click', async () => {
  try {
    const textFile = new File([output.textContent], 'document.txt', {
      type: 'text/plain',
    })
    const handle = await window.showSaveFilePicker()
    const writable = await handle.createWritable()
    await writable.write(textFile)
    await writable.close()
  } catch (err) {
    console.warn(err)
  }
})
