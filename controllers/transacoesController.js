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
    const {data, descricao, valor, conta, status } = req.body; 
    db.query( 
      'INSERT INTO transacoes (data, descricao, valor, conta, status) VALUES (?, ?, ?, ?, ? )', 
      [ data, descricao, valor, conta, status], 
      (err, results) => { 
        if (err) { 
          console.error('Erro ao adicionar transação :( ', err); 
          res.status(500).send('Erro ao adicionar transação :('); 
          return; 
        } 
        if(results.length>0){
          //se a transação já existe
          res.status(400).send('Transação duplicada')
        }
  

  // Se a transação não existe, insira-a no banco de dados 
    db.query(
      'INSERT INTO transacoes (data, descricao, valor, conta, status) VALUES (?, ?, ?, ?, ? )', 
      [ data, descricao, valor, conta, status], 
        (err,results) => {
            if(err) {
                console.error('Erro ao adicionar transação', err);
                res.status(500).send('Erro ao adicionar transação');
                return;
            }          
            res.status(201).send('Transação adicionada com sucesso');
        }

    );
  }
);
};


  

//Função para atualizar uma locação existente (substituição completa)
const updateTransacoesPut = (req, res) => {
    const{id} = req.params;
    const { data, descricao, valor, conta, status} = req.body;
    db.query(
    'UPDATE transacoes SET data=?, descricao=?, valor=?, conta=?, status=? WHERE id=?',
      
     [ data, descricao, valor, conta, status, id],
    (err, results) => {
        if(err) {
          console.error('Erro ao atualizar transação :( ', err); 
          res.status(500).send('Erro ao atualizar transação :('); 
          return; 
        } 
         // verifica se nenhuma linha foi afetada pela consulta
  if(results.affectedRows===0){
    res.status(404).send('Transação não encontrada');
    return;
  }
  
  res.send('Transação atualizada com sucesso');
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
          console.error('Erro ao atualizar transação :(', err); 
          res.status(500).send('Erro ao atualizar transação :('); 
          return; 
        } 
       // verifica se nenhuma linha foi afetada pela consulta
if(results.affectedRows===0){
  res.status(404).send('Transação não encontrada');
  return;
}

  res.send('Transação atualizada com sucesso');
}
);
};

//Função para deletar uma transação existente

const deleteTransacoes = (req,res) => {
  const{id} = req.params;
  db.query('DELETE FROM transacoes WHERE id = ?',[id],
    (err,results) => {
      if(err) {
          console.error('Erro ao deletar transação', err);
          res.status(500).send('Erro ao deletar transação');
      return;
    }
  
    // verifica se nenhuma linha foi afetada pela consulta
    if(results.affectedRows===0){
      res.status(404).send('Transação não encontrada');
      return;
    }
    
    res.send('Transação deletada com sucesso');
  }
  );
  };





module.exports = { 
getAllTransacoes,
addTransacoes,
updateTransacoesPut,
updateTransacoesPatch,
deleteTransacoes
};