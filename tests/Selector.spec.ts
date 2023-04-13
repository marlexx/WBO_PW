import test, { expect } from "@playwright/test";
import { Board } from "../POM/Board";
import { MainPage } from "../POM/Flow";

test.beforeEach(async ({ page }) => {
    let homePage = new MainPage(page);
    //await page.pause();
    await homePage.openWhiteboard();
})

test("Select test", async ({ page }) => {
    test.slow();
    let board = new Board(page);

    await board.drawEllipse(0);
    await board.drawRect(0);
    await board.drawLine(0);
    await board.drawWPencil(0);
    await board.writeText("testing tests");

    expect(await board.ellipseElem.count()).toBe(2);
    expect(await board.rectElem.count()).toBe(2);
    expect(await board.lineElem.count()).toBe(2);
    expect(await board.pathElem.count()).toBe(2);
    expect(await board.textElem.count()).toBe(1);
    expect(await board.textElem.innerHTML()).toBe("testing tests");

    await board.eraseEverything();

    expect(await board.ellipseElem.count()).toBe(0);
    expect(await board.rectElem.count()).toBe(0);
    expect(await board.lineElem.count()).toBe(0);
    expect(await board.pathElem.count()).toBe(0);
    expect(await board.textElem.count()).toBe(0);
})

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      let screenshotPath = "test-resultsSS/screenshots/screenshot-"+Date.now()+".png";
      await page.screenshot({ path: screenshotPath, fullPage: true });
      testInfo.annotations.push({ type: 'testrail_attachment', description: screenshotPath });
    }
  });