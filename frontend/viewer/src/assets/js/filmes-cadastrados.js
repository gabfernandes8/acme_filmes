'use strict'

import { getFilmes, getClassificacaoById, deleteFilme, getClassificacoes, putFilme } from "./filmes.js"

const tabela = document.getElementById('tbl')
const editar = document.getElementById('editar-filme')
const btnFechar = document.getElementById('fechar')
const nome = document.getElementById('nome')
const dr = document.getElementById('data-relancamento')
const sinopse = document.getElementById('sinopse')
const classificacaoId  = document.getElementById('classificacao')
const duracao = document.getElementById('duracao')
const capa = document.getElementById('capa')
const dl = document.getElementById('data-lancamento')
const link = document.getElementById('link')
const botaoSalvar = document.getElementById('btn')
const tabelaBody = tabela.children[0]

const criarLinha = async(filme) => {

    const DateTime = luxon.DateTime

    const tr = document.createElement('tr')
    tr.classList.add('grid', 'grid-cols-12', 'h-fit')
    
    const nome = document.createElement('td')
    nome.classList.add('font-fontP', 'text-sm', 'border', 'border-gray', 'text-start', 'px-2', 'h-[8vh]', 'col-span-2', 'overflow-hidden', 'w-full')
    nome.textContent = filme.nome

    const sinopse = document.createElement('td')
    sinopse.classList.add('font-fontP', 'text-sm', 'border', 'border-gray', 'text-start', 'px-2', 'h-[8vh]', 'overflow-hidden', 'w-full')
    sinopse.textContent = filme.sinopse

    const duracao = document.createElement('td')
    duracao.classList.add('font-fontP', 'text-sm', 'border', 'border-gray', 'text-start', 'px-2', 'h-[8vh]', 'overflow-hidden', 'w-full')
    duracao.textContent = filme.duracao

    const dl = document.createElement('td')
    dl.classList.add('font-fontP', 'text-sm', 'border', 'border-gray', 'text-start', 'px-2', 'h-[8vh]', 'overflow-hidden', 'w-full', 'col-span-2')
    let dt = DateTime.fromISO(filme.data_lancamento)
    dl.textContent = dt.toLocaleString(DateTime.DATE_SHORT)

    const dr = document.createElement('td')
    dr.classList.add('font-fontP', 'text-sm', 'border', 'border-gray', 'text-start', 'px-2', 'h-[8vh]', 'overflow-hidden', 'w-full', 'col-span-2')

    if(filme.data_relancamento != null){
        let dt = DateTime.fromISO(filme.data_relancamento)
        dr.textContent = dt.toLocaleString(DateTime.DATE_SHORT)
    } else {
        dr.textContent = '-'
    }

    const capa = document.createElement('td')
    capa.classList.add('font-fontP', 'text-sm', 'border', 'border-gray', 'text-start', 'px-2', 'h-[8vh]', 'overflow-hidden', 'w-full')
    capa.textContent = filme.foto_capa

    const classificacao = document.createElement('td')
    classificacao.classList.add('font-fontP', 'text-sm', 'border', 'border-gray', 'text-start', 'px-2', 'h-[8vh]', 'overflow-hidden', 'w-full', 'flex', 'items-center', 'justify-center')
    const classificacaoJSON = await getClassificacaoById(filme.classificacao_id) 
    const classImg = document.createElement('img')
    classImg.src = classificacaoJSON.icone
    classImg.classList.add('w-6', 'h-6')

    const trailer = document.createElement('td')
    trailer.classList.add('font-fontP', 'text-sm', 'border', 'border-gray', 'text-start', 'px-2', 'h-[8vh]', 'overflow-hidden', 'w-full')
    trailer.textContent = filme.link_trailer

    const tdOptions = document.createElement('td')
    tdOptions.classList.add('border', 'border-gray', 'text-center')

    const divOptions = document.createElement('div')
    divOptions.classList.add('w-full', 'h-full', 'gap-2', 'flex', 'justify-center', 'items-center')

    const delButton = document.createElement('button')
    const delImg = document.createElement('img')
    delImg.src = '../img/x.png'
    delImg.classList.add('h-4/5', 'pl-2')

    delButton.addEventListener('click', () => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
            confirmButton: 'bg-blue rounded-lg font-fontP px-6 h-10 w-44 text-lg text-white text-base w-32',
            cancelButton: 'bg-maroon rounded-lg font-fontP px-6 h-10 w-44 text-lg text-white mr-6 text-base w-32'
            },
            buttonsStyling: false,
            heightAuto: false
            
        })
                swalWithBootstrapButtons.fire({
                    title: '<p class="text-2xl font-fontP"> Tem certeza que deseja excluir sua conta? </p>',
                    html: '<p class="font-fontP"> Essa ação não poderá ser desfeita </p>',
                    icon: 'warning',
                    iconColor: '#FD3131',
                    showCancelButton: true,
                    confirmButtonText: 'Excluir',
                    cancelButtonText: 'Cancelar',
                    width: '40%',
                    padding: '0 0 28px 0',
                    heightAuto: false,
                    reverseButtons: true
                }).then( async (result) => {
                
                if (result.isConfirmed) {
                    removeTableChildren()
                    const rsDelete = await deleteFilme(filme.id)
                    setTabela()                
                }
            
            })
    })

    const editButton = document.createElement('button')
    const editLink = document.createElement('a')
    editLink.href = '#'
    editLink.classList.add('h-full', 'w-full', 'flex', 'items-center', 'justify-center')
    const editImg = document.createElement('img')
    editImg.src = '../img/editar.png' 
    editImg.classList.add('size-7')
    editButton.addEventListener('click', () => {
        setEditInfo(filme)
        localStorage.setItem('editMovieId', filme.id)
        abrirEdit()
    })

    tr.replaceChildren(nome, sinopse, duracao, dl, dr, capa, classificacao, trailer, tdOptions)
    tdOptions.appendChild(divOptions)
    classificacao.appendChild(classImg)
    divOptions.replaceChildren(delButton, editButton)
    delButton.appendChild(delImg)
    editButton.appendChild(editLink)
    editLink.appendChild(editImg)
    return tr

}

const removeTableChildren = () => {

    const tabelaBodyFilhos = tabelaBody.children

    for (let linha  of tabelaBodyFilhos) {
        if (linha != tabelaBodyFilhos.firstChild) {
            const dick = tabelaBody.removeChild(linha)             
            console.log(dick);
               
        }
    }

}

const setTabela = async() => {

    const filmes = await getFilmes()
    filmes.forEach(async(filme) => {
        const linha = await criarLinha(filme)
        tabelaBody.appendChild(linha)
    })
}

const fecharEdit = () => {  
    editar.classList.remove('fixed')
    editar.classList.add('hidden')
}

const abrirEdit = () => {
    editar.classList.remove('hidden')
    editar.classList.add('fixed')
}

const criarOpcaoClassificacao = (classificacao) => {

    const option = document.createElement('option')
    option.value = classificacao.id
    option.textContent = classificacao.sigla

    return option

}

const listarClassificacao = async(id) => {

    const arrayClassificacao = await getClassificacoes()

    arrayClassificacao.forEach((classificacao) => {
        let classificacaoOption = criarOpcaoClassificacao(classificacao)

        if(classificacao.id == id){
            classificacaoOption.setAttribute('selected', true)
        }

        classificacaoId.appendChild(classificacaoOption)
    })

}

const setEditInfo = (filme) => {
    nome.value = filme.nome,
    sinopse.value = filme.sinopse,
    duracao.value = filme.duracao,
    dl.value = filme.data_lancamento,
    dr.value = filme.data_relancamento,
    capa.value = filme.foto_capa,
    link.value = filme.link_trailer

    listarClassificacao(filme.classificacao_id)

}

const validacaoUpdate = () => {

    if(
        nome.value == ''    || sinopse.value == '' || classificacaoId.value == '' || 
        duracao.value == '' || capa.value == ''    || dl.value == ''              || link.value == '' 
    ){
        return false
    } else {
        return true
    }
}

const updateFilme = async() => {
    if (validacaoUpdate()){
        let filme = {
            nome: nome.value,
            sinopse: sinopse.value,
            duracao: duracao.value,
            data_lancamento: dl.value,
            data_relancamento: null,
            foto_capa: capa.value,
            link_trailer: link.value,
            classificacao_id: classificacaoId.value
        }

        if(dr.value != ''){
            filme.data_relancamento = dr.value
        }

        const rsUpdate = await putFilme(filme, localStorage.getItem('editMovieId'))
        console.log(rsUpdate);

        Swal.fire({
            timer: 2000,
            title: '<p class="text-2xl text-secundary font-fontP"> Filme atualizado com sucesso! <p>',
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

btnFechar.addEventListener('click', fecharEdit)

botaoSalvar.addEventListener('click', async() => {
    removeTableChildren()
    updateFilme()
    setTabela()
})

window.addEventListener('load', async() => {
    setTabela()
})