/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
* as tratativas e a regra de negócio para o CRUD de generos de filme
* Data: 11/04/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const generosDAO = require('../model/DAO/genero.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// função para inserir uma nova nacionalidade no DBA
const setNovoGenero = async (dadosGenero, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosGenero = {}

            //Validação para verificar campos obrigatórios e conistência de dados
            if (dadosGenero.nome == '' || dadosGenero.nome == undefined || dadosGenero.nome.length > 45) {

                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                    //envia os dados para o DAO inserir no BD
                    let novoGenero = await generosDAO.insertGenero(dadosGenero);

                    //validação para verificar se os dados foram inseridos pelo DAO no BD 
                    if (novoGenero) {

                        let id = await generosDAO.selectLastId()

                        dadosGenero.id = Number(id[0].id)

                        // cria o padrão de JSON para retorno dos dados criados no DB
                        resultDadosGenero.status = message.SUCCESS_CREATED_ITEM.status
                        resultDadosGenero.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        resultDadosGenero.message = message.SUCCESS_CREATED_ITEM.message
                        resultDadosGenero.genero = dadosGenero

                        return resultDadosGenero

                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER // 500

    }


}

//função para atualizar uma nacionalidade existente
const setAtualizarGenero = async (dadosGenero, contentType, id) => {

    
    try {
        
        let genero = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosGenero = {}

            //Validação para verificar campos obrigatórios e consistência de dados
            if (genero == '' || genero == undefined || 
                dadosGenero.nome == '' || dadosGenero.nome == undefined || dadosGenero.nome.length > 80) {

                return message.ERROR_REQUIRED_FIELDS; // 400

            } else {

                //envia os dados para o DAO inserir no BD
                let generoAtt = await generosDAO.updateGenero(dadosGenero, genero);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (generoAtt) {
                    
                    dadosGenero.id = genero

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosGenero.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosGenero.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosGenero.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosGenero.genero = dadosGenero

                    return resultDadosGenero

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

// função para excluir uma nacionalidade existente
const setExcluirGenero = async (id) => {

    try {

        let genero = id

        let valGenero  = await getBuscarGenero(genero)

        let resultDadosGenero

        if (genero == '' || genero == undefined || isNaN(genero)) {

            return message.ERROR_INVALID_ID // 400

        } else if(valGenero.status == false){

            return message.ERROR_NOT_FOUND // 404

        }else {

            //Envia os dados para a model inserir no BD
            resultDadosGenero = await generosDAO.deleteGenero(genero)

            //Valida se o BD inseriu corretamente os dados
            if (resultDadosGenero)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// função para listar todas as nacionalidade existentes no DBA
const getListarGeneros = async () => {
    let generosJSON = {}

    let dadosGeneros = await generosDAO.selectAllGeneros()

    if (dadosGeneros) {
        if (dadosGeneros.length > 0) {
            generosJSON.generos = dadosGeneros
            generosJSON.qt = dadosGeneros.length
            generosJSON.status_code = 200
            return generosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }


}

// função para buscar uma nacionalidade pelo ID
const getBuscarGenero = async (id) => {
    // recebe o id da GegetBuscarGenero
    let idGenero = id;
    let generoJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosGenero = await generosDAO.selectByIdGenero(idGenero)

        if (dadosGenero) {
            // validação para verificar se existem dados de retorno
            if (dadosGenero.length > 0) {
                // diva 🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺
                generoJSON.genero = dadosGenero
                generoJSON.status_code = 200
                return generoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// função para buscar uma nacionalidade filtrando pelo nome
const getGeneroByNome = async (nome) => {
    let generosJSON = {}

    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosGenero = await generosDAO.selectByNome(filtro)
        if (dadosGenero) {
            if (dadosGenero.length > 0) {
                generosJSON.nacionalidades = dadosGenero
                generosJSON.qt = dadosGenero.length
                generosJSON.status_code = 200
                return generosJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports = {
    setNovoGenero,
    setAtualizarGenero,
    setExcluirGenero,
    getListarGeneros,
    getBuscarGenero,
    getGeneroByNome
}