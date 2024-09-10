const readline = require('readline');
const { scrapeTrustRadius } = require('./trustRadius');
const { scrapeCapterra } = require('./capterra');
const { validateAndParseDates } = require('./utils');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Choose the platform (1 for Capterra, 2 for TrustRadius): ', async (platform) => {
  rl.question('Enter the company name: ', async (company) => {
    rl.question('Enter the start date (yyyy/mm/dd): ', async (startDateStr) => {
      rl.question('Enter the end date (yyyy/mm/dd): ', async (endDateStr) => {
        
        const { isValid, startDate, endDate, message } = validateAndParseDates(startDateStr, endDateStr);
        
        if (!isValid) {
          console.log(message);
          rl.close();
          return;
        }

        if (platform === '1') {
          await scrapeCapterra(company, startDate, endDate);
        } else if (platform === '2') {
          await scrapeTrustRadius(startDate, endDate, company);
        } else {
          console.log('Invalid platform selection.');
        }

        rl.close();
      });
    });
  });
});
