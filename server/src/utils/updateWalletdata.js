const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/evmData.json");

function updateWalletData(evmObj) {
  let data = {};

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    if (fileContent) {
      try {
        data = JSON.parse(fileContent);
      } catch (e) {
        console.error("Error parsing JSON from file:", e);
      }
    }
  }

  data[evmObj.address] = evmObj;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // Formatting for readability
}

module.exports = { updateWalletData };
