const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador 
const authController = require('../controllers/authController'); // Importa o controlador de autenticação 

// Rota para registro de usuário 
router.post('/register', authController.registerUsuarios); 
// Rota para login de usuário 
router.post('/login', authController.loginUsuarios);

// Rota para solicitar redefinição de senha 
router.post('/request-senha-reset', authController.requestSenhaReset);

// Rota para redefinir a senha 
router.post('/reset-senha', authController.resetSenha);

module.exports = router; // Exporta o roteador