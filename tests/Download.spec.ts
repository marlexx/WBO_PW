import test, { expect } from "@playwright/test";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";
var fs = require('fs');

test.beforeEach(async ({ page }) => {
    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();
})

test("Download test", async ({ page }) => {
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

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      let screenshotPath = "test-resultsSS/screenshots/screenshot-"+Date.now()+".png";
      await page.screenshot({ path: screenshotPath, fullPage: true });
      testInfo.annotations.push({ type: 'testrail_attachment', description: screenshotPath });
    }
  });