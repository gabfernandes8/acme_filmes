/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
* as tratativas e a regra de negócio para o CRUD de atores
* Data: 11/04/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const atoresDAO = require('../model/DAO/ator.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// função para inserir um novo ator no DBA
const setNovoAtor = async (dadosAtor, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosAtor = {}

            //Validação para verificar campos obrigatórios e conistência de dados
            if (dadosAtor.nome == '' || dadosAtor.nome == undefined || dadosAtor.nome.length > 150) {

                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                    //envia os dados para o DAO inserir no BD
                    let novoAtor = await AtoresDAO.insertAtor(dadosAtor);

                    //validação para verificar se os dados foram inseridos pelo DAO no BD 
                    if (novoAtor) {

                        let id = await AtoresDAO.selectLastId()

                        dadosAtor.id = Number(id[0].id)

                        // cria o padrão de JSON para retorno dos dados criados no DB
                        resultDadosAtor.status = message.SUCCESS_CREATED_ITEM.status
                        resultDadosAtor.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        resultDadosAtor.message = message.SUCCESS_CREATED_ITEM.message
                        resultDadosAtor.ator = dadosAtor

                        return resultDadosAtor
                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER // 500

    }


}

//função para atualizar um ator existente
const setAtualizarAtor = async (dadosDiretor, contentType, id) => {
    
    try {
        
        let ator = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosAtor = {}

            //Validação para verificar campos obrigatórios e consistência de dados
            if (ator == '' || ator == undefined || 
                dadosAtor.nome == '' || dadosAtor.nome == undefined || dadosAtor.nome.length > 150) {

                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                    //envia os dados para o DAO inserir no BD
                    let diretorAtt = await diretoresDAO.updateDiretor(dadosDiretor, diretor);

                    //validação para verificar se os dados foram inseridos pelo DAO no BD 
                    if (diretorAtt) {
                        
                        dadosDiretor.id = diretor

                        // cria o padrão de JSON para retorno dos dados criados no DB
                        resultDadosDiretor.status = message.SUCCESS_UPDATED_ITEM.status
                        resultDadosDiretor.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        resultDadosDiretor.message = message.SUCCESS_UPDATED_ITEM.message
                        resultDadosDiretor.diretor = dadosDiretor

                        return resultDadosDiretor

                    } else {

                        return message.ERROR_INTERNAL_SERVER_DBA // 500

                    }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER // 500

    }
    

}

// função para excluir um diretor existente
const setExcluirDiretor = async (id) => {

    try {

        let diretor = id

        let valDiretor  = await getBuscarDiretor(diretor)

        let resultDadosDiretor

        if (diretor == '' || diretor == undefined || isNaN(diretor)) {

            return message.ERROR_INVALID_ID // 400

        } else if(valDiretor.status == false){

            return message.ERROR_NOT_FOUND // 404

        }else {

            //Envia os dados para a model inserir no BD
            resultDadosDiretor = await diretoresDAO.deleteDiretor(diretor)

            //Valida se o BD inseriu corretamente os dados
            if (resultDadosDiretor)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// função para listar todos os diretores existentes no DBA
const getListarDiretores = async () => {
    let diretoresJSON = {}

    let dadosDiretores = await diretoresDAO.selectAllDiretores()

    if (dadosDiretores) {
        if (dadosDiretores.length > 0) {
            diretoresJSON.diretores = dadosDiretores
            diretoresJSON.qt = dadosDiretores.length
            diretoresJSON.status_code = 200
            return diretoresJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }


}

// função para buscar um diretores pelo ID
const getBuscarDiretor = async (id) => {
    // recebe o id do diretor
    let idDiretor = id
    let diretorJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosDiretor = await diretoresDAO.selectByIdDiretor(idDiretor)

        if (dadosDiretor) {
            // validação para verificar se existem dados de retorno
            if (dadosDiretor.length > 0) {
                // diva 🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺
                diretorJSON.diretor = dadosDiretor
                diretorJSON.status_code = 200
                return diretorJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// função para buscar um diretor filtrando pelo nome
const getDiretorByNome = async (nome) => {
    let diretoresJSON = {}

    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosDiretores = await diretoresDAO.selectByNome(filtro)
        if (dadosDiretores) {
            if (dadosDiretores.length > 0) {
                diretoresJSON.diretores = dadosDiretores
                diretoresJSON.qt = dadosDiretores.length
                diretoresJSON.status_code = 200
                return diretoresJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

// função para buscar um diretor filtrando pelo nome
// const getFilmeByDiretor = async (nome) => {
//     let diretorJSON = {}

//     let filtro = nome

//     if (filtro == '' || filtro == undefined) {
//         return message.ERROR_INVALID_PARAM //400
//     } else {

//         let dadosDiretores = await diretoresDAO.selectByNome(filtro)
//         if (dadosDiretores) {
//             if (dadosDiretores.length > 0) {
//                 diretoresJSON.diretores = dadosFilmes
//                 diretoresJSON.qt = dadosDiretores.length
//                 diretoresJSON.status_code = 200
//                 return diretoresJSON
//             } else {
//                 return message.ERROR_NOT_FOUND //404
//             }
//         } else {
//             return message.ERROR_INTERNAL_SERVER_DBA // 500
//         }
//     }
// }

module.exports = {
    setNovoDiretor,
    setAtualizarDiretor,
    setExcluirDiretor,
    getListarDiretores,
    getBuscarDiretor,
    getDiretorByNome
}