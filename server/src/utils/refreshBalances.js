const { evmBalance } = require("./evmBalance");
const walletAddresses = require("../data/evmWallets.json");

async function processWallets(walletAddresses) {
  for (const [index, address] of walletAddresses.entries()) {
    console.log(`Processing address ${index + 1}: ${address}`);
    await evmBalance(address);

    const delay = Math.floor(Math.random() * 5000); // Random delay up to 5 seconds
    console.log(`Waiting for ${delay}`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

processWallets(walletAddresses);
