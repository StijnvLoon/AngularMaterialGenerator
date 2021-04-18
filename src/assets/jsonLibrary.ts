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

    //reviver added for deeply nested vallues (like Map, fine for interfaces)
    //use: 
    //const justsomeJSON = { attribute1: 'myattribute' }
    //const object = JSONLib.toObject(justsomeJSON)
    public static toObject(string: string): any {
        return JSON.parse(string, this.reviver)
    }

    //same as toObject, but your methods are not undefined
    //use:
    //const myObjectJSON = { attribute1: 'myattribute' }
    //const myObject: MyObject = JSONLib.toClass(MyObject, myObjectJSON)
    public static toClass(classInstance, data: object | string): any {
        if(typeof data == 'object') {
            return Object.assign(new classInstance, data)
        }
        if(typeof data == 'string') {
            return Object.assign(new classInstance, this.toObject(data))
        }
    }

    //same as toClass, but with array of objects
    public static toClassArray(classInstance, data: object[] | string[]): any[] {
        const arr = []
        data.forEach((x) => {
            arr.push(this.toClass(classInstance, x))
        })
        return arr
    }

    //replacer added for deeply nested vallues (like Map)
    public static toString(object: any): string {
        return JSON.stringify(object, this.replacer)
    }

    //to deep copy just the object (no methods, fine for interfaces)
    public static deepCopyObject(object: any): any {
        return this.toObject(this.toString(object))
    }

    //to deep copy the entire class with methodes
    public static deepCopyClass(classInstance, object: any): object {
        return this.toClass(classInstance, this.toString(object))
    }
}