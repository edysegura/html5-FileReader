'use strict'

const upload = document.getElementById('upload')
const previews = document.getElementById('previews')
const gallery = document.getElementById('gallery')

function createPreview(preview) {
  const image = new Image()
  image.src = preview
  previews.appendChild(image)

  // Show gallery section when first image is added
  if (gallery.style.display === 'none') {
    gallery.style.display = 'block'
  }
}

function showPreview(file) {
  const fileReader = new FileReader()
  fileReader.addEventListener('loadend', (event) =>
    createPreview(event.target.result),
  )
  fileReader.readAsDataURL(file)
}

function previewSelectedImages(event) {
  const files = event.target.files
  for (const file of files) {
    ;/^image/.test(file.type) && showPreview(file)
  }
}

upload.addEventListener('change', previewSelectedImages)
