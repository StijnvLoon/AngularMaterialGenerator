import { Injectable } from '@angular/core';
import { BackgroundShape } from '../models/BackgroundShape';

@Injectable({
    providedIn: 'root'
})
export class ShapeService {

    selectedShape: BackgroundShape

    constructor() { }

}