// Função para adicionar um produto ao carrinho e atualizar valores
function adicionarProdutoAoCarrinho(event) {
    // Seleciona o botão clicado
    const botaoClicado = event.target;

    // Seleciona o container do produto que contém as informações do produto
    const containerProduto = botaoClicado.closest('.product');

    // Extrai as informações do produto a partir do container
    const tituloProduto = containerProduto.querySelector('.product-title').textContent;
    const precoProduto = containerProduto.querySelector('.product-price').textContent;
    const imagemProduto = containerProduto.querySelector('.product-image').src;

    // Seleciona a tabela do carrinho
    const tabelaCarrinho = document.querySelector('.cart-table tbody');

    // Verifica se o produto já está no carrinho
    const produtoExistente = tabelaCarrinho.querySelector(`.cart-product .cart-product-image[src="${imagemProduto}"]`);

    if (produtoExistente) {
        // Se o produto já estiver no carrinho, aumenta a quantidade no input correspondente
        const inputQuantidade = produtoExistente.closest('.cart-product').querySelector('.product-qnt-input');
        inputQuantidade.value = parseInt(inputQuantidade.value) + 1;
    } else {
        // Caso contrário, cria uma nova linha para o produto no carrinho
        const novaLinhaProduto = document.createElement('tr');
        novaLinhaProduto.classList.add('cart-product');
        novaLinhaProduto.innerHTML = `
            <td class="product-identification">
                <img class="cart-product-image" src="${imagemProduto}" alt="${tituloProduto}">
                <strong class="cart-product-title">${tituloProduto}</strong>
            </td>
            <td><span class="cart-product-price">${precoProduto}</span></td>
            <td>
                <input class="product-qnt-input" type="number" value="1" min="1">
                <button class="remove-product-button" type="button">Remover</button>
            </td>
        `;

        // Adiciona a nova linha ao final da tabela do carrinho
        tabelaCarrinho.appendChild(novaLinhaProduto);
    }

    // Seleciona todos os inputs de quantidade no carrinho
    const inputsQuantidade = document.querySelectorAll('.product-qnt-input');

    // Adiciona evento de mudança de quantidade para os inputs
    inputsQuantidade.forEach(input => {
        input.addEventListener('change', updateCartTotal);
    });

    // Seleciona todos os botões de remoção no carrinho
    const botoesRemover = document.querySelectorAll('.remove-product-button');

    // Adiciona evento de clique para os botões de remoção
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', () => {
            // Seleciona a linha do produto a ser removido
           botoesRemover.forEach = botao.closest('.cart-product');
            // Remove a linha do produto do carrinho
            linhaProduto.remove();
            // Chama a função para atualizar o valor total do carrinho
            updateCartTotal();
        });
    });

    // Chama a função para atualizar o valor total do carrinho
    updateCartTotal();
}

// Função para finalizar a compra
function finalizarCompra() {
    // Seleciona o elemento que mostra o valor total do carrinho
    const cartTotalElement = document.querySelector(".cart-total-container span");

    // Obtém o valor total do carrinho
    const cartTotal = parseFloat(cartTotalElement.textContent.replace("R$ ", ""));

    // Exibe o alerta com a mensagem e o valor da compra
    alert(`Compra realizada com sucesso :) Preencha o Formulario abaixo para participar do nosso Mini curso de Artesanto !!\nValor total da compra: R$ ${cartTotal.toFixed(2)}`);

    // Seleciona a tabela do carrinho
    const tabelaCarrinho = document.querySelector('.cart-table tbody');

    // Remove todos os itens do carrinho (linhas da tabela)
    tabelaCarrinho.innerHTML = '';

    // Atualiza o valor total do carrinho para zero
    cartTotalElement.textContent = 'R$ 0.00';
}

// Seleciona o botão "Finalizar Compra" e associa a função finalizarCompra ao evento de clique
const botaoFinalizarCompra = document.querySelector('.purchase-button');
botaoFinalizarCompra.addEventListener('click', finalizarCompra);


// Função para atualizar o valor total do carrinho
function updateCartTotal() {
    // Seleciona o elemento que mostra o valor total do carrinho
    const cartTotalElement = document.querySelector(".cart-total-container span");

    // Inicializa o valor total do carrinho
    let cartTotal = 0;

    // Seleciona todos os produtos no carrinho
    const cartProducts = document.querySelectorAll(".cart-product");

    // Itera sobre cada produto no carrinho
    cartProducts.forEach((product) => {
        // Seleciona o elemento que mostra o preço do produto
        const priceElement = product.querySelector(".cart-product-price");
        // Seleciona o input de quantidade do produto
        const quantityInput = product.querySelector(".product-qnt-input");
        // Extrai o preço e a quantidade do produto
        const price = parseFloat(priceElement.textContent.replace("R$ ", ""));
        const quantity = parseInt(quantityInput.value);
        // Calcula o subtotal do produto e adiciona ao valor total do carrinho
        cartTotal += price * quantity;
    });

    // Atualiza o valor total do carrinho no elemento HTML
    cartTotalElement.textContent = "R$ " + cartTotal.toFixed(2);
}

// Este evento é acionado quando o DOM está completamente carregado
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona todos os botões "Adicionar ao Carrinho" e adiciona um evento de clique a cada um
    const botoesAdicionarAoCarrinho = document.querySelectorAll('.button-hover');
    botoesAdicionarAoCarrinho.forEach(botao => {
        botao.addEventListener('click', adicionarProdutoAoCarrinho);
    });

    // Seleciona todos os botões de remoção de produtos
    const removeButtons = document.querySelectorAll(".remove-product-button");
    // Seleciona todos os inputs de quantidade de produtos
    const quantityInputs = document.querySelectorAll(".product-qnt-input");

    // Adiciona evento de clique para os botões de remoção de produtos
    removeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Seleciona a linha do produto a ser removido
            const productRow = this.parentElement.parentElement;
            // Remove a linha do produto do carrinho
            productRow.remove();
            // Chama a função para atualizar o valor total do carrinho
            updateCartTotal();
        });
    });

    // Adiciona evento de mudança de quantidade para os inputs
    quantityInputs.forEach((input) => {
        input.addEventListener("change", updateCartTotal);
    });

    // Chama a função para atualizar o valor total inicialmente
    updateCartTotal();
});

//-------------------------------------------------------------------------botao para voltar ao topo-----------------------------------------//

// Código JavaScript para rolar a página para o topo

// Seleciona o botão
const botaoVoltarAoTopo = document.getElementById('voltarAoTopo');

// Adiciona um evento de clique ao botão
botaoVoltarAoTopo.addEventListener('click', () => {
  // Faz a página voltar ao topo
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Adiciona um evento de rolagem à janela
window.addEventListener('scroll', () => {
  // Verifica a posição da rolagem
  if (window.scrollY > 100) { // Exibe o botão quando a página é rolada para baixo
      botaoVoltarAoTopo.style.display = 'block';
  } else { // Oculta o botão quando a página está no topo
      botaoVoltarAoTopo.style.display = 'none';
  }
});

//-----------------------------------------------------------------botao pra descer---------------------------------------//

const botaoIrParaBaixo = document.getElementById('irParaBaixo');

// Adiciona um evento de rolar ao clique no botão
botaoIrParaBaixo.addEventListener('click', () => {
  // Faz a página rolar para baixo até o final
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

// Adiciona um evento de rolagem à janela
window.addEventListener('scroll', () => {
  // Verifica a posição da rolagem
  if (window.scrollY < document.body.scrollHeight - window.innerHeight - 100) { 
    // Exibe o botão quando a página não está no final
    botaoIrParaBaixo.style.display = 'block';
  } else {
    // Oculta o botão quando a página está quase no final
    botaoIrParaBaixo.style.display = 'none';
  }
});

//--------------------------------login-------------------------------
 // Função para mostrar o modal de login
function mostrarModal() {
    document.getElementById('login-modal').style.display = 'block';
}

// Função para fechar o modal de login
function fecharModal() {
    document.getElementById('login-modal').style.display = 'none';
}

// Função para realizar o login (exemplo simples)
function fazerLogin() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    // Simulação de validação de login
    if (nome === "" || email === "" || senha === "") {
        document.getElementById('login-error').textContent = "Preencha todos os campos!";
    } else {
        // Aqui você pode adicionar lógica para enviar os dados para o servidor ou validar
        alert("Login realizado com sucesso!");
        fecharModal(); // Fecha o modal após o login (simulado)
    }
}


//----------------------------contato--------------------------//
// Mostrar o modal de contato
// Obter o modal
var modal = document.getElementById("modal-contato");

// Obter o botão que abre o modal
var btn = document.getElementById("btn-contato");

// Obter o botão de fechar
var span = document.getElementById("fechar-modal");

// Quando o usuário clicar no botão, abrir o modal
btn.onclick = function() {
    modal.style.display = "block";
}

// Quando o usuário clicar no botão de fechar, fechar o modal
span.onclick = function() {
    modal.style.display = "none";
}

// Quando o usuário clicar fora do modal, fechá-lo
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//----------------------------------------------------------------------------------//

// Função para mostrar o modal de cadastro
function mostrarModalCadastro() {
    document.getElementById('cadastro-modal').style.display = 'block';
}

// Função para fechar o modal de cadastro
function fecharModalCadastro() {
    document.getElementById('cadastro-modal').style.display = 'none';
}

// Função para processar o cadastro (exemplo simples)
function fazerCadastro() {
    var nome = document.getElementById('nome-cadastro').value;
    var email = document.getElementById('email-cadastro').value;
    var senha = document.getElementById('senha-cadastro').value;
    var confirmarSenha = document.getElementById('confirmar-senha').value;

    if (senha !== confirmarSenha) {
        document.getElementById('cadastro-error').textContent = 'As senhas não coincidem.';
        return;
    }

    // Aqui você pode adicionar lógica para enviar os dados para o servidor, validar, etc.
    alert('Cadastro realizado com sucesso!\n' + 'Nome: ' + nome + '\nEmail: ' + email);
    fecharModalCadastro(); // Fechar o modal após o cadastro
}




//Script para validação e simulação de envio do formulário
const form = document.getElementById('formInscricao');
const message = document.getElementById('message');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    if (!nome || !email || !telefone) {
        message.textContent = "Por favor, preencha todos os campos!";
        message.style.color = "red";
    } else {
        message.textContent = "Inscrição enviada com sucesso! Obrigado por se inscrever.";
        message.style.color = "green";

        // Limpa os campos após a inscrição
        form.reset();
    }
});