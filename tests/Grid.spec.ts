import test, { expect } from "@playwright/test";
import { Assertions } from "../POM/Assertions";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";

test.beforeEach(async ({ page }) => {
    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();
})

for (var i = 0; i < 3; i++) {
    let p = i;
    test("Grid Test " + p.toString(), async ({ page }) => {

        let board = new Board(page);
        let assert = new Assertions(page);

        await assert.assetGridNone();

        for (var l = 0; l <= p; l++)
            await board.gridChange();

        switch (l) {
            case 1:
                await assert.assertGridLines();
                break;

            case 2:
                await assert.assertGridDots();
                break;

            case 3:
                await assert.assetGridNone();
                break;

        }

    })
}

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      let screenshotPath = "test-resultsSS/screenshots/screenshot-"+Date.now()+".png";
      await page.screenshot({ path: screenshotPath, fullPage: true });
      testInfo.annotations.push({ type: 'testrail_attachment', description: screenshotPath });
    }
  });


