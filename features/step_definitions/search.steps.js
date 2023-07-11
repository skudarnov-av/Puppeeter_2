const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("the user is on the home page", async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

When("the user selects a movie", async () => {
  await page.click(
    "body > nav > a.page-nav__day.page-nav__day_chosen > span.page-nav__day-week"
  );
  await page.waitForSelector("span");
  await page.click(
    "body > main > section:nth-child(1) > div.movie-seances__hall > ul"
  );
  await page.waitForSelector("li");
});

Then("the user sees the movie session starting at 10:00", async () => {
  const expected = "Начало сеанса: 10:00";
});
