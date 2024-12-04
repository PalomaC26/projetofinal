// definir a URL base do projeto

const projeto_URL = 'HTTP://localhost:3000/projetofinal';

//função assincrona pa fazer login do usuario
//receber o "email" e "senha" como parametro

async function login(email, senha){
    try {
//exibe no console os dados de login que serão enviados oa servidor//

console.log('enviando dados para login:',{email, senha})};

//enviar uma requisicao POST ao projeto na rota '/auth/login'.a
const response = await fectch(`${projeto_URL}/auth/login`,
    method:'POST',
    Headers:{
        'content-type': 'application/json'
    },
    body:JSON.stringify({email, senha})
) 
};

    
