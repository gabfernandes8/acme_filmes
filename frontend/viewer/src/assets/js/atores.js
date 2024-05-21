'use strict'

export const getGeneroById = async(id) => {
    try{
        const url = `https://acme-filmes-27cn.onrender.com/v2/acme_filmes/gender/${id}`
        const response = await fetch(url)
        const data = await response.json()

        return data.classificacao[0]

    } catch(error) {
        return false
    }
    
}

export const getGeneros = async() => {

    const url = 'https://acme-filmes-27cn.onrender.com/v2/acme_filmes/gender'
    const response = await fetch(url)
    const data = await response.json()
    return data.genders

}

export const getAtores = async() => {
    const url = 'https://acme-filmes-27cn.onrender.com/v2/acme_filmes/atores'
    const response = await fetch(url)
    const data = await response.json()
    return data.atores
}

export const getAtorById = async(id) => {

    const url = `https://acme-filmes-27cn.onrender.com/v2/acme_filmes/ator/${id}`
    const response = await fetch(url)
    const data = await response.json()
    return data.ator[0]

}

export const postAtor = async(ator) => {
    const url = `https://acme-filmes-27cn.onrender.com/v2/acme_filmes/ator/`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: ator.nome,
            data_nascimento: ator.data_nascimento,
            data_falecimento: ator.data_falecimento,
            biografia: ator.biografia,
            sexo_id: ator.sexo_id
        })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    return data
} 