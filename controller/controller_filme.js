/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
* as tratativas e a regra de negócio para o CRUD de filmes
* Data: 30/01/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const filmesDAO = require('../model/DAO/filme.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// função para inserir um novo filme no DBA
const setNovoFilme = async (dadosFilme, contentType) => {

    if (String(contentType).toLowerCase() == 'application/json'){

        // cria a variável JSON
        let resultDadosFilme = {}
    
        //Validação para verificar campos obrigatórios e conistência de dados
        if (dadosFilme.nome == ''            || dadosFilme.nome == undefined            || dadosFilme.nome.length > 80 ||
            dadosFilme.sinopse == ''         || dadosFilme.sinopse == undefined         || dadosFilme.sinopse.length > 65535 ||
            dadosFilme.duracao == ''         || dadosFilme.duracao == undefined         || dadosFilme.duracao.length > 18 ||
            dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length > 10 ||
            dadosFilme.foto_capa == ''       || dadosFilme.foto_capa == undefined       || dadosFilme.foto_capa.length > 200 ||
            dadosFilme.valor_unitario.length > 200
        ) {
    
            return message.ERROR_REQUIRED_FIELDS; // 400
    
        } else {
    
            // variável para lidar se poderemos chamar o DAO para inserir os dados
            let dadosValitaded = false
    
            
            // validação de digitação  para data de relançamento que não é um campo obrigatório
            if (dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != undefined) {
                
                
                if (dadosFilme.data_relancamento.length != 10) {
                    
                    return message.ERROR_REQUIRED_FIELDS
                    
                } else {
                    dadosValitaded = true
                }
                
            } else {
                dadosValitaded = true
            }
            
            if (dadosValitaded) {
                
                //envia os dados para o DAO inserir no BD
                let novoFilme = await filmesDAO.insertFilme(dadosFilme);
    
                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (novoFilme) {
    
                    let id = await filmesDAO.selectLastId()
    
                    dadosFilme.id = Number(id[0].id)
    
                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosFilme.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosFilme.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosFilme.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosFilme.filme = dadosFilme
    
                    return resultDadosFilme
    
                } else {
    
                    return message.ERROR_INTERNAL_SERVER_DBA; // 500
    
                }
    
            }
    
        }

    } else {
        return message.ERROR_CONTENT_TYPE //415
    }

}

//função para atualizar um filme existente
const setAtualizarFilme = async () => { }

// função para excluir um filme existente
const setExcluirFilme = async () => { }

// função para listar todos os filmes existentes no DBA
const getListarFilmes = async () => {
    let filmesJSON = {}

    let dadosFilmes = await filmesDAO.selectAllFilmes()

    if (dadosFilmes) {
        if (dadosFilmes.length > 0) {
            filmesJSON.filmes = dadosFilmes
            filmesJSON.qt = dadosFilmes.length
            filmesJSON.status_code = 200
            return filmesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }


}

// função para buscar um filme pelo ID
const getBuscarFilme = async (id) => {
    // recebe o id do filme
    let idFilme = id;
    let filmeJSON = {}

    // validação para ID vazio, indefinido ou não numérico
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)

        if (dadosFilme) {
            // validação para verificar se existem dados de retorno
            if (dadosFilme.length > 0) {
                // diva 🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺
                filmeJSON.filmes = dadosFilme
                filmeJSON.status_code = 200
                return filmeJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// função para buscar um filme filtrando pelo nome
const getFilmeByNome = async (nome) => {
    let filmesJSON = {}

    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosFilmes = await filmesDAO.selectByNome(filtro)
        if (dadosFilmes) {
            if (dadosFilmes.length > 0) {
                filmesJSON.filmes = dadosFilmes
                filmesJSON.qt = dadosFilmes.length
                filmesJSON.status_code = 200
                console.log('to aqui 2')
                return filmesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports = {
    setNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getFilmeByNome
}