'use strict'

import { getFilmeById, getClassificacaoById } from './filmes.js'

const filmeId = localStorage.getItem('filmeId')
const poster = document.getElementById('poster-filme')
const nome = document.getElementById('nome-filme')
const classificacao = document.getElementById('classificacao')
const sinopse = document.getElementById('sinopse-filme')
const anoDuracao = document.getElementById('ano-duracao')
const linkTrailer = document.getElementById('link')

const montarInfoFilme = async(filme) => {

    poster.src = filme.foto_capa
    poster.alt = filme.nome

    nome.textContent = filme.nome

    let classificacaoInfo = await getClassificacaoById(filme.classificacao_id)

    classificacao.src = classificacaoInfo.icone
    classificacao.alt = classificacaoInfo.sigla

    sinopse.textContent = filme.sinopse

    const DateTime = luxon.DateTime
    let dt = DateTime.fromISO(filme.data_lancamento)
    let tm = DateTime.fromISO(filme.duracao)
    anoDuracao.textContent = `${dt.toLocaleString(DateTime.DATE_FULL)}  |  ${tm.toFormat("HH 'horas e' mm 'minutos'")}`

    linkTrailer.href = filme.link_trailer

}


window.addEventListener('load', async() => {
    
    const filmes = await getFilmeById(filmeId)
    console.log(filmes)

    montarInfoFilme(filmes)
})