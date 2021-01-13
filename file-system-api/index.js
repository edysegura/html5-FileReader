const button = document.querySelector('button')
const output = document.querySelector('output')

button.addEventListener('click', async () => {
  const [ handle ] = await window.showOpenFilePicker()
  const file = await handle.getFile()

  console.log(file)

  output.innerHTML = `
    <ul>
      <li>File name: ${file.name}</li>
    </ul>
  `
})
