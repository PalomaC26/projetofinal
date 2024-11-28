const db = require('../config/db'); // Importa a conexão com o banco de dados 

// Função para obter todas as transações 
const getAllTransacoes = (req, res) => { 
db.query('SELECT * FROM transacoes', (err, results) => { 
if (err) { 
console.error('Erro ao obter transações:', err); 
res.status(500).send('Erro ao obter transações'); 
return; 
} 
res.json(results); 
}); 
}; 

// Função para adicionar uma nova transação 
const addTransacoes = (req, res) => { 
    const { id_usuario, data_transacao, tipo_transacao, valor, descricao, status } = req.body; 
    db.query( 
      'INSERT INTO transacoes (id_usuario, data_transacao, tipo_transacao, valor, descricao, status) VALUES (?, ?, ?, ?, ?, ?)', 
      [id_usuario, data_transacao, tipo_transacao, valor, descricao, status], 
      (err, results) => { 
        if (err) { 
          console.error('Erro ao adicionar transação:', err); 
          res.status(500).send('Erro ao adicionar transação'); 
          return; 
        } 
        res.status(201).send('Transação adicionada com sucesso'); 
      } 
    ); 
  }; 
  

///Função para atualizar uma locação existente (substituição completa)
const updateTransacoesPut = (req, res) => {
    const{id} = req.params;
    const {id_usuario, data_transacao, tipo_transacao, valor, descricao, status} = req.body;
    db.query(
    'UPDATE transacoes SET id_usuario=?, data_transacao=?, tipo_transacao=?, valor=?, descricao=?, status=?, WHERE id=?',
      
     [id_usuario, data_transacao, tipo_transacao, valor, descricao, status,  id],
    (err, results) => {
        if(err) {
            console.error('Erro ao atualizar Transacao :( ', err);
            res.status(500).send('Erro ao atualizar Transacao :(');
         return;
        }
        if(results.affectedRows===0){
          res.status(404).send('Transacao não encontrada :(');
          return;
        }
     res.send('Transacao atualizada com sucesso :) !!');
    }
    );
    };
    

  // Função para atualizar uma transação existente (atualização parcial) 
const updateTransacoesPatch = (req, res) => { 
    const { id } = req.params; 
    const fields = req.body; 
    const query = []; 
    const values = []; 
   
    for (const [key, value] of Object.entries(fields)) { 
      query.push(`${key} = ?`); 
      values.push(value); 
    } 
   
    values.push(id); 
   
    db.query( 
      `UPDATE transacoes SET ${query.join(', ')} WHERE id = ?`, 
      values, 
      (err, results) => { 
        if (err) { 
          console.error('Erro ao atualizar transação:', err); 
          res.status(500).send('Erro ao atualizar transação'); 
          return; 
        } 
        res.send('Transação atualizada com sucesso'); 
      } 
    ); 
  };



module.exports = { 
getAllTransacoes,
addTransacoes,
updateTransacoesPut,
updateTransacoesPatch
};