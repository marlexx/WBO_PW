import test, { expect } from "@playwright/test";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";

test.beforeEach(async ({ page }) => {
    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();
})

test("Rectangle and Square test", async ({ page }) => {
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

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      let screenshotPath = "test-resultsSS/screenshots/screenshot-"+Date.now()+".png";
      await page.screenshot({ path: screenshotPath, fullPage: true });
      testInfo.annotations.push({ type: 'testrail_attachment', description: screenshotPath });
    }
  });