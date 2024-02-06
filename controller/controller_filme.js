/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
* as tratativas e a regra de negócio para o CRUD de filmes
* Data: 30/01/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const filmesDAO = require('../model/DAO/filme.js')

// função para inserir um novo filme no DBA
const setNovoFilme = async() => {}

//função para atualizar um filme existente
const setAtualizarFilme = async() => {}

// função para excluir um filme existente
const setExcluirFilme = async() => {}

// função para listar todos os filmes existentes no DBA
const getListarFilmes = async() => {
    let filmesJSON = {}

    let dadosFilmes = await filmesDAO.selectAllFilmes()

    if (dadosFilmes){
        filmesJSON.filmes = dadosFilmes
        filmesJSON.qt = dadosFilmes.length 
        filmesJSON.status_code = 200
        return filmesJSON
    } else {
        return false
    }

    
}

// função para buscar um filme pelo ID
const getBuscarFilme = async() => {}

module.exports={
    setNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme
}