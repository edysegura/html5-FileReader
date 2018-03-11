
const upload = document.getElementById('upload')
const preview = document.getElementById('preview')

function showPreview(file) {
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
        preview.src = fileReader.result
    }
    fileReader.readAsDataURL(file)
}

upload.addEventListener('change', event => {
    showPreview(event.target.files[0])
})