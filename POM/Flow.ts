import { Locator, Page } from "@playwright/test";

export class MainPage {

    createButton: Locator;

    constructor(public page: Page) {
        this.createButton = page.getByText("Create a private board", { exact: true });
    }

    async openWhiteboard() {
        this.page.goto("https://wbo.ophir.dev/?lang=en");

        await this.createButton.click();

    }
}