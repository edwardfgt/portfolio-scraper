const express = require("express");
const path = require("path");
const router = express.Router();
const { processWallets } = require("../utils/refreshBalances");
const walletAddresses = require("../data/evmWallets.json");

router.get("/portfolio", async (req, res) => {
  const filePath = path.join(__dirname, "../data/evmData.json");
  console.log("GET request, file path:", filePath);
  res.sendFile(filePath);
});

router.post("/refresh-balances", async (req, res) => {
  try {
    await processWallets(walletAddresses);
    const filePath = path.join(__dirname, "../data/evmData.json");
    console.log("POST request, file path:", filePath);
    res.status(200);
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Error refreshing balances: " + error.message);
  }
});

module.exports = router;
