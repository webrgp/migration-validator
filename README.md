# migration-validator

Node script that compares routes from two different urls, create screenshots of the routes and compare them using pixelmatch.

## Requirements

Node v20.11.1 or higher

## Installation

If you have nvm installed, you can run `nvm install` to use the correct node version. Once you have the correct node version, you can run `npm install` to install the dependencies.

## Usage

To run the script, you can use the following command:

```bash
node compare-pages.js
```

This command will open Playwright's Chromium browser and take screenshots of the routes defined in the `routes` array. Once the screenshots are taken, the script will compare them using `looks-same` and will output the results in the console.

## Configuration

You can edit the `compare-pages.js` and change the following variables:

- `originalUrl`: The url of the original site.
- `newUrl`: The url of the new site.
- `routes`: An array of string routes that exists in both sites.
- `waitBeforeScreenshot`: The time in milliseconds to wait before taking the screenshot. This is useful if you have animations or transitions that need to be completed before taking the screenshot.
- `headlessMode`: Defaults to `true`. This will make Playwright run in headless mode, meaning that the browser will not be visible. If you want to see the browser, you can set this to `false`.

## Notes

Under the hood this script uses [Playwright](https://playwright.dev/) to take the screenshots and [looks-same](https://github.com/gemini-testing/looks-same) to compare them.