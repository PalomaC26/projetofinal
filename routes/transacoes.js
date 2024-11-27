const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador 
const transactionsController = require('../controllers/transactionsController'); // Importa o controlador de transações 

// Definindo uma rota para obter todas as transações 
router.get('/', transacoesController.getAllTransac);





// Exportando o roteador 
module.exports = router; 