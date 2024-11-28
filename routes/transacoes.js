const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador 
const transacoesController = require('../controllers/transacoesController'); // Importa o controlador de transações 

// Definindo uma rota para obter todas as transações 
router.get('/', transacoesController.getAllTransacoes);

// Definindo uma rota para adicionar uma nova transação 
router.post('/', transacoesController.addTransacoes); 

// Definindo uma rota para atualizar uma transação existente (substituição completa) 
router.put('/:id', transacoesController.updateTransacoesPut); 

// Definindo uma rota para atualizar uma transação existente (atualização parcial) 
router.patch('/:id', transacoesController.updateTransacoesPatch); 

// Exportando o roteador 
module.exports = router; 