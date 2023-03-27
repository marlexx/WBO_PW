import { Locator, Page } from "@playwright/test";


export class Board {

    canvas: Locator;

    pencil: Locator;
    line: Locator;
    rectangle: Locator;
    ellipse: Locator;
    text: Locator;
    eraser: Locator;
    hand: Locator;
    grid: Locator;
    download: Locator;
    zoom: Locator;
    color: Locator;
    opacity: Locator;

    sizeSlider: Locator;
    opacitySlider: Locator;

    pathElem: Locator;

    constructor(public page: Page) {

        this.canvas = page.locator("#canvas");

        this.pencil = page.locator("#toolID-Pencil");
        this.line = page.locator("[id='toolID-Straight line']");
        this.rectangle = page.locator("#toolID-Rectangle");
        this.ellipse = page.locator("#toolID-Ellipse");
        this.text = page.locator("#toolID-Text");
        this.eraser = page.locator("#toolID-Eraser");
        this.hand = page.locator("#toolID-Hand");
        this.grid = page.locator("#toolID-Grid");
        this.download = page.locator("#toolID-Download");
        this.zoom = page.locator("#toolID-Zoom");
        this.color = page.locator("#chooseColor");
        this.opacity = page.locator("#opacityIndicator");

        this.sizeSlider = page.locator("#chooseSize");
        this.opacitySlider = page.locator("#chooseOpacity");

        this.pathElem = page.locator("g > path");

    }

    async drawWPencil(i) {
        let box = await this.canvas.boundingBox();
        for (i; i < 2; i++) {
            await this.pencil.click();

            if (box) {
                await this.canvas.hover();
                await this.page.mouse.down();
                await this.page.mouse.move((box.width / 5), (box.height / 4.5));
                await this.page.mouse.move((box.width / 5), (box.height / 5));
                await this.page.mouse.move((box.width / 4.5), (box.height / 5));
                await this.page.mouse.up();
            }
        }
    }

    async drawLine(i) {
        let box = await this.canvas.boundingBox();
        for (i; i < 2; i++) {
            await this.line.click();

            if (box) {
                await this.canvas.hover();
                await this.page.mouse.down();
                await this.page.mouse.move((box.width / 5), (box.height / 4.5));
                await this.page.mouse.up();
            }
        }
    }

    async drawRect(i) {
        let box = await this.canvas.boundingBox();
        for (i; i < 2; i++) {
            await this.rectangle.click();

            if (box) {
                await this.canvas.hover();
                await this.page.mouse.down();
                await this.page.mouse.move((box.width / 5), (box.height / 4.5));
                await this.page.mouse.up();
            }
        }
    }

    async drawEllipse(i) {
        let box = await this.canvas.boundingBox();
        for (i; i < 2; i++) {
            await this.ellipse.click();

            if (box) {
                await this.canvas.hover();
                await this.page.mouse.down();
                await this.page.mouse.move((box.width / 5), (box.height / 4.5));
                await this.page.mouse.up();
            }
        }
    }

    async writeText(content: string){
        
    await this.text.click();
    await this.canvas.click();
    await this.page.keyboard.type(content);
    await this.page.keyboard.press('Enter');
    
}

    async eraseAll(){
        await this.eraser.click();
        let elements = await this.pathElem.count();
        for(let i=0;i<elements;i++){
            await this.pathElem.nth(0).hover();
            await this.page.mouse.down();
            await this.page.mouse.up();
        }
    }
}