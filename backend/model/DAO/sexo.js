/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD de sexo
* Data: 11/04/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient

// inserir um novo genero
const insertGender = async (dadosGender) => {
    try {

        let sql

        sql = `insert into tbl_sexo (
                                            nome,
                                            sigla
                                        )values (
                                            '${dadosGender.nome}',
                                            '${dadosGender.sigla}'
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

// atualizar um genero existente filtrando pelo ID
const updateGender = async (dadosGender, id) => {
    
    try {

        let sql

        sql = `update tbl_sexo set  
                                    nome = "${dadosGender.nome}",
                                    sigla = "${dadosGender.sigla}"
                                    
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

// excluir um genero existente filtrando pelo ID
const deleteGender = async (id) => {

    try {
        
        let sql = `delete from tbl_sexo where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsGender
        let rsGender = await prisma.$executeRawUnsafe(sql)
        
        return rsGender
        
    } catch (error) {
        
        return false
    }

}

// listar todos os generos
const selectAllGenders = async () => {

    try {
        let sql = 'select * from tbl_sexo order by id desc'
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsGender
        let rsGender = await prisma.$queryRawUnsafe(sql)
        return rsGender
    } catch (error) {
        return false
    }
}

// buscar o genero existente filtrando pelo ID
const selectByIdGender = async (id) => {

    try {

        // realiza a busca da nacionalidade pelo id
        let sql = `select * from tbl_sexo where id=${id}`

        // executa no DBA o script SQL
        let rsGender = await prisma.$queryRawUnsafe(sql)
        return rsGender

    } catch (error) {
        return false
    }
}

const selectByNome = async (nome) => {
    
    try {
        let sql = `select * from tbl_sexo where nome like '%${nome}%'`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsGender
        let rsGender = await prisma.$queryRawUnsafe(sql)

        return rsGender
    } catch (error) {
        return false
    }
}

const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_sexo limit 1' 

        let rsGender = await prisma.$queryRawUnsafe(sql)
        return rsGender

    } catch (error) {

        return false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    }
}

module.exports = {
    insertGender,
    updateGender,
    deleteGender,
    selectAllGenders,
    selectByIdGender,
    selectByNome,
    selectLastId
}