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