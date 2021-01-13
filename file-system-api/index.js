const button = document.querySelector('button')

button.addEventListener('click', async () => {
  const [ handle ] = await window.showOpenFilePicker()
  const file = await handle.getFile()
  console.log(file)
})