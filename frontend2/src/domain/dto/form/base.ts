export class FormBase {
    key: string | null
    name: string
    description: string

    constructor(key: string | null, name: string, description: string) {
        this.key = key
        this.name = name
        this.description = description
    }

}

export class FormCreate extends FormBase {

    
    constructor(key: string | null, name: string, description: string) {
        super(key, name, description)
    }

}
