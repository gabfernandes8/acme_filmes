/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
* as tratativas e a regra de negócio para o CRUD de sexo
* Data: 11/04/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const genderDAO = require('../model/DAO/sexo.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// função para inserir um novo genero no DBA
const setNovoGender = async (dadosGender, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosGender = {}

            //Validação para verificar campos obrigatórios e conistência de dados
            if (dadosGender.nome == '' || dadosGender.nome == undefined || dadosGender.nome.length > 45 ||
                dadosGender.sigla == '' || dadosGender.sigla == undefined || dadosGender.sigla.length > 2
            ) {

                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                //envia os dados para o DAO inserir no BD
                let novoGender = await genderDAO.insertGender(dadosGender)

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (novoGender) {

                    let id = await genderDAO.selectLastId()

                    dadosGender.id = Number(id[0].id)

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosGender.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosGender.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosGender.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosGender.gender = dadosGender

                    return resultDadosGender

                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER // 500

    }


}

//função para atualizar um genero existente
const setAtualizarGender = async (dadosGender, contentType, id) => {

    
    try {
        
        let gender = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosGender = {}

            //Validação para verificar campos obrigatórios e consistência de dados
            if (gender == '' || gender == undefined || 
                dadosGender.nome == '' || dadosGender.nome == undefined || dadosGender.nome.length > 15 ||
                dadosGender.sigla == '' || dadosGender.sigla == undefined || dadosGender.sigla.length > 2) {

                return message.ERROR_REQUIRED_FIELDS; // 400

            } else {

                //envia os dados para o DAO inserir no BD
                let genderAtt = await genderDAO.updateGender(dadosGender, gender);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (genderAtt) {
                    
                    dadosGender.id = gender

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosGender.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosGender.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosGender.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosGender.gender = dadosGender

                    return resultDadosGender

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

// função para excluir um genero existente
const setExcluirGender = async (id) => {

    try {

        let gender = id

        let valGender  = await getBuscarGender(gender)

        let resultDadosNac

        if (gender == '' || gender == undefined || isNaN(gender)) {

            return message.ERROR_INVALID_ID // 400

        } else if(valGender.status == false){

            return message.ERROR_NOT_FOUND // 404

        }else {

            //Envia os dados para a model inserir no BD
            resultDadosGender = await genderDAO.deleteGender(gender)

            //Valida se o BD inseriu corretamente os dados
            if (resultDadosGender)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// função para listar todos os generos existentes no DBA
const getListarGenders = async () => {
    let gendersJSON = {}

    let dadosGenders = await genderDAO.selectAllGenders()

    if (dadosGenders) {
        if (dadosGenders.length > 0) {
            gendersJSON.genders = dadosGenders
            gendersJSON.qt = dadosGenders.length
            gendersJSON.status_code = 200
            return gendersJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }


}

// função para buscar um genero pelo ID
const getBuscarGender = async (id) => {
    // recebe o id do genero
    let idGender = id;
    let genderJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idGender == '' || idGender == undefined || isNaN(idGender)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosGender = await genderDAO.selectByIdGender(idGender)

        if (dadosGender) {
            // validação para verificar se existem dados de retorno
            if (dadosGender.length > 0) {
                // diva 🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺
                genderJSON.gender = dadosGender
                genderJSON.status_code = 200
                return genderJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// função para buscar um genero filtrando pelo nome
const getGenderByNome = async (nome) => {
    let gendersJSON = {}

    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosGender = await genderDAO.selectByNome(filtro)
        if (dadosGender) {
            if (dadosGender.length > 0) {
                gendersJSON.genders = dadosGender
                gendersJSON.qt = dadosGender.length
                gendersJSON.status_code = 200
                return gendersJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports = {
    setNovoGender,
    setAtualizarGender,
    setExcluirGender,
    getListarGenders,
    getBuscarGender,
    getGenderByNome
}