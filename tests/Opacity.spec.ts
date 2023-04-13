import test, { expect } from "@playwright/test";
import { Assertions } from "../POM/Assertions";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";
const OPACITY = 0.5

test.beforeEach(async ({ page }) => {
    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();
})

test("Opacity Test", async ({ page }) => {
    let board = new Board(page);
    let assert = new Assertions(page);

    await board.changeOpacity(OPACITY);

    await board.drawLine(1);

    expect(await board.lineElem.count()).toBe(1);
    await assert.assertOpacity(OPACITY);

})

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      let screenshotPath = "test-resultsSS/screenshots/screenshot-"+Date.now()+".png";
      await page.screenshot({ path: screenshotPath, fullPage: true });
      testInfo.annotations.push({ type: 'testrail_attachment', description: screenshotPath });
    }
  });