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

  // Wait for page to render and click on div that expands chains displayed
  await page.waitForSelector(
    ".AssetsOnChain_item__GBfMt.flex_flexRow__y0UR2.AssetsOnChain_unfoldBtn__ov19o"
  );
  await page.click(
    ".AssetsOnChain_item__GBfMt.flex_flexRow__y0UR2.AssetsOnChain_unfoldBtn__ov19o"
  );

  // Extract balances for each chain
  const data = await page.$$eval(
    ".AssetsOnChain_totalChain__43Xsd > .AssetsOnChain_item__GBfMt",
    (items) => {
      return items.map((item) => {
        const name = item
          .querySelector(".AssetsOnChain_chainName__jAJuC")
          ?.textContent.trim();
        const valueSpan = item.querySelector(".AssetsOnChain_usdValue__I1B7X");
        const value = valueSpan?.textContent.trim();

        const infoDiv = valueSpan?.parentNode;
        const allocationMatch = infoDiv?.textContent.match(/(\d+)%/);
        const allocation = allocationMatch ? allocationMatch[1] : null;

        return { name, value, allocation };
      });
    }
  );

  console.log(data);

  let splitObj = splitString(balancePercent);

  await browser.close();

  let evmObj = {
    address: walletAddress,
    balance: splitObj.balance,
    change: splitObj.change,
    chains: data,
  };

  return evmObj;
}

(async () => {
  console.log(await evmBalance(process.env.eth1));
})();

module.exports = { evmBalance };
