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

const pond = FilePond.create(
  document.querySelector('input[type="file"]'),
  pondConfig,
)

// if the imageTransformVariants option is set, the prepare file event
// will receive an array of transformed blobs
pond.on('preparefile', (metadata, output) => {
  const [ transformedOutput ] = output
  console.log('File size before compression:', metadata.file.size)
  console.log('File size after compression:', transformedOutput.file.size)
  output.forEach((blob) => {
    const figure = document.createElement('figure')
    const image = document.createElement('img')
    const figcaption = document.createElement('figcaption')
    image.src = URL.createObjectURL(blob.file)
    figcaption.textContent = `Size: ${blob.file.size} bytes`
    figure.appendChild(image)
    figure.appendChild(figcaption)
    document.body.appendChild(figure)
  })
})
