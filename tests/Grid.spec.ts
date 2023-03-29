import test, { expect } from "@playwright/test";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";

test("Grid test", async ({ page }) => {

    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();

    let board = new Board(page);

    await board.assetGridNone();

    await board.gridChange();
    await board.assertGridLines();

    await board.gridChange();
    await board.assertGridDots();

    await board.gridChange();
    await board.assetGridNone();

})