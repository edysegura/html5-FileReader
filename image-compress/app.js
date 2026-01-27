import * as FilePond from 'https://cdn.jsdelivr.net/npm/filepond@4.31.1/+esm'
import FilePondPluginFileValidateType from 'https://cdn.jsdelivr.net/npm/filepond-plugin-file-validate-type@1.2.9/+esm'
import FilePondPluginImageResize from 'https://cdn.jsdelivr.net/npm/filepond-plugin-image-resize@2.0.10/+esm'
import FilePondPluginImageTransform from 'https://cdn.jsdelivr.net/npm/filepond-plugin-image-transform@3.8.7/+esm'

FilePond.registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
)

const pondConfig = {
  allowMultiple: true,
  allowFileTypeValidation: true,
  acceptedFileTypes: ['image/*'],
  imageResizeTargetWidth: 300,
  imageTransformOutputMimeType: 'image/webp',
  imageTransformVariants: {
    thumb_small_: (transforms) => {
      transforms.resize = {
        size: {
          width: 128,
          height: 128,
        },
      }
      return transforms
    },
  },
}

const fileInput = document.querySelector('input[type="file"]')
const previewGrid = document.getElementById('preview-grid')
const emptyState = document.getElementById('empty-state')

const filePond = FilePond.create(fileInput, pondConfig)

// Show/hide empty state
function updateGalleryState() {
  const hasImages = previewGrid.children.length > 0
  emptyState.style.display = hasImages ? 'none' : 'block'
}

// Handle file preparation and display
filePond.on('preparefile', (metadata, output) => {
  const [transformedOutput] = output
  console.log('File size before compression:', metadata.file.size)
  console.log('File size after compression:', transformedOutput.file.size)

  output.forEach((blob) => {
    const figure = document.createElement('figure')
    const image = document.createElement('img')
    const figcaption = document.createElement('figcaption')

    image.src = URL.createObjectURL(blob.file)
    image.alt = metadata.file.name

    const sizeInKB = (blob.file.size / 1024).toFixed(2)
    const originalSizeInKB = (metadata.file.size / 1024).toFixed(2)
    const compressionRatio = (
      (1 - blob.file.size / metadata.file.size) *
      100
    ).toFixed(1)

    figcaption.innerHTML = `
      <div style="text-align: center;">
        <strong>${metadata.file.name.substring(0, 20)}...</strong>
        <div style="margin-top: 0.25rem;">
          <small>${originalSizeInKB} KB → ${sizeInKB} KB</small>
        </div>
        <div style="margin-top: 0.25rem; color: var(--primary);">
          <small>${compressionRatio}% smaller</small>
        </div>
      </div>
    `

    figure.appendChild(image)
    figure.appendChild(figcaption)
    previewGrid.appendChild(figure)
  })

  updateGalleryState()
})

// Clean up when file is removed
filePond.on('processfile', (error, file) => {
  if (error) {
    console.error('Error processing file:', error)
  }
})

// Initialize empty state on load
updateGalleryState()
