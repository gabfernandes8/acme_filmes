'use strict'

import { getFilmes, getFilmeByName } from './filmes.js'

const main = document.getElementById('main')
const search = document.getElementById('buxca')

const criarCard = (filme) => {

    const card = document.createElement('button')
    card.classList.add('w-[17vh]', 'h-[25vh]', 'bg-center', 'bg-cover', 'bg-no-repeat', 'shadow-[7px_5px_5px_4px_rgba(0,0,0,0.50)]')

    card.style.backgroundImage = `url(${filme.foto_capa})`

    card.addEventListener('click', () => {
        localStorage.setItem('filmeId', filme.id)

        window.location = './filme.html'
    })

    return card
}

const montarCard = (arrayFilmes) => {
    main.replaceChildren('')

    arrayFilmes.forEach((filme) => {
        const card = criarCard(filme)

        // adicionar como filho no main
        main.appendChild(card)
    });

}

const montarTodosFilmes = async() => {
    const filmes = await getFilmes()
    montarCard(filmes)
}

search.addEventListener('keyup', async() => {
    const nomeFilme = search.value

    if(nomeFilme != ''){
        const filmesFiltrados = await getFilmeByName(nomeFilme)
        if(filmesFiltrados.length > 0){
            montarCard(filmesFiltrados)
        }
    } else {
        montarTodosFilmes()
    }
})

window.addEventListener('load', montarTodosFilmes)