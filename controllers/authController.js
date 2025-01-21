const crypto = require('crypto');
const db = require('../config/db'); // Importa a configuração do banco de dados 
const bcrypt = require('bcrypt'); // Importa o bcrypt para criptografar senhas 
const jwt = require('jsonwebtoken'); // Importa o jsonwebtoken para gerar tokens JWT 
const sendEmail = require('../services/emailService').sendEmail; // Função para solicitar redefinição de senha 

 
// Função para registrar um novo usuário 
const registerUsuarios = async (req, res) => { 
  const { nome, email, senha} = req.body; // Desestrutura os dados do corpo da requisição 
 
 // Verificar se o usuário já existe no banco de dados 
  try { 
    const [existingUsuarios] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]); 
    if (existingUsuarios.length > 0) { 
      return res.status(400).send('Usuário já registrado '); 
    } 
 
    // Criptografar a senha usando bcrypt 
    const hashedPassword = await bcrypt.hash(senha, 10); 
 
    // Inserir o novo usuário no banco de dados 
    await db.promise().query( 
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', 
      [nome, email, hashedPassword, senha] 
    ); 
 
    res.status(201).send('Usuário registrado com sucesso :)'); 
  } catch (err) { 
    console.error('Erro ao registrar usuário :(', err); 
    res.status(500).send('Erro ao registrar usuário :('); 
  } 
}; 


// Função para autenticar um usuário

const loginUsuarios = async (req, res) => { 
  const { email, senha } = req.body; // Desestrutura os dados do corpo da requisição 
 
 // Verificar se o usuário existe no banco de dados 
 
  try { 
    const [usuarios] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]); 
    if (usuarios.length === 0) { 
      return res.status(400).send('Credenciais inválidas :('); 
    } 
 
    // Comparar a senha fornecida com a senha criptografada no banco de dados 
    const isMatch = await bcrypt.compare(senha, usuarios[0].senha); 
    if (!isMatch) { 
      return res.status(400).send('Credenciais inválidas :('); 
    } 


    // Gerar um token JWT 
    const token = jwt.sign({ usuariosId: usuarios[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
 
    res.json({ token }); 
  } catch (err) { 
    console.error('Erro ao autenticar usuário :(', err); 
    res.status(500).send('Erro ao autenticar usuário :('); 
  } 
}; 


//Função para solicitar redefinição de senha

const requestSenhaReset = async (req, res) => { 
    const { email } = req.body; 
   
    try { 
      const [usuarios] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]); 
   
      if (usuarios.length === 0) { 
        return res.status(404).send('Usuário não encontrado'); 
      } 
   
      const token = crypto.randomBytes(20).toString('hex'); // Gera um token aleatório
      const expireDate = new Date(Date.now() + 3600000); // 1 hora para expiração

      await db.promise().query('UPDATE usuarios SET reset_senha_token = ?, reset_senha_expires = ? WHERE email = ?', [token, expireDate, email]); 
   
      const resetLink = `http://localhost:3000/reset-senha/${token}`; // Link para redefinição de senha 
      sendEmail(email, 'Recuperação de Senha', `Por favor, clique no link para redefinir sua senha: ${resetLink}`); 
   
      res.send('E-mail de recuperação de senha enviado'); 
    } catch (err) { 
      console.error('Erro ao solicitar redefinição de senha:', err); 
      res.status(500).send('Erro ao solicitar redefinição de senha'); 
    } 
  }; 


  // Função para redefinir a senha 
  const resetSenha = async (req, res) => { 
    const { token, novaSenha } = req.body; 
   
    try { 
      const [usuarios] = await db.promise().query('SELECT * FROM usuarios WHERE reset_senha_token = ? AND reset_senha_expires > NOW()', [token]); 
   
      if (usuarios.length === 0) { 
        return res.status(400).send('Token inválido ou expirado'); 
      } 
   
      const hashedsenha = await bcrypt.hash(novaSenha, 10); // Criptografa a nova senha 
   
       await db.promise().query('UPDATE usuarios SET senha = ?, reset_senha_token = NULL, reset_senha_expires = NULL WHERE id = ?', [hashedsenha, usuarios[0].id]);

      res.send('Senha redefinida com sucesso :)'); 
    } catch (err) { 
      console.error('Erro ao redefinir senha:', err); 
      res.status(500).send('Erro ao redefinir senha'); 
    } 
  }; 


  
   // Função para registrar um novo usuário 
const inscricoes = async (req, res) => { 
  const { nome, email, telefone, data_inscricao} = req.body; // Desestrutura os dados do corpo da requisição 
 
 // Verificar se o usuário já existe no banco de dados 
  try { 
    const [existingIncricoes] = await db.promise().query('SELECT * FROM inscricoes WHERE email = ?', [email]); 
    if (existingIncricoes.length > 0) { 
      return res.status(400).send('inscricao já registrada '); 
    } 
 
    // Criptografar a senha usando bcrypt 
    //const hashedPassword = await bcrypt.hash(senha, 10); 
 
    // Inserir o novo usuário no banco de dados 
    await db.promise().query( 
      'INSERT INTO inscricoes (nome, email, telefone, data_inscricao) VALUES (?, ?, ?,?)', 
      [nome, email, telefone, data_inscricao] 
    ); 
 
    res.status(201).send('incricao registrada com sucesso :)'); 
  } catch (err) { 
    console.error('Erro ao registrar inscricao :(', err); 
    res.status(500).send('Erro ao registrar inscricao :('); 
  } 
}; 


  
   
 
module.exports = { 
  registerUsuarios, 
  loginUsuarios,
  requestSenhaReset,
  resetSenha,
  inscricoes
};