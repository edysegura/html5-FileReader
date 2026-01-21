const btnGetFile = document.getElementById('btnGetFile')
const btnSaveFile = document.getElementById('btnSaveFile')
const output = document.getElementById('output')

function convertToKB(size) {
  return size / 1024
}

async function handleGetFile() {
  try {
    const [handle] = await window.showOpenFilePicker()
    const file = await handle.getFile()

    console.log(`👁️ [app.js] `, file)

    const extension = file.name.split('.').pop()
    output.innerHTML = `
      <ul>
        <li>File name: ${file.name}</li>
        <li>File type: ${file.type || `Unknown (.${extension})`}</li>
        <li>File size: ${convertToKB(file.size).toFixed(2)} KB</li>
      </ul>
    `
  } catch (error) {
    output.textContent = 'No file selected.'
    console.warn(error)
  }
}

async function handleSaveFile() {
  try {
    const textFile = new File([output.textContent], 'document.txt', {
      type: 'text/plain',
    })
    const handle = await window.showSaveFilePicker()
    const writable = await handle.createWritable()
    await writable.write(textFile)
    await writable.close()
  } catch (error) {
    console.error(`👁️ [app.js] ${error}`)
  }
}

btnGetFile.addEventListener('click', handleGetFile)
btnSaveFile.addEventListener('click', handleSaveFile)
