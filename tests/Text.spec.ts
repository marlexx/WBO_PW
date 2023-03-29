import test, { expect } from "@playwright/test";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";

test("Text test", async ({ page }) => {
    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();

    let board = new Board(page);

    await board.writeText("testing tests");

    expect(await board.textElem.count()).toBe(1);
    
    expect(await board.textElem.innerHTML()).toBe("testing tests");

    await board.eraseAllText();

    expect(await board.textElem.count()).toBe(0);
})