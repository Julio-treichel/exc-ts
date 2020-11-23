export enum Gender {
    Female = 'f',
    Male = 'm'
}

class Person {
    name: string;
    birth!: Date;
    gender: Gender;

    constructor (name: string, gender: Gender) {
        this.name = name
        this.gender = gender
    }
}

export default Person