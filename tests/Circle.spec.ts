import test, { expect } from "@playwright/test";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";

test("Circle and Ellipse test", async ({ page }) => {
    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();

    let board = new Board(page);

    await board.drawEllipse(0);

    expect(await board.ellipseElem.count()).toBe(2);

    await board.eraseAllEllipse();

    expect(await board.ellipseElem.count()).toBe(0);
})