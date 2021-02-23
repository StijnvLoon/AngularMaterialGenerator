import { Rule } from "./Rule"

export class FormOptions {

    public toggleVis: boolean
    public editableText: boolean
    public radioOptions: string[]
    public optionalText: string
    public rules: Rule[] = []
    public thumbLabel: boolean
    public inverted: boolean
    public min: number
    public max: number
    public steps: number
    public placeholder: string

    constructor(public modelName: string, rules?: Rule[]) {
        this.rules = rules
    }
}