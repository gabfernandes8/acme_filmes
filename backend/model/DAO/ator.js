/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD de atores
* Data: 11/04/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient

// post: inserir um novo ator
const insertAtor = async (dadosAtor) => {
    try {

        let sql

        if(dadosAtor.data_falecimento == null || dadosAtor.data_falecimento == '' || dadosAtor.data_falecimento == undefined){
            sql = `insert into tbl_atores (
                                            nome,
                                            data_nascimento,
                                            data_falecimento,
                                            biografia,
                                            sexo_id
                                        )values (
                                            '${dadosAtor.nome}',
                                            '${dadosAtor.data_nascimento}',
                                            null,
                                            '${dadosAtor.biografia}',
                                            ${dadosAtor.sexo_id}
                                        )`

        } else {

            sql = `insert into tbl_atores (
                                            nome,
                                            data_nascimento,
                                            data_falecimento,
                                            biografia,
                                            sexo_id
                                        )values (
                                            '${dadosAtor.nome}',
                                            '${dadosAtor.data_nascimento}',
                                            '${dadosAtor.data_falecimento}'
                                            '${dadosAtor.biografia}'
                                            ${dadosAtor.sexo_id}
                                        )`

        }

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

// put: atualizar um ator existente filtrando pelo ID
const updateAtor = async (dadosAtor, id) => {
    
    try {

        let sql

        if(dadosAtor.data_falecimento == null || dadosAtor.data_falecimento == '' || dadosAtor.data_falecimento == undefined){
            sql = `update tbl_atores  set  
                                        nome = "${dadosAtor.nome}",
                                        data_nascimento = "${dadosAtor.data_nascimento}",
                                        data_falecimento = null,
                                        biografia = "${dadosAtor.biografia}",
                                        sexo_id = "${dadosAtor.sexo_id}"
                                    
                                        where id = ${id}`
        } else {

            sql = `update tbl_atores  set  
                                        nome = "${dadosAtor.nome}",
                                        data_nascimento = "${dadosAtor.data_nascimento}",
                                        data_falecimento = "${dadosAtor.data_falecimento}",
                                        biografia = "${dadosAtor.biografia}",
                                        sexo_id = "${dadosAtor.sexo_id}"
                                    
                                        where id = ${id}`
            
        }

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

// delete: excluir um ator existente filtrando pelo ID
const deleteAtor = async (id) => {

    try {
        
        let sql = `delete from tbl_atores where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsGenero
        let rsAtor = await prisma.$executeRawUnsafe(sql)
        
        return rsAtor
        
    } catch (error) {
        
        return false
    }

}

// get: listar todos os atores
const selectAllAtores = async () => {

    try {
        let sql = 'select * from tbl_atores order by id desc'
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAtor
        let rsAtor = await prisma.$queryRawUnsafe(sql)
        return rsAtor
    } catch (error) {
        return false
    }
}

// get: buscar o ator existente filtrando pelo ID
const selectByIdAtor = async (id) => {

    try {

        // realiza a busca do ator pelo id
        let sql = `select * from tbl_atores where id=${id}`

        // executa no DBA o script SQL
        let rsAtor = await prisma.$queryRawUnsafe(sql)
        return rsAtor

    } catch (error) {
        return false
    }
}

// get: buscar o ator existente filtrando pelo nome
const selectByNome = async (nome) => {
    
    try {
        let sql = `select * from tbl_atores where nome like '%${nome}%'`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAtor
        let rsAtor = await prisma.$queryRawUnsafe(sql)

        return rsAtor
    } catch (error) {
        return false
    }
}

const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_atores limit 1' 

        let rsAtor = await prisma.$queryRawUnsafe(sql)
        return rsAtor

    } catch (error) {

        return false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    }
}

module.exports = {
    insertAtor,
    updateAtor,
    deleteAtor,
    selectAllAtores,
    selectByIdAtor,
    selectByNome,
    selectLastId
}