
const inputItem = document.getElementById("input-item")

const botaoAdicionar = document.getElementById("adicionar-item")
const listaDeCompras = document.getElementById("lista-de-compras");
let contador = 0;

botaoAdicionar.addEventListener("click", (evento) => {
    evento.preventDefault();
    if (inputItem.value === "") {
        alert("Por favor, insira um item!")
        return
    }

    const itemDaLista = document.createElement("li");
    const containerItemDaLista = document.createElement("div");
    containerItemDaLista.classList.add("lista-item-container");
    const inputCheckbox = document.createElement("input")
    inputCheckbox.type = "checkbox";
    inputCheckbox.id = "checkbox-" + contador++;
    const nomeItem = document.createElement("p");
    nomeItem.innerText = inputItem.value;

    inputCheckbox.addEventListener('click', function() {
        if (inputCheckbox.checked) {
            nomeItem.style.textDecoration = "line-through";
        }
        else { 
            nomeItem.style.textDecoration = "none";
        }}
    );        
    const diaDaSemana = new Date().toLocaleDateString("pt-BR", 
        { weekday: 'long'}
    );
    const hora = new Date().toLocaleTimeString("pt-BR", 
        { hour: '2-digit', minute: '2-digit' });
    const data = new Date().toLocaleDateString("pt-BR")
    const dataCompleta = `${diaDaSemana} (${data}) às ${hora}`;
    const dataItem = document.createElement("p");
    dataItem.innerText = dataCompleta;
    dataItem.classList.add("texto-data");

    containerItemDaLista.appendChild(inputCheckbox);
    containerItemDaLista.appendChild(nomeItem);
    itemDaLista.appendChild(containerItemDaLista);
    itemDaLista.appendChild(dataItem);
    listaDeCompras.appendChild(itemDaLista);
    
    VerificaListaVazia();
}) 

const mensagemListaVazia = document.querySelector(".mensagem-lista-vazia");

function VerificaListaVazia() {
    const itemDaLista = listaDeCompras.querySelectorAll("li");
    // Verifica se a lista está vazia
    
    if (itemDaLista.length === 0) {
        mensagemListaVazia.style.display = "block";
    } else {
        mensagemListaVazia.style.display = "none";
    }
}

VerificaListaVazia();