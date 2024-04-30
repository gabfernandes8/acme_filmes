'use strict'

import { postAtor, getGeneros } from './atores.js'

const nome = document.getElementById('nome')
const dn = document.getElementById('dn')
const biografia = document.getElementById('bio')
const df = document.getElementById('df')
const generoInput = document.getElementById('genero')
const botaoSalvar = document.getElementById('btn')

const criarOpcaoGenero = (genero) => {

    const option = document.createElement('option')
    option.value = genero.id
    option.textContent = genero.sigla

    return option

}

const listarGeneros = (arrayGenero) => {
    arrayGenero.forEach((genero) => {
        let generoOption = criarOpcaoGenero(genero)
        generoInput.appendChild(generoOption)
    })

}

window.addEventListener('load', async() => {

    const genders = await getGeneros()

    listarGeneros(genders)

})

const validacaoCadastro = () => {

    if(
        nome.value == ''    || dn.value == '' || biografia.value == '' || genero.value == ''
    ){
        return false
    } else {
        return true
    }

}

const cadastrarAtor = async() => {

    if(validacaoCadastro()){
        let ator = {
            nome: nome.value,
            biografia: biografia.value,
            data_nascimento: dn.value,
            data_falecimento: null,
            sexo_id: genero.value
        }

        if(df.value != ''){
            ator.data_falecimento = df.value
        }
    
        const rsCadastro = await postAtor(ator)

        Swal.fire({
            timer: 2000,
            title: '<p class="text-2xl text-secundary font-fontP"> Ator cadastrado com sucesso! <p>',
            icon: 'success',
            iconColor: '#00c190',
            showConfirmButton: false,
            width: '25rem',
            padding: '0 0 28px 0',
            heightAuto: false,
        })

    } else {
        Swal.fire({
            timer: 2000,
            title: '<p class="text-2xl text-secundary font-fontP"> É necessário preencher todos os dados <p>',
            icon: 'warning',
            iconColor: '#FD3131',
            showConfirmButton: false,
            width: '25rem',
            padding: '0 0 28px 0',
            heightAuto: false,
        })
    }

}

botaoSalvar.addEventListener('click', cadastrarAtor)