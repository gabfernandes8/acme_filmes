/***************************************************************************************
* Objetivo: arquivo responsável pela configuração global de mensagens, valores e
*           conteúdos para o projeto
* Data: 20/02/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

/***** MENSAGENS DE ERRO *****/
const ERROR_INVALID_ID = {status: false, status_code: 400, message: "O ID encaminhado na requisição não é válido."}

const ERROR_NOT_FOUND = {status: false, status_code: 404, message: "Nenhum item encontrado na requisitação."}

const ERROR_INTERNAL_SERVER_DBA = {status: false, status_code: 500, message: "Ocoreram erros internos no servidor. Por favor, contate o administrador do sistema."}

const ERROR_INVALID_PARAM = {status: false, status_code: 400, message: "O parâmetro encaminhado não é válido."}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DBA,
    ERROR_INVALID_PARAM
}