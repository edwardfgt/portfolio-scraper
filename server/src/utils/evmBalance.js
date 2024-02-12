const { chromium } = require("playwright");

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

  const divText = await page.textContent(".HeaderInfo_totalAssetInner__HyrdC");
  await browser.close();
  return divText;
}

module.exports = { evmBalance };
