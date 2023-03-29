import { expect, Locator, Page } from "@playwright/test";


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
    rectElem: Locator;
    ellipseElem: Locator;
    textElem: Locator;
    lineElem: Locator;

    gridElem: Locator;

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
        this.rectElem = page.locator("g > rect");
        this.ellipseElem = page.locator("g > ellipse");
        this.textElem = page.locator("g > text");
        this.lineElem = page.locator("g > line");

        this.gridElem = page.locator("#gridContainer");

    }

    async drawWPencil(i) {
        let box = await this.canvas.boundingBox();
        for (i; i < 2; i++) {
            await this.pencil.click();

            if (box) {
                await this.canvas.hover();
                await this.page.mouse.down();
                await this.page.mouse.move((450), (300));
                await this.page.mouse.move((520), (320));
                await this.page.mouse.move((380), (220));
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
                await this.page.mouse.move((600), (560));
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
                await this.page.mouse.move((600), (560));
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
                await this.page.mouse.move((600), (560));
                await this.page.mouse.up();
            }
        }
    }

    async writeText(content: string) {

        await this.text.click();
        await this.canvas.click();
        await this.page.keyboard.type(content);
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Enter');

    }

    async eraseAllLine() {
        var elementCoords;
        let p = 0;
        await this.eraser.click();
        let elements = await this.lineElem.count();
        let elementsCount = elements;
        for (let i = 0; i < elements; i++) {
            elementCoords = await this.lineElem.nth(0).boundingBox();
            if (elementCoords) {
                while (await this.lineElem.count() == elementsCount || p > elementCoords.width) {
                    await console.log(p);
                    await this.page.mouse.click(elementCoords.x + p, elementCoords.y + 5);
                    p++;
                }
                p = 0;
            }
            elementsCount--;
        }
    }

    async eraseAllText() {
        var elementCoords;
        await this.eraser.click();
        let elements = await this.textElem.count();
        for (let i = 0; i < elements; i++) {
            elementCoords = await this.textElem.nth(0).boundingBox();
            if (elementCoords)
                await this.page.mouse.click(elementCoords.x + 1, elementCoords.y + 1);
        }
    }

    async eraseAllEllipse() {
        var elementCoords;
        await this.eraser.click();
        let elements = await this.ellipseElem.count();
        for (let i = 0; i < elements; i++) {
            elementCoords = await this.ellipseElem.nth(0).boundingBox();
            if (elementCoords)
                await this.page.mouse.click(elementCoords.x + elementCoords.width / 2, elementCoords.y + 1);
        }
    }
    async eraseAllRect() {
        var elementCoords;
        await this.eraser.click();
        let elements = await this.rectElem.count();
        for (let i = 0; i < elements; i++) {
            elementCoords = await this.rectElem.nth(0).boundingBox();
            if (elementCoords)
                await this.page.mouse.click(elementCoords.x + 1, elementCoords.y + 1);

        }
    }

    async eraseAllPath() {
        var elementCoords;
        let p = 0;
        await this.eraser.click();
        let elements = await this.pathElem.count();
        let elementsCount = elements;
        for (let i = 0; i < elements; i++) {
            elementCoords = await this.pathElem.nth(0).boundingBox();
            if (elementCoords) {
                while (await this.pathElem.count() == elementsCount || p > elementCoords.width) {
                    await this.page.mouse.click(elementCoords.x + p, elementCoords.y + 5);
                    p += 5;
                }
                p = 0;
            }
            elementsCount--;
        }
    }

    async eraseEverything() {
        let box = await this.canvas.boundingBox();
        let bar = await this.line.boundingBox();
        await this.page.waitForTimeout(1000);
        await this.hand.click();
        await this.page.waitForTimeout(1000);
        await this.hand.click();
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(1000);
         if (bar){
            await this.page.mouse.move(bar.x + bar.width + 10, 1);
            console.log("postoji bar");
         }
         await this.page.waitForTimeout(1000);
        await this.page.mouse.down();
        await this.page.waitForTimeout(1000);
        if (box){
            await this.page.mouse.move(box.width, box.height);
            console.log("postoji box");
        }
        await this.page.waitForTimeout(1000);
        await this.page.mouse.up();
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press("Delete");
    }

    async gridChange(){
        await this.grid.click();
    }

    async downloadImg(){
        await this.download.click();
    }

    async assetGridNone(){
        let fill = await this.gridElem.getAttribute("fill");
        expect(fill).toBe("none");
    }

    async assertGridDots(){
        let fill = await this.gridElem.getAttribute("fill");
        expect(fill).toBe("url(#dots)");
    }

    async assertGridLines(){
        let fill = await this.gridElem.getAttribute("fill");
        expect(fill).toBe("url(#grid)");
    }

    async zoomIn(){
        await this.zoom.click();
        await this.canvas.click();
    }

}