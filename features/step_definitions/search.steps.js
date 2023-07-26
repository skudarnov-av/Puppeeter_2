const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const {
  clickElement,
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
});

When("user selects {string} day", async function (string) {
  return await clickElement(
    this.page,
    `a.page-nav__day:nth-of-type(${string})`
  );
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

Then("user sees button disabled {string}", async function (string) {
  const actual = await getValueForDisabled(this.page, ".acceptin-button");
  const expected = await string;
  expect(actual).contains(expected);
});
