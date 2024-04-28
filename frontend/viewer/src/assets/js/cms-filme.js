'use strict'

import { postFilme, getClassificacoes } from './filmes.js'

const nome = document.getElementById('nome')
const dr = document.getElementById('data-relancamento')
const sinopse = document.getElementById('sinopse')
const classificacaoId = document.getElementById('classificacao')
const duracao = document.getElementById('duracao')
const capa = document.getElementById('capa')
const dl = document.getElementById('data-lancamento')
const link = document.getElementById('link')
const botaoSalvar = document.getElementById('btn')

const criarOpcaoClassificacao = (classificacao) => {

    const option = document.createElement('option')
    option.value = classificacao.id
    option.textContent = classificacao.sigla

    return option

}

const listarClassificacao = (arrayClassificacao) => {

    arrayClassificacao.forEach((classificacao) => {
        let classificacaoOption = criarOpcaoClassificacao(classificacao)

        classificacaoId.appendChild(classificacaoOption)
    })

}

window.addEventListener('load', async() => {

    const classificacoes = await getClassificacoes()

    listarClassificacao(classificacoes)

})

const validacaoCadastro = () => {

    if(
        nome.value == ''    || sinopse.value == '' || classificacaoId.value == '' || 
        duracao.value == '' || capa.value == ''    || dl.value == ''              || link.value == '' 
    ){
        return false
    } else {
        return true
    }

}

const cadastrarFilme = () => {

    if(validacaoCadastro()){
        let filme = {
            nome: nome.value,
            sinopse: sinopse.value,
            duracao: duracao.value,
            data_lancamento: dl.value,
            foto_capa: capa.value,
            link_trailer: link.value,
            classificacao_id: classificacaoId.value
        }

        if(dr.value == ''){
            filme.data_relacamento = null
        } else {
            filme.data_relacamento = dr.value
        }

        Swal.fire({
            timer: 2000,
            title: '<p class="text-2xl text-secundary"> Filme cadastrado com sucesso! <p>',
            icon: 'success',
            iconColor: '#FD3131',
            showConfirmButton: false,
            width: '25rem',
            padding: '0 0 28px 0',
            heightAuto: false,
        })
    } else {
        Swal.fire({
            timer: 2000,
            title: '<p class="text-2xl text-secundary"> Filme cadastrado com sucesso! <p>',
            icon: 'success',
            iconColor: '#FD3131',
            showConfirmButton: false,
            width: '25rem',
            padding: '0 0 28px 0',
            heightAuto: false,
        })
    }

}

botaoSalvar.addEventListener('click', cadastrarFilme)