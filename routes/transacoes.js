const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador 
const transacoesController = require('../controllers/transacoesController'); // Importa o controlador de transações 
const authMiddleware = require('../middleware/authMiddleware'); // Importa o middleware de autenticação 

// Definindo uma rota para obter todas as transações 
router.get('/', authMiddleware, transacoesController.getAllTransacoes);

// Definindo uma rota para adicionar uma nova transação 
router.post('/',authMiddleware,  transacoesController.addTransacoes); 

// Definindo uma rota para atualizar uma transação existente (substituição completa) 
router.put('/:id', authMiddleware, transacoesController.updateTransacoesPut); 

// Definindo uma rota para atualizar uma transação existente (atualização parcial) 
router.patch('/:id', authMiddleware, transacoesController.updateTransacoesPatch);


// Definindo uma rota para deletar uma transação existente 
router.delete('/:id', authMiddleware, transacoesController.deleteTransacoes);

// Exportando o roteador 
module.exports = router; 