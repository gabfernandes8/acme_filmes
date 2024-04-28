'use strict'

export const getClassificacaoById = async(id) => {
    try{
        const url = `http://localhost:8080/v2/acme_filmes/classificacao/${id}`
        const response = await fetch(url)
        const data = await response.json()

        return data.classificacao[0]

    } catch(error) {
        return false
    }
    
}

export const getClassificacoes = async() => {

    const url = 'http://localhost:8080/v2/acme_filmes/classificacao'
    const response = await fetch(url)
    const data = await response.json()
    return data.classificacoes

}

export const getFilmes = async() => {

    const url = 'http://localhost:8080/v2/acme_filmes/filmes'
    const response = await fetch(url)
    const data = await response.json()
    return data.filmes

}

export const getFilmeById = async(id) => {

    const url = `http://localhost:8080/v2/acme_filmes/filme/${id}`
    const response = await fetch(url)
    const data = await response.json()
    return data.filmes[0]

}

export const postFilme = async(filme) => {
    const url = `http://localhost:8080/v2/acme_filmes/filme/`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: filme.nome,
            sinopse: filme.sinopse,
            duracao: filme.duracao,
            data_lancamento: filme.data_lancamento,
            data_relancamento: filme.data_relancamento,
            foto_capa: filme.foto_capa,
            link_trailer: filme.link_trailer,
            classificacao_id: filme.classificacao_id
        })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    return data
}