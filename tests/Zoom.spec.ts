import test, { expect } from "@playwright/test";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";

test("Rectangle and Square test", async ({ page }) => {
    
    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();

    let board = new Board(page);

    await page.waitForLoadState("networkidle");

    let firstZoom = await board.canvas.getAttribute("style");

    //await console.log(firstZoom);

    await board.zoomIn();

    let secondZoom = await board.canvas.getAttribute("style");

    //await console.log(secondZoom);

    expect(firstZoom).not.toBe(secondZoom);
    expect(secondZoom).toContain("1.5");

})