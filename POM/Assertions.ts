import { expect, Locator, Page } from "@playwright/test";

export class Assertions {

    lineElem: Locator;
    gridElem: Locator;

    constructor(page) {
        this.lineElem = page.locator("g > line");
        this.gridElem = page.locator("#gridContainer");
    }

    async assertOpacity(opacityValue: number) {
        let currentOpacity = await this.lineElem.last().getAttribute("opacity");
        await expect(currentOpacity).toBe((opacityValue + 0.1).toString()); //0.6 je zapravo pola slidera
    }

    async assetGridNone() {
        let fill = await this.gridElem.getAttribute("fill");
        expect(fill).toBe("none");
    }

    async assertGridDots() {
        let fill = await this.gridElem.getAttribute("fill");
        expect(fill).toBe("url(#dots)");
    }

    async assertGridLines() {
        let fill = await this.gridElem.getAttribute("fill");
        expect(fill).toBe("url(#grid)");
    }

    async assertSize(width: number) {
        let size = await this.lineElem.last().getAttribute("stroke-width");
        await expect(size).toBe((width + 1).toString()); //26 je zapravo sredina slidera
    }

    async assertColor(i) {
        let color = await this.lineElem.last().getAttribute("stroke");

        switch (i) {
            case 0:
                await expect(color).toBe("#aaaaaa");
                break;
            case 1:
                await expect(color).toBe("#001f3f");
                break;
            case 2:
                await expect(color).toBe("#ff4136");
                break;
            case 3:
                await expect(color).toBe("#0074d9");
                break;
            case 4:
                await expect(color).toBe("#ff851b");
                break;
            case 5:
                await expect(color).toBe("#ffdc00");
                break;
            case 6:
                await expect(color).toBe("#3d9970");
                break;
            case 7:
                await expect(color).toBe("#91e99b");
                break;
            case 8:
                await expect(color).toBe("#90468b");
                break;
            case 9:
                await expect(color).toBe("#7fdbff");
                break;
            case 10:
                await expect(color).toBe("#e65194");
                break;
        }
    }
}