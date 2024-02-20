/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD de filmes
* Data: 30/01/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient

// inserir um novo filme
const insertFilme = async () => { }

// atualizar um filme existente filtrando pelo ID
const updateFilme = async (id) => { }

// excluir um filme existente filtrando pelo ID
const deleteFilme = async (id) => { }

// listar todos os filmes
const selectAllFilmes = async () => {

    try {
        let sql = 'select * from tbl_filme'
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsFilmes
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes
    } catch (error) {
        return false
    }
}

// buscar o filme existente filtrando pelo ID
const selectByIdFilme = async (id) => {

    try {

        // realiza a busca do filme pelo id
        let sql = `select * from tbl_filme where id=${id}`

        // executa no DBA o script SQL
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes

    } catch (error) {
        return false
    }
}

const selectByNome = async (nome) => {
    
    try {
        let sql = `select * from tbl_filme where nome like '%${nome}%'`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsFilmes
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        console.log('to aqui 3')

        return rsFilmes
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNome
}