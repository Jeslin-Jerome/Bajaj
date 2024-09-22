const express = require("express");
const bodyParser = require("body-parser");
const { Buffer } = require("buffer");
const mime = require("mime-types");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
  })
  .post((req, res) => {
    const data = req.body.data || [];
    const fileBase64 = req.body.file_b64 || null;
    const numbers = [];
    const alphabets = [];
    let highestLowerAlphabet = "";
    let fileValid = false;
    let fileMimeType = "";
    let fileSizeKB = 0;

    // Extract numbers and alphabets
    for (const item of data) {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (item.length === 1 && /^[A-Za-z]$/.test(item)) {
        alphabets.push(item);
        if (item === item.toLowerCase() && item > highestLowerAlphabet) {
          highestLowerAlphabet = item;
        }
      }
    }

    // File handling
    if (fileBase64) {
      try {
        const fileBuffer = Buffer.from(fileBase64, "base64");
        fileMimeType = mime.lookup(fileBuffer) || "unknown";
        fileSizeKB = (fileBuffer.length / 1024).toFixed(2);
        fileValid = true;
      } catch (error) {
        fileValid = false;
      }
    }

    res.json({
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowerAlphabet ? [highestLowerAlphabet] : [],
      file_valid: fileValid,
      file_mime_type: fileMimeType,
      file_size_kb: fileSizeKB
    });
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
