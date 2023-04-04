import test, { expect } from "@playwright/test";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";

test.beforeEach(async ({ page }) => {
    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();
})

test("Rectangle and Square test", async ({ page }) => {
    let board = new Board(page);

    await board.drawRect(0);

    expect(await board.rectElem.count()).toBe(2);

    await board.eraseAllRect();

    expect(await board.rectElem.count()).toBe(0);
})