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

    sizeButton: Locator;
    sizeSlider: Locator;
    opacitySlider: Locator;

    pathElem: Locator;
    rectElem: Locator;
    ellipseElem: Locator;
    textElem: Locator;
    lineElem: Locator;

    gridElem: Locator;

    color11: Locator;

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

        this.sizeButton = page.getByRole('listitem', { name: 'Size (keyboard shortcut: alt + mouse wheel)' });
        this.sizeSlider = page.locator("#chooseSize");
        this.opacitySlider = page.locator("#chooseOpacity");

        this.pathElem = page.locator("g > path");
        this.rectElem = page.locator("g > rect");
        this.ellipseElem = page.locator("g > ellipse");
        this.textElem = page.locator("g > text");
        this.lineElem = page.locator("g > line");

        this.gridElem = page.locator("#gridContainer");

        this.color11 = page.locator('#color_E65194');

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
        let s = 0;
        await this.eraser.click();
        let elements = await this.lineElem.count();
        let elementsCount = elements;
        for (let i = 0; i < elements; i++) {
            elementCoords = await this.lineElem.nth(0).boundingBox();
            if (elementCoords) {
                while (await this.lineElem.count() == elementsCount && s != elementCoords.width) {
                    //await console.log(p);
                    await this.page.mouse.click(elementCoords.x + p, elementCoords.y + 3);
                    p = elementCoords.width - s;
                    s++;
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
        await this.page.waitForTimeout(500);
        await this.hand.click();
        await this.page.waitForTimeout(500);
        await this.hand.click();
        await this.page.waitForTimeout(500);
        if (bar) {
            await this.page.mouse.move(bar.x + bar.width + 10, 1);
        }
        await this.page.waitForTimeout(500);
        await this.page.mouse.down();
        await this.page.waitForTimeout(500);
        if (box) {
            await this.page.mouse.move(box.width, box.height);
        }
        await this.page.waitForTimeout(500);
        await this.page.mouse.up();
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press("Delete");
    }

    async gridChange() {
        await this.grid.click();
    }

    async downloadImg() {
        await this.download.click();
    }

    async zoomIn() {
        await this.zoom.click();
        await this.canvas.click();
    }

    async lastColor() {
        await this.color.hover();
        await this.color11.click();
    }

    async changeSize(width: number) {
        await this.sizeButton.hover();
        await this.page.waitForLoadState('networkidle');
        let sliderBox = await this.sizeSlider.boundingBox();
        await this.page.waitForLoadState('networkidle');
        if (sliderBox)
            await this.page.mouse.click(sliderBox.x + sliderBox.width / (50 / width), sliderBox.y + sliderBox.height / 2);
        await this.page.waitForLoadState('networkidle');
    }

    async changeOpacity(opacityValue: number) {
        await this.opacity.hover();
        await this.page.waitForTimeout(700);
        let sliderBox = await this.opacitySlider.boundingBox();
        if (sliderBox)
            await this.page.mouse.click(sliderBox.x + sliderBox.width * opacityValue, sliderBox.y + sliderBox.height / 2);
    }

}