import Person from './entities/Person.js'
import { Gender } from './entities/Person.js'

const name = document.querySelector<HTMLInputElement>('#nome')!
const birth = document.querySelector<HTMLInputElement>('#nascimento')!
const gender = document.querySelector<HTMLSelectElement>('#sexo')!
const mensagem = document.querySelector<HTMLParagraphElement>('#mensagem')!
const form = document.querySelector('form')!

const persons: Person[] = []
showPersons()

form.addEventListener('submit', (e: Event) => {
    e.preventDefault()

    mensagem.innerText = ''

    const valorNome = name.value.trim()

    if (!valorNome) {
        mensagem.innerText = 'O campo Nome é obrigatório!'
        name.focus()
        return
    }

    const regexNome = /\w+\s\w+/g

    if(!regexNome.test(valorNome)) {
        mensagem.innerText = 'Informe seu nome completo!'
        name.focus()
        return
    }

    if (!birth.value) {
        mensagem.innerText = 'O campo Nascimento é obrigatório!'
        birth.focus()
        return
      }

    const dataNascimento = new Date(`${birth.value}T00:00:00`)
    console.log(birth.value)

    if (Date.now() - Number(dataNascimento) < 0) {
        mensagem.innerText = 'O nascimento deve ter ocorrido no passado!'
        birth.focus()
    }    

    if (!gender.value) {
        mensagem.innerText = 'O campo Sexo é obrigatório!'
        gender.focus()
        return
    }

    try {
        let birthDate = new Date(birth.value)

        const person = new Person(
            name.value,
            birthDate,
            gender.value === 'f' ? Gender.Female : Gender.Male
        )

        persons.push(person)

        localStorage.setItem('persons', JSON.stringify(persons))
    }
        catch (error: any) {
        mensagem.innerText = "Ocorreu algum erro."
        return
    }

    if (persons) {
       mensagem.innerText = `${valorNome} Cadastrado com Sucesso!`
    }

    name.value = ''
    birth.value = ''
    gender.value = ''
})

function showPersons() {
    if (localStorage.getItem('persons')) {
        const birthDate = JSON.parse(localStorage.getItem('persons')!)

        persons.splice(0)

        for (const item of birthDate) {
            persons.push(new Person(
                item.name,
                item.birth,
                item.gender
            ))
        }
    }
}