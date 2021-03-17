import { ElementRef, Injectable } from '@angular/core';
import { BackgroundShape } from '../models/BackgroundShape';

@Injectable({
    providedIn: 'root'
})
export class ShapeService {

    selectedShape: BackgroundShape
    private canvasNode: HTMLElement

    constructor() {}

    setCanvas(node: HTMLElement) {
        this.canvasNode = node
    }

    xPercentToPixels(percent: number): number {
        if(this.canvasNode) {
            return (percent/100) * this.canvasWidth()
        }
        return 0
    }

    yPercentToPixels(percent: number): number {
        if(this.canvasNode) {
            return (percent/100) * this.canvasHeight()
        }
        return 0
    }

    private canvasWidth(): number {
        return this.canvasNode.clientWidth
    }

    private canvasHeight(): number {
        return this.canvasNode.clientHeight
    }

}