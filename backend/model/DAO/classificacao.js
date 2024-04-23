/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD de classificacao indicativa
* Data: 11/04/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient

// inserir uma nova classificacao
const insertClassificacao = async (dadosClassificacao) => {
    try {

        let sql

        sql = `insert into tbl_classificacao (
                                            sigla,
                                            icone,
                                            descricao
                                        )values (
                                            '${dadosClassificacao.sigla}',
                                            '${dadosClassificacao.icone}',
                                            '${dadosClassificacao.descricao}'
                                        )`

    // executa o sciptSQL no DB (devemos usar o comando execute e não o query)
    // o comando execute deve ser utilizado para INSERT, UPDATE, DELETE
    let result = await prisma.$executeRawUnsafe(sql)
    
    // validação para verificar se o insert funcionou no DB
    if(result){
        return true
    } else {
        return false
    }

    
    
} catch (error) {
    
    return false

    }
}

// atualizar uma nacionalidade existente filtrando pelo ID
const updateClassificacao = async (dadosClassificacao, id) => {
    
    try {

        let sql

        sql = `update tbl_classificacao  set  
                                    sigla = "${dadosClassificacao.sigla}",
                                    icone = "${dadosClassificacao.icone}",
                                    descricao = "${dadosClassificacao.descricao}"
                                    
                                    where id = ${id}`

            // executa o sciptSQL no DB (devemos usar o comando execute e não o query)
            // o comando execute deve ser utilizado para INSERT, UPDATE, DELETE
            let result = await prisma.$executeRawUnsafe(sql)
            

            // validação para verificar se o insert funcionou no DB
            if(result){
                return true
            } else {
                return false
            }

    } catch (error) {
        
        return false

    }

}

// excluir uma nacionalidade existente filtrando pelo ID
const deleteClassificacao = async (id) => {

    try {
        
        let sql = `delete from tbl_classificacao where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsGenero
        let rsClassificacao = await prisma.$executeRawUnsafe(sql)
        
        return rsClassificacao
        
    } catch (error) {
        
        return false
    }

}

// listar todos as nacionalidades
const selectAllClassificacao = async () => {

    try {
        let sql = 'select * from tbl_classificacao order by id desc'
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsClassificacao
        let rsClassificacao = await prisma.$queryRawUnsafe(sql)
        return rsClassificacao
    } catch (error) {
        return false
    }
}

// buscar o filme existente filtrando pelo ID
const selectByIdClassificacao = async (id) => {

    try {

        // realiza a busca da nacionalidade pelo id
        let sql = `select * from tbl_classificacao where id=${id}`

        // executa no DBA o script SQL
        let rsClassificacao = await prisma.$queryRawUnsafe(sql)
        return rsClassificacao

    } catch (error) {
        return false
    }
}

const selectByNome = async (nome) => {
    
    try {
        let sql = `select * from tbl_classificacao where descricao like '%${nome}%' OR sigla like '%${nome}'`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsNacionalidade
        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        return rsClassificacao
    } catch (error) {
        return false
    }
}

const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_classificacao limit 1' 

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)
        return rsClassificacao

    } catch (error) {

        return false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    }
}

module.exports = {
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    selectByNome,
    selectLastId
}