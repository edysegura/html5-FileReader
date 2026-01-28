import { storeFile, getFile, getAllFiles, deleteFile } from './db.js'

/**
 * Initialize UI elements and attach event listeners
 */
export function initializeUI() {
  const fileInput = document.getElementById('fileInput')
  const recordIdInput = document.getElementById('recordId')
  const loadBtn = document.getElementById('loadBtn')

  fileInput.addEventListener('change', handleFileUpload)
  loadBtn.addEventListener('click', handleLoadFile)
}

/**
 * Handle file upload from the input element
 * @param {Event} event - The change event from file input
 */
async function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  try {
    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const binaryString = e.target.result
        const id = await storeFile(binaryString, file.type, file.size)

        showNotification(`File stored successfully with ID: ${id}`, 'success')
        event.target.value = '' // Clear input

        // Refresh the file list
        await refreshFilesList()
      } catch (error) {
        showNotification('Error storing file', 'error')
        console.error(error)
      }
    }

    reader.onerror = () => {
      showNotification('Error reading file', 'error')
    }

    reader.readAsBinaryString(file)
  } catch (error) {
    showNotification('Error processing file', 'error')
    console.error(error)
  }
}

/**
 * Handle loading and displaying a file
 */
async function handleLoadFile() {
  const recordIdInput = document.getElementById('recordId')
  const recordId = parseInt(recordIdInput.value, 10)

  if (!recordId || recordId < 1) {
    showNotification('Please enter a valid record ID', 'warning')
    return
  }

  try {
    const file = await getFile(recordId)
    if (!file) {
      showNotification(`No file found with ID: ${recordId}`, 'warning')
      return
    }

    displayFilePreview(file)
  } catch (error) {
    showNotification('Error loading file', 'error')
    console.error(error)
  }
}

/**
 * Display a file preview in the preview section
 * @param {Object} file - The file object from the database
 */
function displayFilePreview(file) {
  const previewImage = document.getElementById('previewImage')
  const previewInfo = document.getElementById('previewInfo')
  const uploadTime = document.getElementById('uploadTime')

  // Determine the correct data URL format based on MIME type
  const mimeType = file.mimeType || 'image/jpeg'
  const dataUrl = `data:${mimeType};base64,${btoa(file.data)}`

  previewImage.src = dataUrl
  previewImage.style.display = 'block'

  uploadTime.textContent = `Uploaded: ${new Date(file.created).toLocaleString()}`
  previewInfo.style.display = 'block'
}

/**
 * Refresh and display the list of all stored files
 */
export async function refreshFilesList() {
  try {
    const files = await getAllFiles()
    const filesList = document.getElementById('filesList')
    const noFiles = document.getElementById('noFiles')
    const filesTable = document.getElementById('filesTable')
    const filesTableBody = document.getElementById('filesTableBody')

    if (files.length === 0) {
      noFiles.style.display = 'block'
      filesTable.style.display = 'none'
      filesTableBody.innerHTML = ''
      return
    }

    // Hide "no files" message and show table
    noFiles.style.display = 'none'
    filesTable.style.display = 'table'

    // Clear table body
    filesTableBody.innerHTML = ''

    // Add rows for each file
    files.forEach((file) => {
      const row = document.createElement('tr')
      row.innerHTML = `
        <td>${file.id}</td>
        <td>${new Date(file.created).toLocaleString()}</td>
        <td>${file.size || file.data.length}</td>
        <td>
          <button 
            class="outline" 
            data-id="${file.id}"
            onclick="window.deleteFileHandler(${file.id})"
            aria-label="Delete file ${file.id}"
          >
            Delete
          </button>
        </td>
      `
      filesTableBody.appendChild(row)
    })
  } catch (error) {
    console.error('Error refreshing files list:', error)
  }
}

/**
 * Show a notification message to the user
 * @param {string} message - The message to display
 * @param {string} [type='info'] - The notification type: 'success', 'error', 'warning', 'info'
 */
function showNotification(message, type = 'info') {
  // For now, use console.log. In a production app, implement a proper notification system
  console.log(`[${type.toUpperCase()}] ${message}`)

  // Optional: You could implement a toast notification system here
  // For accessibility, you might want to add a live region announcement
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', 'assertive')
  announcement.textContent = message
  announcement.style.cssText = 'position: absolute; left: -10000px;'
  document.body.appendChild(announcement)

  setTimeout(() => announcement.remove(), 1000)
}

/**
 * Handle file deletion (called from the table button)
 * @param {number} id - File ID to delete
 */
export async function handleDeleteFile(id) {
  if (!confirm(`Are you sure you want to delete file ${id}?`)) {
    return
  }

  try {
    await deleteFile(id)
    showNotification(`File ${id} deleted successfully`, 'success')
    await refreshFilesList()
  } catch (error) {
    showNotification('Error deleting file', 'error')
    console.error(error)
  }
}
