require("dotenv").config({ path: "../../.env" });
const { chromium } = require("playwright");
const { splitString } = require("./splitString");

async function evmBalance(walletAddress) {
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" +
      " AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  });
  const page = await browser.newPage();
  let cookiesAccepted = false;
  await page.goto(`https://debank.com/profile/${walletAddress}`);
  await page.waitForTimeout(5000);

  const balancePercent = await page.textContent(
    ".HeaderInfo_totalAssetInner__HyrdC"
  );
  let splitObj = splitString(balancePercent);

  await browser.close();

  let evmObj = {
    address: walletAddress,
    balance: splitObj.balance,
    change: splitObj.change,
  };

  return evmObj;
}

(async () => {
  console.log(await evmBalance(process.env.eth1));
})();

module.exports = { evmBalance };
