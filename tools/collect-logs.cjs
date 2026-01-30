const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const logs = [];
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    const text = `${msg.type()}: ${msg.text()}`;
    logs.push(text);
    console.log(text);
  });

  page.on('pageerror', err => {
    const text = `pageerror: ${err.message}`;
    logs.push(text);
    console.error(text);
  });

  console.log('Navigating to http://localhost:5175/');
  await page.goto('http://localhost:5175/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  await browser.close();
  const out = logs.join('\n') + '\n';
  fs.writeFileSync('playwright-console.log', out, 'utf8');
  console.log('Saved console logs to playwright-console.log');
})().catch(err => {
  console.error('Script error', err);
  process.exit(1);
});
