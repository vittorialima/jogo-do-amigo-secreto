let listaDeAmigos = []; // [] é Array e serve para armazenar os dados

// Função para adicionar amigos à lista
function adicionarAmigo() {
    const campoNome = document.getElementById('amigo'); // Pega o valor do campo de input
    const nome = campoNome.value.trim(); // Remove espaços em branco do nome

    // Verifica se o nome não está vazio e se ainda não foi adicionado
    if (nome && !listaDeAmigos.includes(nome)) {
        listaDeAmigos.push(nome); // Adiciona o nome à lista
        const listItem = document.createElement('li'); // Cria um item de lista
        listItem.textContent = nome; // Define o texto do item com o nome
        document.getElementById('listaAmigos').appendChild(listItem); // appendchield adiciona o item à lista visível na página
        campoNome.value = ''; // Limpa o campo de input
    } else if (listaDeAmigos.includes(nome)) {
        alert('Este nome já foi adicionado!');
    } else {
        alert('Por favor, insira um nome válido!');
    }
}

// Função para sortear o amigo secreto
function sortearAmigo() {
    if (listaDeAmigos.length < 2) { // Verifica se há pelo menos 2 amigos para sortear
        alert('São necessárias pelo menos duas pessoas para realizar o amigo secrego!');
        return;
    }

    let amigosSecretos = [...listaDeAmigos]; // Cria uma cópia da lista de amigos
    const resultado = {}; // Objeto para armazenar o resultado do sorteio

    // Embaralha a lista de amigos
    amigosSecretos = amigosSecretos.sort(() => Math.random() - 0.5);

    // Garante que ninguém tire seu próprio nome
    for (let i = 0; i < listaDeAmigos.length; i++) {
        if (amigosSecretos[i] === listaDeAmigos[i]) {
            // Se alguém tirar seu próprio nome, troca com o próximo da lista
            if (i === listaDeAmigos.length - 1) {
                [amigosSecretos[i], amigosSecretos[0]] = [amigosSecretos[0], amigosSecretos[i]];
            } else {
                [amigosSecretos[i], amigosSecretos[i + 1]] = [amigosSecretos[i + 1], amigosSecretos[i]];
            }
        }
    }

    // Preenche o resultado com o sorteio
    for (let i = 0; i < listaDeAmigos.length; i++) {
        resultado[listaDeAmigos[i]] = amigosSecretos[i];
    }

    // Exibe o resultado do sorteio
    exibirResultado(resultado);
}

// Função para exibir o resultado do sorteio
function exibirResultado(resultado) {
    const listaResultado = document.getElementById('resultado');
    listaResultado.innerHTML = ''; // Limpa o conteúdo anterior

    // Exibe os resultados
    for (const [amigo, amigoSorteado] of Object.entries(resultado)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${amigo} vai presentear ${amigoSorteado}`;
        listaResultado.appendChild(listItem);
    }

    // Exibe uma mensagem informando que o sorteio foi realizado
    alert("O sorteio foi realizado com sucesso! Confira abaixo.");
}