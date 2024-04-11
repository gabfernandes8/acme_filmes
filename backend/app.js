/*****************************************************************
* Objetivo: criar uma api para responder os filmes da empresa ACME
* Data: 23/01/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
*****************************************************************/

/*****************************************************************************
 * Para realizar a conexão com o DBA precisamos utilizar uma dependência:
 *      - SEQUELIZE ORM
 *      - PRISMA    ORM
 *          Para utilizar o prisma:
 *            => npm install prisma --save
 *            => npm install @prisma/client --save
 * 
 *          Após a instalação do prisma devemos rodar o comando abaixo para
 *          inicializar o prisma:
 *            => npx prisma init
 *      - FASTFY    ORM
 *
 *****************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const funcoes = require('./controller/funcoes.js')

//index do backend
const app = express()

// cria um objeto do tipo JSON para receber os dados via body nas requisições POST ou PUT
const bodyParserJSON = bodyParser.json()

// para funcionar
app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET')
    app.use(cors)
    next()
})

/*************** IMPORTS DE ARQUIVOS E BIBLIOTECAS DO PROJETO *******************/
    const controllerFilmes = require('./controller/controller_filme.js')
    const controllerDiretores = require('./controller/controller_diretores.js')
    const controllerNacionalidade = require('./controller/controller_nacionalidade.js')
    const controllerGenero = require('./controller/controller_genero.js')
/*******************************************************************************/

/************************** ENDPOINTS DE FILMES *********************************/

// endpoints: listar os filmes da ACME
app.get('/v1/acme_filmes/filmes/', cors(), async (request, response, next) => {
    response.json(funcoes.getFilmes())
    response.status(200)
})

// endpoints: listar os dados de um filme pelo ID
app.get('/v1/acme_filmes/filmes/:id', cors(), async (request, response, next) => {
    let id = request.params.id

    if(funcoes.getIdFilmes(id)){
        response.json(funcoes.getIdFilmes(id))
        response.status(200)
    } else {
        response.json({erro: 'Não foi possível encontrar um item.'})
        response.status(404)
    }
})

app.get('/v2/acme_filmes/filmes', cors(), async(request, response, next) => {

    // chama a função para retornar os dados do filme
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})

app.get('/v2/acme_filmes/filmes/filtro', cors(), async(request, response, next) => {

    let filtro = request.query.nome
    
    // chama a função para retornar os dados do filme
    let dadosFilmes = await controllerFilmes.getFilmeByNome(filtro)

    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})

// endpoint: listar os filmes pela classificação
app.get('/v2/acme_filmes/filmes/filtro', cors(), async(request, response, next) => {

    let filtro = request.query.nome
    
    // chama a função para retornar os dados do filme
    let dadosFilmes = await controllerFilmes.getFilmeByClassificacao(filtro)

    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})

// endpoint: retorna os dados do filme, filtrando pelo ID
app.get('/v2/acme_filmes/filme/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do filme
    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

// endpoint: inserir novos filmes no Banco de Dados
    // não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
    // obs: esse objeto foi criado no início do projeto
app.post('/v2/acme_filmes/filme', cors(), bodyParserJSON, async(request, response, next) => {

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerFilmes.setNovoFilme(dadosBody, contentType)
    
    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.delete('/v2/acme_filmes/filme/:id', cors(), async(request, response, next) => {

    let filme = request.params.id

    let dadosFilme = await controllerFilmes.setExcluirFilme(filme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})

app.put('/v2/acme_filmes/filme/:id', cors(), bodyParserJSON, async(request, response, next) => {

    let filme = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerFilmes.setAtualizarFilme(dadosBody, contentType, filme)
    
    response.status(resultDados.status_code)
    response.json(resultDados)


})
/*******************************************************************************/



/************************** ENDPOINTS DE DIRETORES ******************************/

// endpoint: listar os diretores
app.get('/v2/acme_filmes/diretores', cors(), async(request, response, next) => {

    // chama a função para retornar os dados do diretor
    let dadosDiretores = await controllerDiretores.getListarDiretores()

    response.status(dadosDiretores.status_code)
    response.json(dadosDiretores)
})

// endpoint: listar o diretor filtrando pelo nome
app.get('/v2/acme_filmes/diretores/filtro', cors(), async(request, response, next) => {

    let filtro = request.query.nome
    
    // chama a função para retornar os dados do diretor
    let dadosDiretores = await controllerDiretores.getDiretorByNome(filtro)

    response.status(dadosDiretores.status_code)
    response.json(dadosDiretores)
})

// endpoint: retorna os dados do diretor, filtrando pelo ID
app.get('/v2/acme_filmes/diretor/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do diretor
    let idDiretor = request.params.id

    let dadosDiretor = await controllerDiretores.getBuscarDiretor(idDiretor)

    response.status(dadosDiretor.status_code)
    response.json(dadosDiretor)
})

// endpoint: inserir novos diretores no Banco de Dados
    // não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
    // obs: esse objeto foi criado no início do projeto
app.post('/v2/acme_filmes/diretor', cors(), bodyParserJSON, async(request, response, next) => {

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerDiretores.setNovoDiretor(dadosBody, contentType)
    
    response.status(resultDados.status_code)
    response.json(resultDados)

})

// endpoint: excluir um diretor pelo id
app.delete('/v2/acme_filmes/diretor/:id', cors(), async(request, response, next) => {

    let diretor = request.params.id

    let dadosDiretor = await controllerDiretores.setExcluirDiretor(diretor)

    response.status(dadosDiretor.status_code)
    response.json(dadosDiretor)

})

// endpoint: atualizar diretor
app.put('/v2/acme_filmes/diretor/:id', cors(), bodyParserJSON, async(request, response, next) => {

    let diretor = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerDiretores.setAtualizarDiretor(dadosBody, contentType, diretor)
    
    response.status(resultDados.status_code)
    response.json(resultDados)

})
/********************************************************************************/



/*************************** ENDPOINTS DE NACIONALIDADE  ********************************/

// endpoint: listar as nacionalidades
app.get('/v2/acme_filmes/nacionalidades', cors(), async(request, response, next) => {

    // chama a função para retornar os dados da nacionalidade
    let dadosNac = await controllerNacionalidade.getListarNacionalidades()

    response.status(dadosNac.status_code)
    response.json(dadosNac)
})

// endpoint: listar a nacionalidade filtrando pelo nome
app.get('/v2/acme_filmes/nacionalidades/filtro', cors(), async(request, response, next) => {

    let filtro = request.query.nome
    
    // chama a função para retornar os dados do diretor
    let dadosNacio = await controllerNacionalidade.getNacionalidadeByNome(filtro)

    response.status(dadosNacio.status_code)
    response.json(dadosNacio)
})

// endpoint: retorna os dados da nacionalidade, filtrando pelo ID
app.get('/v2/acme_filmes/nacionalidade/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do nacionalidade
    let idNacionalidade = request.params.id

    let dadosNac = await controllerNacionalidade.getBuscarNacionalidade(idNacionalidade)

    response.status(dadosNac.status_code)
    response.json(dadosNac)
})

// endpoint: inserir novas nacionalidades no Banco de Dados
    // não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
    // obs: esse objeto foi criado no início do projeto
app.post('/v2/acme_filmes/nacionalidade', cors(), bodyParserJSON, async(request, response, next) => {

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerNacionalidade.setNovaNacionalidade(dadosBody, contentType)
    
    response.status(resultDados.status_code)
    response.json(resultDados)

})

// endpoint: excluir uma nacionalidade pelo id
app.delete('/v2/acme_filmes/nacionalidade/:id', cors(), async(request, response, next) => {

    let nacionalidade = request.params.id

    let dadosNac = await controllerNacionalidade.setExcluirNacionalidade(nacionalidade)

    response.status(dadosNac.status_code)
    response.json(dadosNac)

})

// endpoint: atualizar nacionalidade
app.put('/v2/acme_filmes/nacionalidade/:id', cors(), bodyParserJSON, async(request, response, next) => {

    let nacionalidade = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerNacionalidade.setAtualizarNacionalidade(dadosBody, contentType, nacionalidade)
    
    response.status(resultDados.status_code)
    response.json(resultDados)


})

/********************************************************************************/


/*************************** ENDPOINTS DE SEXO  ********************************/

// endpoint: listar os sexos
app.get('/v2/acme_filmes/gender', cors(), async(request, response, next) => {

    // chama a função para retornar os dados do genero
    let dadosGender = await controllerGenero.getListarGenders()

    response.status(dadosGender.status_code)
    response.json(dadosGender)
})

// endpoint: listar o genero filtrando pelo nome
app.get('/v2/acme_filmes/genders/filtro', cors(), async(request, response, next) => {

    let filtro = request.query.nome
    
    // chama a função para retornar os dados do diretor
    let dadosGenero = await controllerGenero.getGenderByNome(filtro)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

// endpoint: retorna os dados do gender, filtrando pelo ID
app.get('/v2/acme_filmes/gender/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do gender
    let idGender = request.params.id

    let dadosGender = await controllerGenero.getBuscarGender(idGender)

    response.status(dadosGender.status_code)
    response.json(dadosGender)
})

// endpoint: inserir novos genertos no Banco de Dados
    // não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
    // obs: esse objeto foi criado no início do projeto
app.post('/v2/acme_filmes/gender', cors(), bodyParserJSON, async(request, response, next) => {

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerGenero.setNovoGender(dadosBody, contentType)
    
    response.status(resultDados.status_code)
    response.json(resultDados)

})

// endpoint: excluir um genero pelo id
app.delete('/v2/acme_filmes/gender/:id', cors(), async(request, response, next) => {

    let gender = request.params.id

    let dadosGender = await controllerGenero.setExcluirGender(gender)

    response.status(dadosGender.status_code)
    response.json(dadosGender)

})

// endpoint: atualizar genero
app.put('/v2/acme_filmes/gender/:id', cors(), bodyParserJSON, async(request, response, next) => {

    let gender = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerGenero.setAtualizarGender(dadosBody, contentType, gender)
    
    response.status(resultDados.status_code)
    response.json(resultDados)


})

/*******************************************************************************/



/*************************** ENDPOINTS DE GENERO  ********************************/

// endpoint: listar os generos
app.get('/v2/acme_filmes/genero', cors(), async(request, response, next) => {

    // chama a função para retornar os dados do genero
    let dadosGeneros = await controllerGenero.getListarGeneros()

    response.status(dadosGeneros.status_code)
    response.json(dadosGeneros)
})

// endpoint: listar o genero filtrando pelo nome
app.get('/v2/acme_filmes/genero/filtro', cors(), async(request, response, next) => {

    let filtro = request.query.nome
    
    // chama a função para retornar os dados do diretor
    let dadosGenero = await controllerGenero.getGeneroByNome(filtro)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

// endpoint: retorna os dados do genero, filtrando pelo ID
app.get('/v2/acme_filmes/genero/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do gender
    let idGenero = request.params.id

    let dadosGenero = await controllerGenero.getBuscarGenero(idGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

// endpoint: inserir novos genertos no Banco de Dados
    // não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
    // obs: esse objeto foi criado no início do projeto
app.post('/v2/acme_filmes/genero', cors(), bodyParserJSON, async(request, response, next) => {

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerGenero.setNovoGenero(dadosBody, contentType)
    
    response.status(resultDados.status_code)
    response.json(resultDados)

})

// endpoint: excluir um genero pelo id
app.delete('/v2/acme_filmes/genero/:id', cors(), async(request, response, next) => {

    let genero = request.params.id

    let dadosGenero = await controllerGenero.setExcluirGenero(genero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)

})

// endpoint: atualizar genero
app.put('/v2/acme_filmes/genero/:id', cors(), bodyParserJSON, async(request, response, next) => {

    let genero = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerGenero.setAtualizarGenero(dadosBody, contentType, genero)
    
    response.status(resultDados.status_code)
    response.json(resultDados)


})

/*******************************************************************************/

app.listen(8080, () => {})