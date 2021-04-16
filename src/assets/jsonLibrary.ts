export class JSONLib {

    private static replacer(key, value) {
        if (value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()), // or with spread: value: [...value]
            };
        } else {
            return value;
        }
    }

    private static reviver(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (value.dataType === 'Map') {
                return new Map(value.value);
            }
        }
        return value;
    }

    //reviver added for deeply nested vallues (like Map)
    public static toObject(string: string): any {
        return JSON.parse(string, this.reviver)
    }

    //replacer added for deeply nested vallues (like Map)
    public static toString(object: any): string {
        return JSON.stringify(object, this.replacer)
    }

    public static deepCopy(object: any): any {
        return this.toObject(this.toString(object))
    }
}