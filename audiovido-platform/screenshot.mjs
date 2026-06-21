import puppeteer from 'puppeteer-core';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
const page = await browser.newPage();
await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000/library', { waitUntil: 'networkidle2', timeout: 15000 });
await sleep(2000);

async function clickButton(text) {
  return await page.evaluate((txt) => {
    const btns = document.querySelectorAll('button');
    for (const btn of btns) {
      if (btn.textContent.includes(txt)) { btn.click(); return true; }
    }
    return false;
  }, text);
}

await clickButton('Playlists');
await sleep(1000);
await clickButton('Create DJ');
await sleep(1500);
await clickButton('Manual');
await sleep(2000);

// Intermediate default
await page.screenshot({ path: '/tmp/intermediate-fixed.png', fullPage: true });
console.log('Intermediate saved');

// Also narrower viewport (iPhone SE)
await page.setViewport({ width: 320, height: 568, deviceScaleFactor: 2 });
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/intermediate-narrow.png', fullPage: true });
console.log('Narrow viewport saved');

await browser.close();
