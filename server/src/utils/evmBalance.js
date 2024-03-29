require("dotenv").config({ path: "../../.env" });
const { chromium } = require("playwright");
const { splitString } = require("./splitString");
const { updateWalletData } = require("./updateWalletdata");

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0",
  "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/88.0.705.50",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0",
];

function getRandomUserAgent() {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

async function evmBalance(walletAddress) {
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    userAgent: getRandomUserAgent(),
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

        const fullDivText = item.textContent;
        const allocationMatch = fullDivText.match(/(\d+)%/);
        const allocation = allocationMatch ? allocationMatch[1] : null;

        return { name, value, allocation };
      });
    }
  );

  //console.log(data);

  let splitObj = splitString(balancePercent);

  await browser.close();

  let evmObj = {
    address: walletAddress,
    balance: splitObj.balance,
    change: splitObj.change,
    chains: data,
  };

  updateWalletData(evmObj);
  return evmObj;
}

module.exports = { evmBalance };
