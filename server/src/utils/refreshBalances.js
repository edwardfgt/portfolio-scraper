const { evmBalance } = require("./evmBalance");
const walletAddresses = require("../data/evmWallets.json");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/evmData.json");

async function processWallets(walletAddresses) {
  let totalBalance = 0;

  for (const [index, address] of walletAddresses.entries()) {
    console.log(`Processing address ${index + 1}: ${address}`);

    const walletData = await evmBalance(address);

    const balance = parseFloat(walletData.balance.replace(/[$,]/g, ""));
    totalBalance += balance;

    const delay = Math.floor(Math.random() * 5000); // Random delay up to 5 seconds
    console.log(`Waiting for ${delay}`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  updateTotalBalance(`$${totalBalance.toFixed(2)}`);
}

function updateTotalBalance(totalBalance) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error("File not found");
      return;
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    data.totalBalance = totalBalance;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error updating total balance:", error);
  }
}

module.exports = { processWallets, updateTotalBalance };
