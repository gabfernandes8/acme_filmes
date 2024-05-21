/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
* as tratativas e a regra de negócio para o CRUD de classificacao indicativa
* Data: 11/04/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const classificacaoDAO = require('../model/DAO/classificacao.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// função para inserir uma nova nacionalidade no DBA
const setNovaClassificacao = async (dadosClassificacao, contentType) => {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosClassificacao = {}

            //Validação para verificar campos obrigatórios e conistência de dados
            if (dadosClassificacao.sigla == ''     || dadosClassificacao.sigla == undefined     || dadosClassificacao.sigla.length > 2      ||
                dadosClassificacao.icone == ''     || dadosClassificacao.icone == undefined     || dadosClassificacao.icone.length > 150    ||
                dadosClassificacao.descricao == '' || dadosClassificacao.descricao == undefined || dadosClassificacao.descricao.length > 150
            ) {

                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                    //envia os dados para o DAO inserir no BD
                    let novaClassicacao = await classificacaoDAO.insertClassificacao(dadosClassificacao);

                    //validação para verificar se os dados foram inseridos pelo DAO no BD 
                    if (novaClassicacao) {

                        let id = await classificacaoDAO.selectLastId()

                        dadosClassificacao.id = Number(id[0].id)

                        // cria o padrão de JSON para retorno dos dados criados no DB
                        resultDadosClassificacao.status = message.SUCCESS_CREATED_ITEM.status
                        resultDadosClassificacao.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        resultDadosClassificacao.message = message.SUCCESS_CREATED_ITEM.message
                        resultDadosClassificacao.classificacao = dadosClassificacao

                        return resultDadosClassificacao

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
const setAtualizarClassificacao = async (dadosClassificacao, contentType, id) => {

    
    try {
        
        let classificacao = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosClassificacao = {}

            //Validação para verificar campos obrigatórios e consistência de dados
            if (classificacao == ''                || classificacao == undefined            || 
                dadosClassificacao.sigla == ''     || dadosClassificacao.sigla == undefined     || dadosClassificacao.sigla.length > 2      ||
                dadosClassificacao.icone == ''     || dadosClassificacao.icone == undefined     || dadosClassificacao.icone.length > 150    ||
                dadosClassificacao.descricao == '' || dadosClassificacao.descricao == undefined || dadosClassificacao.descricao.length > 150
            ) {

                return message.ERROR_REQUIRED_FIELDS; // 400

            } else {

                //envia os dados para o DAO inserir no BD
                let classificacaoAtt = await classificacaoDAO.updateClassificacao(dadosClassificacao, classificacao);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (classificacaoAtt) {
                    
                    dadosClassificacao.id = classificacao

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosClassificacao.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosClassificacao.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosClassificacao.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosClassificacao.classificacao = dadosClassificacao

                    return resultDadosClassificacao

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
const setExcluirClassificacao = async (id) => {

    try {

        let classificacao = id

        let valClassificacao  = await getBuscarClassificacao(classificacao)

        let resultDadosClassificacao

        if (classificacao == '' || classificacao == undefined || isNaN(classificacao)) {

            return message.ERROR_INVALID_ID // 400

        } else if(valClassificacao.status == false){

            return message.ERROR_NOT_FOUND // 404

        }else {

            //Envia os dados para a model inserir no BD
            resultDadosClassificacao = await classificacaoDAO.deleteClassificacao(classificacao)

            //Valida se o BD inseriu corretamente os dados
            if (resultDadosClassificacao)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// função para listar todas as nacionalidade existentes no DBA
const getListarClassificacoes = async () => {
    let classificacaoJSON = {}

    let dadosClassificacoes = await classificacaoDAO.selectAllClassificacao()
    if (dadosClassificacoes) {
        if (dadosClassificacoes.length > 0) {
            classificacaoJSON.classificacoes = dadosClassificacoes
            classificacaoJSON.qt = dadosClassificacoes.length
            classificacaoJSON.status_code = 200
            return classificacaoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }


}

// função para buscar uma nacionalidade pelo ID
const getBuscarClassificacao = async (id) => {
    // recebe o id da GegetBuscarClassificacao
    let idClassificacao = id;
    let classificacaoJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosClassificacao = await classificacaoDAO.selectByIdClassificacao(idClassificacao)

        if (dadosClassificacao) {
            // validação para verificar se existem dados de retorno
            if (dadosClassificacao.length > 0) {
                // diva 🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺
                classificacaoJSON.classificacao = dadosClassificacao
                classificacaoJSON.status_code = 200
                return classificacaoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// função para buscar uma nacionalidade filtrando pelo nome
const getClassificacaoByNome = async (nome) => {
    let classificacoesJSON = {}

    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosClassificacao = await classificacaoDAO.selectByNome(filtro)
        if (dadosClassificacao) {
            if (dadosClassificacao.length > 0) {
                classificacoesJSON.classificacoes = dadosClassificacao
                classificacoesJSON.qt = dadosClassificacao.length
                classificacoesJSON.status_code = 200
                return classificacoesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports = {
    setNovaClassificacao,
    setAtualizarClassificacao,
    setExcluirClassificacao,
    getListarClassificacoes,
    getBuscarClassificacao,
    getClassificacaoByNome
}