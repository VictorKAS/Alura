import api from "./api.js"

const ui = {

    async preencherFormulario(pensamentoid) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoid)
        document.getElementById('pensamento-id').value = pensamento.id
        document.getElementById('pensamento-conteudo').value = pensamento.conteudo
        document.getElementById('pensamento-autoria').value = pensamento.autoria
    },

    async redenderizarPensamentos() {
       const listaPensamentos = document.getElementById('lista-pensamentos')
       const mensagemVazia = document.getElementById("mensagem-vazia");
       listaPensamentos.innerHTML = ''

       try {
        const pensamentos = await api.buscarPensamentos()
        // Lógica para renderizar os pensamentos
        if (pensamentos.length === 0) {
            mensagemVazia.style.display = 'block';
        } else {
            mensagemVazia.style.display = 'none';
            pensamentos.forEach(ui.adicionarPensamentoNaLista)
        }
       }
       catch {
        alert('Não foi possível renderizar os pensamentos, tente novamente mais tarde.')
        throw error
       }
    },

    adicionarPensamentoNaLista(pensamento) {
        const listaPensamentos = document.getElementById('lista-pensamentos')
        const li = document.createElement('li')
        li.classList.add('li-pensamento')
        li.setAttribute('data-id', pensamento.id)

        const iconeAspas = document.createElement('img')
        iconeAspas.src = 'assets/imagens/aspas-azuis.png'
        iconeAspas.alt = 'Aspas azuis'
        iconeAspas.classList.add('icone-aspas')

        const pensamentoConteudo = document.createElement('div')
        pensamentoConteudo.classList.add('pensamento-conteudo')
        pensamentoConteudo.textContent = pensamento.conteudo

        const pensamentoAutoria = document.createElement('div')
        pensamentoAutoria.classList.add('pensamento-autoria')
        pensamentoAutoria.textContent = pensamento.autoria

        const botaoEditar = document.createElement('button')
        botaoEditar.classList.add('botao-editar')
        botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id)

        const imagemEditar = document.createElement('img')
        imagemEditar.src = 'assets/imagens/icone-editar.png'
        imagemEditar.alt = 'Editar pensamento'
        botaoEditar.appendChild(imagemEditar)

        const botaoDeletar = document.createElement('button')
        botaoDeletar.classList.add('botao-deletar')
        botaoDeletar.onclick = async () => {
            try {
                await api.deletarPensamentos(pensamento.id)
                ui.redenderizarPensamentos()
            } catch {
                alert('Não foi possível deletar o pensamento, tente novamente mais tarde.')
            }
        }

        const imagemDeletar = document.createElement('img')
        imagemDeletar.src = 'assets/imagens/icone-excluir.png'
        imagemDeletar.alt = 'Deletar pensamento'
        botaoDeletar.appendChild(imagemDeletar)

        const icones = document.createElement('div')
        icones.classList.add('icones')
        icones.appendChild(botaoEditar)
        icones.appendChild(botaoDeletar)

        li.appendChild(iconeAspas)
        li.appendChild(pensamentoConteudo)
        li.appendChild(pensamentoAutoria)
        li.appendChild(icones)
        listaPensamentos.appendChild(li)
    }

}

export default ui;