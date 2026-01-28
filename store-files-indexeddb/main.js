import { initializeUI, refreshFilesList, handleDeleteFile } from './ui.js'

/**
 * Application entry point
 * Initialize the app when the DOM is ready
 */
async function initializeApp() {
  try {
    // Initialize UI event listeners
    initializeUI()

    // Make delete handler globally available for HTML onclick
    window.deleteFileHandler = handleDeleteFile

    // Load and display initial file list
    await refreshFilesList()

    console.log('Application initialized successfully')
  } catch (error) {
    console.error('Error initializing application:', error)
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp)
