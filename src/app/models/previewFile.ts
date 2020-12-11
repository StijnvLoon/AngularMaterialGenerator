export class PreviewFile {

    public codeLines: string[]

    constructor(public name: string) {
        this.codeLines = []
    }

    public addToCodeLines(stringList: string[]) {
        this.codeLines = this.codeLines.concat(stringList)
    }
}