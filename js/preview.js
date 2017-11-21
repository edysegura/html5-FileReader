
const upload = document.getElementById('upload')

upload.addEventListener('change', e => {
    console.log(e.target.files)
})