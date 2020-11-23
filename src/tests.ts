import Person from './entities/Person.js'
import {Gender} from './entities/Person.js'
import Document from './entities/Document.js'
import Book from './entities/Book.js'
import Periodical from './entities/Periodical.js'


const person1 = new Person('Edward Joseph Snowden' , new Date(1983, 5, 21) , Gender.Male)
const person2 = new Person('Osho', new Date(18, 1, 3), Gender.Male)

const Document1 = new Document('Eterna vigilância', 'Como montei e desvendei o maior sistema de espionagem do mundo', new Date(2019, 8, 30), person1)
const Document2 = new Document('Maturidade', 'A Responsabilidade De Ser Você Mesmo', new Date(2001, 7, 3), person2)

const periodical1 = new Periodical(12, 1, 4, Document1.title, Document1.subtitle, Document1.publishedAt, person1)
const periodical2 = new Periodical(12, 1, 4, Document2.title, Document2.subtitle, Document2.publishedAt, person2)


console.log(person1)
console.log(person2)

console.log(Document1)
console.log(Document2)

console.log(periodical1)
console.log(periodical2)