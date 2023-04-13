import test, { expect } from "@playwright/test";
import { Assertions } from "../POM/Assertions";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";

test.beforeEach(async ({ page }) => {
    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();
})

test.describe("Color Tests", () => {
    for (var i = 0; i < 11; i++) {
        let l = i;
        test("Color " + l.toString() + " Test", async ({ page }) => {

            //await page.pause();
            let board = new Board(page);
            let assert = new Assertions(page);

            if (l != 10) {
                await page.waitForLoadState('networkidle');
                await page.keyboard.press(l.toString());
                await page.waitForLoadState('networkidle');
                await board.drawLine(1)

            }
            else {
                await board.lastColor();
                await board.drawLine(1)
            }

            await assert.assertColor(l);

        })
    }
})

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      let screenshotPath = "test-resultsSS/screenshots/screenshot-"+Date.now()+".png";
      await page.screenshot({ path: screenshotPath, fullPage: true });
      testInfo.annotations.push({ type: 'testrail_attachment', description: screenshotPath });
    }
  });