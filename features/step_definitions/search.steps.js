const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const {  clickElement,
  getText,
  getValueForDisabled,
} = require("../../lib/commands.js");
const { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000);

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

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru${string}`, {
    setTimeout: 20000,
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

When("user selects time", async function () {
  await clickElement(this.page, "a.movie-seances__time");
});

When("user selects {string} row and seat", async function (string) {
  await clickElement(
    this.page,
    `.buying-scheme__wrapper > :nth-child(${string}) > :nth-child(${string})`
  );
});

When("user clicks button 'Забронировать'", async function () {
  await clickElement(this.page, ".acceptin-button");
});

When("user clicks button 'Получить код бронирования'", async function () {
  await clickElement(this.page, ".acceptin-button");
});

Then("user sees text {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__hint");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("the user sees the movie session starting at 10:00", async () => {
  const expected = "Начало сеанса: 10:00";
});
