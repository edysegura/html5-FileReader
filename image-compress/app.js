import * as FilePond from 'https://cdn.jsdelivr.net/npm/filepond@4.31.1/+esm'
import FilePondPluginFileValidateType from 'https://cdn.jsdelivr.net/npm/filepond-plugin-file-validate-type@1.2.9/+esm'
import FilePondPluginImageTransform from 'https://cdn.jsdelivr.net/npm/filepond-plugin-image-transform@3.8.7/+esm';

FilePond.registerPlugin(FilePondPluginFileValidateType, FilePondPluginImageTransform)

const pondConfig = {
  allowMultiple: false,
  allowFileTypeValidation: true,
  acceptedFileTypes: ['image/*'],
  imageTransformOutputMimeType: 'image/webp',
}
const pond = FilePond.create(document.querySelector('input[type="file"]'), pondConfig)
