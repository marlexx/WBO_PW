import { test, expect } from '@playwright/test';
import { Board } from '../POM/Board';
import { MainPage } from '../POM/Flow';
var fs = require('fs');

test('OpenWB', async ({ page }) => {
  let homePage = new MainPage(page);
  //await page.pause();
  await homePage.openWhiteboard();

  let board = new Board(page);

  await board.drawWPencil(0);

  await board.drawLine(0);

  await board.drawRect(0);

  await board.drawEllipse(0);

  await board.writeText("caos :D");

  //await board.eraseAllPath();
  //await board.eraseAllRect();
  //await board.eraseAllEllipse();
  //await board.eraseAllLine();
  //await board.eraseAllText();
  //await page.pause();

  await board.eraseEverything();
  await page.pause();

  await board.drawRect(0);

  await board.drawEllipse(0);
  
  const downloadc = await Promise.all([
    page.waitForEvent("download"),
    await board.downloadImg()
])
const path = await downloadc[0].path();
console.log(path);

const filename = await downloadc[0].suggestedFilename();
//await downloadc[0].saveAs(filename);
expect(fs.existsSync(path)).toBeTruthy();
});
