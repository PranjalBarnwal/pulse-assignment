const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const { delay } = require('./utils');
puppeteer.use(StealthPlugin());

async function scrapeCapterra(companyName, startDate, endDate) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://www.capterra.com/', { waitUntil: 'networkidle2' });
  await delay(2000);

  await page.type('input[data-evt-id="294776841"]', companyName, { delay: 100 });
  await delay(2000);

  await page.click('i[aria-label="search"]');
  await delay(5000);

  const productCards = await page.$$('[data-testid="search-product-card"]');
  if (productCards.length === 0) {
    console.log('Invalid Company Name or no product found.');
    await browser.close();
    return;
  }

  const firstCard = productCards[0];
  const viewAllReviewsLink = await firstCard.$('a.sb.link[href*="/reviews/"]');
  if (viewAllReviewsLink) {
    await viewAllReviewsLink.click();
    await delay(5000);
  }

  let clickCount = 0;
  const maxClicks = 10;
  while (clickCount < maxClicks) {
    const showMoreButton = await page.$('button[data-testid="show-more-reviews"]');
    if (showMoreButton) {
      await showMoreButton.click();
      await delay(1500);
      clickCount++;
    } else {
      break;
    }
  }

  const reviews = await page.evaluate(() => {
    const reviewElements = document.querySelectorAll('.sb.screen-container.md\\:gap-5xl.m-auto.block.px-0.md\\:grid.md\\:grid-cols-2');
    const reviewsData = [];
    reviewElements.forEach(element => {
      const reviewerName = element.querySelector('[data-testid="reviewer-full-name"]')?.innerText.trim();
      const overallContent = element.querySelector('[data-testid="overall-content"]')?.innerText.trim();
      const reviewDate = element.querySelector('[data-testid="review-written-on"]')?.innerText.trim();

      if (reviewerName && overallContent && reviewDate) {
        reviewsData.push({ reviewerName, overallContent, reviewDate });
      }
    });
    return reviewsData;
  });

  const filteredReviews = reviews.filter(review => {
    const reviewDate = new Date(review.reviewDate);
    return reviewDate >= startDate && reviewDate <= endDate;
  });

  if (filteredReviews.length === 0) {
    console.log('No reviews found in the given date range.');
  } else {
    fs.writeFileSync('data.json', JSON.stringify(filteredReviews, null, 2));
    console.log('Reviews have been saved to data.json');
  }

  await browser.close();
}

module.exports = { scrapeCapterra };
