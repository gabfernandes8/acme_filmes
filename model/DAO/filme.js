/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD de filmes
* Data: 30/01/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const {PrismaClient} = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient

// inserir um novo filme
const insertFilme = async() => {}

// atualizar um filme existente filtrando pelo ID
const updateFilme = async(id) => {}

// excluir um filme existente filtrando pelo ID
const deleteFilme = async(id) => {}

// listar todos os filmes
const selectAllFilmes = async() => {
    let sql = 'select * from tbl_filme'

    // $queryrawUnsafe(‘encaminha apenas a variavel’)
    // $queryRaw(‘codigo digitado aqui’)

    // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsFilmes
    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    // tratamento de erro para retornar os dados ou retornar falsy
    if (rsFilmes.length > 0) {
        return rsFilmes
    } else {
        return false
    }

}

// buscar o filme existente filtrando pelo ID
const selectByIdFilme = async(id) => {}

const selectByNome = async(nome) => {
    let sql = `select * from tbl_filme where nome like '%${nome}%'`
    
    // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsFilmes
    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    // tratamento de erro para retornar os dados ou retornar falsy
    if (rsFilmes.length > 0) {
        return rsFilmes
    } else {
        return false
    }
}

module.exports={
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNome
}