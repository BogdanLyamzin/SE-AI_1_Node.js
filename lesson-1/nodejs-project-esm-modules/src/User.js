export default class User {
    constructor({name, lastName}) {
        this.name = name;
        this.lastName = lastName;
    }

    get fullName() {
        return `${this.name} ${this.lastName}`
    }
}

