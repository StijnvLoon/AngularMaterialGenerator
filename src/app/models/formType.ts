export enum FormTypeCat {
    NONE,
    INPUT,
    TEXTAREA,
}

export class FormType {
    static readonly INPUT_TEXT = new FormType('INPUT_TEXT', FormTypeCat.INPUT, { modelName: "Example text" });
    static readonly INPUT_PASSWORD = new FormType('INPUT_PASSWORD', FormTypeCat.INPUT, { modelName: "Example password", toggleVis: true });
    static readonly INPUT_DATE = new FormType('INPUT_DATE', FormTypeCat.INPUT, { modelName: "Example date" });

    private constructor(public readonly key: string, public readonly category: FormTypeCat, public options: any) {
    }
}