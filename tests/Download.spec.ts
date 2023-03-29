import test, { expect } from "@playwright/test";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";
var fs = require('fs');

test("Select test", async ({ page }) => {
    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();

    let board = new Board(page);

    await board.drawEllipse(0);

    expect(await board.ellipseElem.count()).toBe(2);


    const downloadc = await Promise.all([
        page.waitForEvent("download"),
        await board.downloadImg()
    ])
    const path = await downloadc[0].path();
    console.log(path);

    const filename = await downloadc[0].suggestedFilename();
    //await downloadc[0].saveAs(filename); //for saving the svg
    expect(fs.existsSync(path)).toBeTruthy();


})