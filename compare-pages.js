const { chromium } = require("playwright");
const looksSame = require("looks-same");

const originalUrl = "https://oldsite.com/";
const newUrl = "https://stagedsite.com/";

const routes = ["contact", "about"];

const headlessMode = true;
const waitBeforeScreenshot = 1000;

(async () => {
  // Setup
  const browser = await chromium.launch({
    headless: headlessMode,
    // slowMo: 100,
  });

  const page = await browser.newPage();

  const processUrl = async (url, path) => {
    console.log(`Processing ${url} to ${path}`);
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    await page.waitForTimeout(waitBeforeScreenshot);

    await page.screenshot({
      path: path,
      fullPage: true,
    });
  };

  const compareImages = async (route) => {
    console.log(`Comparing images for ${route}`);
    await looksSame.createDiff({
      reference: `./screenshots/${route}/before.png`,
      current: `./screenshots/${route}/after.png`,
      diff: `./screenshots/${route}/diff.png`,
      highlightColor: "#ff00ff", // color to highlight the differences
      strict: false, // strict comparsion
      tolerance: 2.5,
      antialiasingTolerance: 0,
      ignoreAntialiasing: true, // ignore antialising by default
      ignoreCaret: true, // ignore caret by default
    });
  };

  await processUrl(originalUrl, `./screenshots/homepage/before.png`);
  for (const route of routes) {
    await processUrl(
      `${originalUrl}${route}`,
      `./screenshots/${route}/before.png`
    );
  }

  await processUrl(newUrl, `./screenshots/homepage/after.png`);
  for (const route of routes) {
    await processUrl(`${newUrl}${route}`, `./screenshots/${route}/after.png`);
  }

  await compareImages("homepage");
  for (const route of routes) {
    await compareImages(route);
  }

  await browser.close();
})();
