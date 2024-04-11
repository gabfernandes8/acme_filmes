/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
* as tratativas e a regra de negócio para o CRUD de nacionalidades
* Data: 11/04/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const nacionalidadeDAO = require('../model/DAO/nacionalidade.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// função para inserir uma nova nacionalidade no DBA
const setNovaNacionalidade = async (dadosNac, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosNac = {}

            //Validação para verificar campos obrigatórios e conistência de dados
            if (dadosNac.nome == '' || dadosNac.nome == undefined || dadosNac.nome.length > 45) {

                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                    //envia os dados para o DAO inserir no BD
                    let novaNacionalidade = await nacionalidadeDAO.insertNacionalidade(dadosNac);

                    //validação para verificar se os dados foram inseridos pelo DAO no BD 
                    if (novaNacionalidade) {

                        let id = await nacionalidadeDAO.selectLastId()

                        dadosNac.id = Number(id[0].id)

                        // cria o padrão de JSON para retorno dos dados criados no DB
                        resultDadosNac.status = message.SUCCESS_CREATED_ITEM.status
                        resultDadosNac.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        resultDadosNac.message = message.SUCCESS_CREATED_ITEM.message
                        resultDadosNac.nacionalidade = dadosNac

                        return resultDadosNac

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
const setAtualizarNacionalidade = async (dadosNac, contentType, id) => {

    
    try {
        
        let nacionalidade = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosNac = {}

            //Validação para verificar campos obrigatórios e consistência de dados
            if (nacionalidade == '' || nacionalidade == undefined || 
                dadosNac.nome == '' || dadosNac.nome == undefined || dadosNac.nome.length > 80) {

                return message.ERROR_REQUIRED_FIELDS; // 400

            } else {

                //envia os dados para o DAO inserir no BD
                let nacionalidadeAtt = await nacionalidadeDAO.updateNacionalidade(dadosNac, nacionalidade);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (nacionalidadeAtt) {
                    
                    dadosNac.id = nacionalidade

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosNac.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosNac.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosNac.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosNac.nacionalidade = dadosNac

                    return resultDadosNac

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
const setExcluirNacionalidade = async (id) => {

    try {

        let nacionalidade = id

        let valNacionalidade  = await getBuscarNacionalidade(nacionalidade)

        let resultDadosNac

        if (nacionalidade == '' || nacionalidade == undefined || isNaN(nacionalidade)) {

            return message.ERROR_INVALID_ID // 400

        } else if(valNacionalidade.status == false){

            return message.ERROR_NOT_FOUND // 404

        }else {

            //Envia os dados para a model inserir no BD
            resultDadosNac = await nacionalidadeDAO.deleteNacionalidade(nacionalidade)

            //Valida se o BD inseriu corretamente os dados
            if (resultDadosNac)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// função para listar todas as nacionalidade existentes no DBA
const getListarNacionalidades = async () => {
    let nacionalidadesJSON = {}

    let dadosNacio = await nacionalidadeDAO.selectAllNacionalidades()

    if (dadosNacio) {
        if (dadosNacio.length > 0) {
            nacionalidadesJSON.nacionalidades = dadosNacio
            nacionalidadesJSON.qt = dadosNacio.length
            nacionalidadesJSON.status_code = 200
            return nacionalidadesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }


}

// função para buscar uma nacionalidade pelo ID
const getBuscarNacionalidade = async (id) => {
    // recebe o id da nacionalidade
    let idNacionalidade = id;
    let nacionalidadeJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idNacionalidade == '' || idNacionalidade == undefined || isNaN(idNacionalidade)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosNac = await nacionalidadeDAO.selectByIdNacionalidade(idNacionalidade)

        if (dadosNac) {
            // validação para verificar se existem dados de retorno
            if (dadosNac.length > 0) {
                // diva 🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺
                nacionalidadeJSON.nacionalidade = dadosNac
                nacionalidadeJSON.status_code = 200
                return nacionalidadeJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// função para buscar uma nacionalidade filtrando pelo nome
const getNacionalidadeByNome = async (nome) => {
    let nacionalidadesJSON = {}

    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosNac = await nacionalidadeDAO.selectByNome(filtro)
        if (dadosNac) {
            if (dadosNac.length > 0) {
                nacionalidadesJSON.nacionalidades = dadosNac
                nacionalidadesJSON.qt = dadosNac.length
                nacionalidadesJSON.status_code = 200
                return nacionalidadesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports = {
    setNovaNacionalidade,
    setAtualizarNacionalidade,
    setExcluirNacionalidade,
    getListarNacionalidades,
    getBuscarNacionalidade,
    getNacionalidadeByNome
}