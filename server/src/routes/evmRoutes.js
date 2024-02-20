const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/portfolio", async (req, res) => {
  const filePath = path.join(__dirname, "../data/evmData.json");
  res.sendFile(filePath);
});

module.exports = router;
