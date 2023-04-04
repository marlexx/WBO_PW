import test, { expect } from "@playwright/test";
import { Assertions } from "../POM/Assertions";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";

test.beforeEach(async ({page}) => {
    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();
})

test("Size Test", async ({ page }) => {
    let board = new Board(page);
    let assert = new Assertions(page);

    await board.changeSize(25);

    await board.drawLine(1);

    expect(await board.lineElem.count()).toBe(1);

    await assert.assertSize(25);
    
})