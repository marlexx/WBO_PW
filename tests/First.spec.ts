import { test, expect } from '@playwright/test';
import { Board } from '../POM/Board';
import { MainPage } from '../POM/Flow';

test('OpenWB', async ({ page }) => {
  let homePage = new MainPage(page);
  await page.pause();
  await homePage.openWhiteboard();

  let board = new Board(page);

  await board.drawWPencil(0);

  await board.drawLine(0);

 await board.drawRect(0);

  await board.drawEllipse(0);

  await board.writeText("caos :D");

  await board.eraseAll();

});
