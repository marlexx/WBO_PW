import test, { expect } from "@playwright/test";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";

test.beforeEach(async ({ page }) => {
    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();
})

test("Line and Snap Line Test", async ({ page }) => {
    let board = new Board(page);

    await board.drawLine(0);

    expect(await board.lineElem.count()).toBe(2);

    await board.eraseAllLine();

    expect(await board.lineElem.count()).toBe(0);
})

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      let screenshotPath = "test-resultsSS/screenshots/screenshot-"+Date.now()+".png";
      await page.screenshot({ path: screenshotPath, fullPage: true });
      testInfo.annotations.push({ type: 'testrail_attachment', description: screenshotPath });
    }
  });