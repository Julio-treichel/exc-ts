import Person from './entities/Person.js'
import { Gender } from './entities/Person.js'
import { capitalize, trimAll } from './funções_strings.js'

const name = document.querySelector<HTMLInputElement>('#nome')!
const birth = document.querySelector<HTMLInputElement>('#nascimento')!
const gender = document.querySelector<HTMLSelectElement>('#sexo')!
const mensagem = document.querySelector<HTMLParagraphElement>('#mensagem')!
const form = document.querySelector('form')!
const buscarNomes = document.querySelector<HTMLDivElement>('#nameSearch')!

const persons: Person[] = []
showPersons()

form.addEventListener('submit', (e: Event) => {
   e.preventDefault()

   mensagem.innerText = ''

   const valorNome = capitalize(trimAll(name.value))

   if (!valorNome) {
      mensagem.innerText = 'Digite seu nome completo no campo Nome!'
      name.focus()
      return
   }

   if(!valorNome) {
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
         capitalize(valorNome),
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
   window.location.reload()
})

var p = document.querySelector<HTMLParagraphElement>('#pessoa')!
let personsLocalStorage: Array<Person> = JSON.parse(localStorage.getItem("persons") || '{}')
let nomes = personsLocalStorage.map(p => p.name)

const extractName = (obj: Person) => obj.name


let nomesOrdenados = persons.map(extractName).sort().join('\n')


buscarNomes.addEventListener('', (e: Event) => {
   e.preventDefault()
   let input = document.querySelector<HTMLInputElement>('#search')!
   const filterName = (text: string) => text.includes('Zinume')
   const nomeFiltrado = nomes.filter(filterName)
   let nomePesquisado = nomeFiltrado.map(filterName).sort().join('\n')

   if (input.value.toString() == '') {
      p.innerText = nomesOrdenados
   } 

   console.log(nomeFiltrado)

   p.innerText = nomePesquisado

})

export function showPersons() {
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