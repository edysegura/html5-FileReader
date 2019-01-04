const upload = document.getElementById('upload')
const previews = document.getElementById('previews')

function createPreview(preview) {
  const image = new Image()
  image.src = preview
  previews.appendChild(image)
}

function showPreview(file) {
  const fileReader = new FileReader()
  fileReader.onloadend = event => {
    createPreview(event.target.result)
  }
  fileReader.readAsDataURL(file)
}

upload.addEventListener('change', event => {
  const files = event.target.files
  for (const file of files) {
    showPreview(file)
  }
})
