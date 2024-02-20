const fs = require("fs");
const path = "../data/evmData.json";

function updateWalletData(evmObj) {
  let data = {};

  if (fs.existsSync(path)) {
    const fileContent = fs.readFileSync(path, "utf8");
    if (fileContent) {
      try {
        data = JSON.parse(fileContent);
      } catch (e) {
        console.error("Error parsing JSON from file:", e);
      }
    }
  }

  data[evmObj.address] = evmObj;

  fs.writeFileSync(path, JSON.stringify(data, null, 2)); // Formatting for readability
}

module.exports = { updateWalletData };
