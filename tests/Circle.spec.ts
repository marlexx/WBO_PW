import test, { expect } from "@playwright/test";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";
import {faker} from "@faker-js/faker"

test.beforeEach(async ({ page }) => {

    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();

})

test("Circle and Ellipse Test", async ({ page }) => {
    let board = new Board(page);

    await board.drawEllipse(0);

    expect(await board.ellipseElem.count()).toBe(2);

    await board.eraseAllEllipse();

    expect(await board.ellipseElem.count()).toBe(0);
})

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      let screenshotPath = "test-resultsSS/screenshots/screenshot-"+Date.now()+".png";
      await page.screenshot({ path: screenshotPath, fullPage: true });
      testInfo.annotations.push({ type: 'testrail_attachment', description: screenshotPath });
    }
  });