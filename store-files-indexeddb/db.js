import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@4.2.1/+esm'

// Define and initialize the database
export const db = new Dexie('fileStore')

// Schema definition
db.version(1).stores({
  files: '++id, created',
})

// Type definitions for better IDE support (JSDoc)
/**
 * @typedef {Object} StoredFile
 * @property {number} [id] - Auto-incremented ID
 * @property {Date} created - Upload timestamp
 * @property {string} data - File data as binary string
 * @property {string} [mimeType] - File MIME type
 * @property {number} [size] - File size in bytes
 */

/**
 * Store a file in IndexedDB
 * @param {string} data - File data as binary string
 * @param {string} [mimeType='image/jpeg'] - File MIME type
 * @param {number} [size=0] - File size in bytes
 * @returns {Promise<number>} - The ID of the stored file
 */
export async function storeFile(data, mimeType = 'image/jpeg', size = 0) {
  try {
    const fileObject = {
      created: new Date(),
      data,
      mimeType,
      size,
    }

    const id = await db.files.add(fileObject)
    console.log(`File stored with ID: ${id}`)
    return id
  } catch (error) {
    console.error('Error storing file:', error)
    throw error
  }
}

/**
 * Retrieve a file from IndexedDB by ID
 * @param {number} id - File ID
 * @returns {Promise<StoredFile|undefined>} - The stored file object or undefined if not found
 */
export async function getFile(id) {
  try {
    const file = await db.files.get(id)
    if (!file) {
      console.warn(`File with ID ${id} not found`)
    }
    return file
  } catch (error) {
    console.error('Error retrieving file:', error)
    throw error
  }
}

/**
 * Get all stored files
 * @returns {Promise<StoredFile[]>} - Array of all stored files
 */
export async function getAllFiles() {
  try {
    const files = await db.files.toArray()
    return files
  } catch (error) {
    console.error('Error retrieving all files:', error)
    throw error
  }
}

/**
 * Delete a file from IndexedDB
 * @param {number} id - File ID
 * @returns {Promise<void>}
 */
export async function deleteFile(id) {
  try {
    await db.files.delete(id)
    console.log(`File with ID ${id} deleted`)
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

/**
 * Get the count of stored files
 * @returns {Promise<number>} - Number of stored files
 */
export async function getFileCount() {
  try {
    return await db.files.count()
  } catch (error) {
    console.error('Error getting file count:', error)
    throw error
  }
}
