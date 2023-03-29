import test, { expect } from "@playwright/test";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";

test("Pencil and whiteout test", async ({ page }) => {

    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();

    let board = new Board(page);

    await board.drawWPencil(0);

    expect(await board.pathElem.count()).toBe(2);

    await board.eraseAllPath();

    expect(await board.pathElem.count()).toBe(0);

})