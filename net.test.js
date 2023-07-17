const {
  clickElement,
  getText,
  getValueForDisabled,
} = require("./lib/commands.js");
let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
  await clickElement(page, "a.page-nav__day:nth-of-type(7)");
  await clickElement(page, "a.movie-seances__time");
});

afterEach(() => {
  page.close();
});

describe("Successful booking", () => {
  test("Should book 1 ticket'", async () => {
    await clickElement(
      page,
      ".buying-scheme__wrapper > :nth-child(1) > :nth-child(2)"
    );
    await clickElement(page, ".acceptin-button");
    await getText(page, ".ticket__hint");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__hint");
    expect(actual).toEqual(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test("Should book 2 tickets'", async () => {
    await clickElement(
      page,
      ".buying-scheme__wrapper > :nth-child(1) > :nth-child(3)"
    );
    await clickElement(
      page,
      ".buying-scheme__wrapper > :nth-child(1) > :nth-child(4)"
    );
    await clickElement(page, ".acceptin-button");
    await getText(page, ".ticket__hint");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__hint");
    expect(actual).toEqual(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });
});

describe("Unsuccessful booking", () => {
  test("Should not book without a seat", async () => {
    const actual = await getValueForDisabled(page, ".acceptin-button");
    await expect(actual).toContain("true");
  });
});
