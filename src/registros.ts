import Book from './entities/Book.js'
import Person from './entities/Person.js'
import Periodical from './entities/Periodical.js'

const typeSelect = document.querySelector<HTMLSelectElement>('#type')!
const title = document.querySelector<HTMLInputElement>('#title')!
const subtitle = document.querySelector<HTMLInputElement>('#subtitle')!
const publishedAt = document.querySelector<HTMLInputElement>('#publishedAt')!
const author = document.querySelector<HTMLSelectElement>('#author')!
const isbn = document.querySelector<HTMLInputElement>('#isbn')!
const edition = document.querySelector<HTMLInputElement>('#edition')!
const volume = document.querySelector<HTMLInputElement>('#volume')!
const issn = document.querySelector<HTMLInputElement>('#issn')!
const issue = document.querySelector<HTMLInputElement>('#issue')!
const mensagem = document.querySelector<HTMLParagraphElement>("#mensagem")!
const formulario = document.querySelector<HTMLFormElement>('form')!

let personsLocalStorage: Array<Person> = JSON.parse(localStorage.getItem("persons") || '{}')
let nomes = personsLocalStorage.map(p=> p.name)
console.log(nomes)

typeSelect.addEventListener('change', (event) => {
    if (typeSelect.value == "l") {
        title.style.display = "block";
        subtitle.style.display = "block";
        publishedAt.style.display = "block";
        author.style.display = "block";
        isbn.style.display = "block";
        edition.style.display = "block";
        volume.style.display = "block";
        issue.style.display = "none";
        issn.style.display = "none";
        nameSelect();
    }else if (typeSelect.value == "p") {
        title.style.display = "block";
        subtitle.style.display = "block";
        publishedAt.style.display = "block";
        author.style.display = "block";
        issue.style.display = "block";
        issn.style.display = "block";
        volume.style.display = "block";
        isbn.style.display = "none";
        edition.style.display = "none";
        nameSelect();
    } else {
        title.style.display = "none";
        subtitle.style.display = "none";
        publishedAt.style.display = "none";
        author.style.display = "none";
        issue.style.display = "none";
        issn.style.display = "none";
        volume.style.display = "none";
        isbn.style.display = "none";
        edition.style.display = "none"; 
        nameSelect();
    }
})

const livros: Book[] = []
const periodicos: Periodical[] = []

formulario.addEventListener('submit', (e: Event) => {
    e.preventDefault()

    var autorteste = author.value.trim()

    var person = personsLocalStorage[parseInt(autorteste)]

    if (typeSelect.value == 'l') {

        if (!title.value.trim()) {
            mensagem.innerText = 'O campo título deve ser preenchido corretamente!'
            title.focus()
            return
        }
    
        if (!subtitle.value.trim()) {
            mensagem.innerText = 'O campo de subtítulo deve ser preenchido corretamente!'
            subtitle.focus()
            return
        }
    
        if (!publishedAt.value.trim()) {
            mensagem.innerText = 'O campo de publicação deve ser preenchido corretamente!'
            publishedAt.focus()
            return
        }
    
        const publicado = new Date(`${publishedAt.value}T00:00:00`)
    
        if (Date.now() - Number(publicado) < 0) {
            publishedAt.innerText = 'A publicação deve ter ocorrido no passado!'
            publishedAt.focus()
            return
        }
    
        if (!author.value.trim()) {
            mensagem.innerText = 'O campo Autor deve ser preenchido corretamente!'
            author.focus()
            return
        }
    
        if (isNaN(parseInt(isbn.value)))
        {
            mensagem.innerText = "O campo ISBN deve ser numérico!"
            return
        }

        if (!isbn.value.trim()) {
            mensagem.innerText = 'O campo ISBN deve ser preenchido corretamente!'
            isbn.focus()
            return
        }

        if (isNaN(parseInt(edition.value)))
        {
            mensagem.innerText = "O campo Edição deve ser numérico!"
            return
        }
    
        if (!edition.value.trim()) {
            mensagem.innerText = 'O campo Edição deve ser preenchido corretamente!'
            edition.focus()
            return
        }
    
        if (!volume.value.trim()) {
            mensagem.innerText = 'O campo Volume deve ser preenchido corretamente!'
            volume.focus()
            return
        }

        if (isNaN(parseInt(volume.value)))
        {
            mensagem.innerText = "O campo Volume deve ser numérico!"
            return
        }

        try {

            let published = new Date(publishedAt.value)
            let isbnType = parseInt(isbn.value)
            let editionType = parseInt(edition.value)
            let volumeType = parseInt(volume.value)

            const book = new Book(
                isbnType,
                editionType,
                volumeType,
                title.value,
                subtitle.value,
                published,
                person
            )

            livros.push(book)
            localStorage.setItem('livros', JSON.stringify(livros))
            showBook

        }
        catch {
            mensagem.innerText = 'Opa, algo deu errado!'
        }

        isbn.value = ''
        edition.value = ''
        volume.value = ''
        title.value = ''
        subtitle.value = ''
        publishedAt.value = ''
        author.value = ''
        issue.value = ''
        issn.value = ''

    } else if (typeSelect.value == 'p') {
        if (!title.value.trim()) {
            mensagem.innerText = 'O campo título deve ser preenchido corretamente!'
            title.focus()
            return
        }
    
        if (!subtitle.value.trim()) {
            mensagem.innerText = 'O campo de subtítulo deve ser preenchido corretamente!'
            subtitle.focus()
            return
        }
    
        if (!publishedAt.value.trim()) {
            mensagem.innerText = 'O campo de publicação deve ser preenchido corretamente!'
            publishedAt.focus()
            return
        }
    
        const publicado = new Date(`${publishedAt.value}T00:00:00`)
    
        if (Date.now() - Number(publicado) < 0) {
            publishedAt.innerText = 'A publicação deve ter ocorrido no passado!'
            publishedAt.focus()
            return
        }
    
        if (!author.value.trim()) {
            mensagem.innerText = 'O campo Autor deve ser preenchido corretamente!'
            author.focus()
            return
        }
    
        if (!volume.value.trim()) {
            mensagem.innerText = 'O campo volume deve ser preenchido corretamente!'
            volume.focus()
            return
        }
    
        if (!issn.value.trim()) {
            mensagem.innerText = 'O campo ISSN deve ser preenchido corretamente!'
            issn.focus()
            return
        }
    
        if (!issue.value.trim()) {
            mensagem.innerText = 'O campo ISSUE deve ser preenchido corretamente!'
            issue.focus()
            return
        }

        isbn.value = ''
        edition.value = ''
        volume.value = ''
        title.value = ''
        subtitle.value = ''
        publishedAt.value = ''
        author.value = ''
        issue.value = ''
        issn.value = ''

        try {
            let issnType = parseInt(issn.value)
            let issueType = parseInt(issue.value)
            let volumeType2 = parseInt(volume.value)
            let published2 = new Date(publishedAt.value)

            const periodico = new Periodical(
                issnType,
                issueType,
                volumeType2,
                title.value,
                subtitle.value,
                published2,
                person
            )
            periodicos.push(periodico)
            localStorage.setItem('periodicos', JSON.stringify(periodicos))
            showPeriodical
        }
        catch {
            mensagem.innerText = "Opa, algo deu errado!"
        }

    }

})

function showPeriodical() {
    if (localStorage.getItem('periodicos')) {
        const data = JSON.parse(localStorage.getItem('periodicos')!)

        periodicos.splice(0)

        for (const item of data) {
            periodicos.push(new Periodical(
                item.issn,
                item.volume,
                item.issue,
                item.title,
                item.subtitle,
                item.publishedAt,
                item.author
            ))
        }
    }
}

function showBook() {
    if (localStorage.getItem('livros')) {
        const data = JSON.parse(localStorage.getItem('livros')!)

        livros.splice(0)

        for (const item of data) {
            livros.push(new Book(
                item.isbn,
                item.edition,
                item.volume,
                item.title,
                item.subtitle,
                item.publishedAt,
                item.author
            ))
        }
    }
}

function nameSelect(){
    for (let i = 0; i < nomes.length; i++) {

        author.add(new Option(nomes[i].toString(), i.toString()));
        
    }
}