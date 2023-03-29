import test, { expect } from "@playwright/test";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";

test("Select test", async ({ page }) => {
    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();

    let board = new Board(page);

    await board.drawEllipse(0);
    
    expect(await board.ellipseElem.count()).toBe(2);

    await board.drawRect(0);

    expect(await board.rectElem.count()).toBe(2);

    await board.drawLine(0);

    expect(await board.lineElem.count()).toBe(2);

    await board.drawWPencil(0);

    expect(await board.pathElem.count()).toBe(2);
    
    await board.writeText("testing tests");

    expect(await board.textElem.count()).toBe(1);
    
    expect(await board.textElem.innerHTML()).toBe("testing tests");

    await board.eraseEverything();

    expect(await board.ellipseElem.count()).toBe(0);
    expect(await board.rectElem.count()).toBe(0);
    expect(await board.lineElem.count()).toBe(0);
    expect(await board.pathElem.count()).toBe(0);
    expect(await board.textElem.count()).toBe(0);
})