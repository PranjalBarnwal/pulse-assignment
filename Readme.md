

# Review Scraper Project

This project is a web scraper built using Puppeteer that extracts reviews from **Capterra** and **TrustRadius** platforms. Users can input a company name and a date range (start date and end date), and the scraper fetches reviews within that range, saving them to a `data.json` file.

## Features

- Scrape reviews from **Capterra** and **TrustRadius**.
- Filter reviews based on a custom date range.
- Automatically saves reviews to a JSON file.
- Supports both platforms with an easy-to-use CLI prompt.
- Built-in validation for date range input.

## Prerequisites

Ensure you have **Node.js** (v12 or above) installed. You can download it from [here](https://nodejs.org/).

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/PranjalBarnwal/pulse-assignment.git
    cd review-scraper
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. The project uses the following dependencies:
    - **puppeteer**: Core Puppeteer for headless browser control.
    - **puppeteer-extra**: Puppeteer with extra plugins.
    - **puppeteer-extra-plugin-stealth**: Evades detection for web scraping.
    - **readline**: Allows interaction with CLI prompts (built-in Node.js module).
    - **fs**: File system operations (built-in Node.js module).

    If any of these dependencies are missing, install them using the following command:

    ```bash
    npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth
    ```

## Project Structure

- **index.js**: Main entry file. Handles the platform selection and user input.
- **scrapeCapterra.js**: Contains scraping logic for Capterra reviews.
- **scrapeTrustRadius.js**: Contains scraping logic for TrustRadius reviews.
- **utils.js**: Utility file with helper functions like date validation.
- **data.json**: Output file where the scraped data is stored.

## Usage

1. After installation, you can run the project by executing:

    ```bash
    node index.js
    ```

2. Follow the on-screen prompts:

    - Choose the platform:
      - Enter `1` for **Capterra**
      - Enter `2` for **TrustRadius**
    - Enter the company name you want to scrape reviews for.
    - Enter the start date (format: `yyyy/mm/dd`).
    - Enter the end date (format: `yyyy/mm/dd`).

3. The scraped reviews will be saved in a file called `data.json`.

## Example

```bash
$ node index.js
Choose the platform (1 for Capterra, 2 for TrustRadius): 1
Enter the company name: Photoshop
Enter the start date (yyyy/mm/dd): 2021/01/01
Enter the end date (yyyy/mm/dd): 2021/07/01
Reviews have been saved to data.json
```

## Utilities

The project uses the following utility function:

- **checkValidDates**: Located in `utils.js`, this function checks if the end date is greater than the start date and returns a boolean value. If the dates are invalid, it will terminate the program with a message.

## Troubleshooting

- Make sure your internet connection is stable as the scraper relies on accessing live web pages.
- If the scraper is detected and blocked by the website, try updating the **puppeteer-extra-plugin-stealth** plugin for improved stealth capabilities.

