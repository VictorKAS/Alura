import api from "./api.js"

const ui = {
    async redenderizarPensamentos() {
       const listaPensamentos = document.getElementById('lista-pensamentos')

       try {
        const pensamentos = await api.buscarPensamentos()
        // Lógica para renderizar os pensamentos
        pensamentos.forEach(pensamento => {
            listaPensamentos.innerHTML += ` 
            <li class="li-pensamento" data-id="${pensamento.id}">
            <img src="assets/imagens/aspas-azuis.png" alt="Aspas azuis" class="icone-aspas">
            <div class="pensamento-conteudo">${pensamento.conteudo}</div>
            <div class="pensamento-autoria">${pensamento.autoria}</div>
            </li>
            `
        })
       }
       catch {
        alert('Não foi possível renderizar os pensamentos, tente novamente mais tarde.')
        throw error
       }
    }
}

export default ui;