import test, { expect } from "@playwright/test";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";

test("Line and Snap Line Test", async ({ page }) => {
    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();

    let board = new Board(page);

    for(let i=0; i<10; i++)
    {
    await page.keyboard.press(i.toString());

    await board.drawLine(1);

    expect(await board.lineElem.count()).toBe(1);

    await board.eraseAllLine();

    expect(await board.lineElem.count()).toBe(0);
    }
})