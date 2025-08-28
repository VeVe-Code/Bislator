let fs = require('fs').promises;
let path = require('path');

let removefile = async (filename) => {
  try {
    let filePath = path.join(__dirname, '..', 'public', filename);

    // Check if file exists
    await fs.access(filePath);

    // Remove file
    await fs.unlink(filePath);

    console.log("File deleted:", filePath);
  } catch (err) {
    // If file not found, ignore
    if (err.code === 'ENOENT') {
      console.log("File does not exist, skip delete");
    } else {
      console.error("Error deleting file:", err);
    }
  }
};

module.exports = removefile;
