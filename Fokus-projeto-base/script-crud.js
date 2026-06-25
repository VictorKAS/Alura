const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const listaTarefas = document.querySelector('.app__section-task-list')
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescricao = document.querySelector('.app__section-active-task-description ');

const btnRemoverConcluida = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

let tarefaSelecionada = null
let liTarefaSelecionada = null

const limparFormulario = () => {
    textarea.value = '';  // Limpe o conteúdo do textarea
    formularioTarefa.classList.add('hidden');  // Adicione a classe 'hidden' ao formulário para escondê-lo
}

btnCancelar.addEventListener('click', limparFormulario);

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = ` 
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const p = document.createElement('p')
    p.textContent = tarefa.descricao
    p.classList.add('app__section-task-list-item-description')

    const button = document.createElement('button')
    button.classList.add('app_button-edit')

    button.onclick = () => {
        const novaDescricao = prompt('Qual é a nova descrição da tarefa?')
        console.log('Nova descrição:', novaDescricao)
        if (novaDescricao) {
            p.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas()
        }
        
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')
    button.append(imagemBotao)
    li.append(svg)
    li.append(p)
    li.append(button)
   
    if (tarefa.concluida) {
        li.classList.add('app__section-task-list-item-complete')
        button.setAttribute('disabled', 'disabled')
    } else {
         li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
            })
            if (tarefaSelecionada == tarefa) {
                tarefaSelecionada = null
                liTarefaSelecionada = null
                paragrafoDescricao.textContent = ''
                return
            }
            tarefaSelecionada = tarefa
            liTarefaSelecionada = li
            paragrafoDescricao.textContent = tarefa.descricao
        
            li.classList.add('app__section-task-list-item-active')
        }


    }

   
    return li
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
})

formAdicionarTarefa.addEventListener('submit', (event) => {
    event.preventDefault()
    const tarefa = {
        descricao: textarea.value
    }

    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    listaTarefas.append(elementoTarefa)
    atualizarTarefas()
    textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    listaTarefas.append(elementoTarefa)
});

document.addEventListener('FocoFinalizado' , () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
        tarefaSelecionada.concluida = true
        atualizarTarefas()
    }

})

const removerTarefas = (somenteConcluidas) => {
    const seletor = somenteConcluidas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    tarefas = somenteConcluidas ? tarefas.filter(tarefa => !tarefa.concluida) : []
    atualizarTarefas()
}

btnRemoverConcluida.onclick = () => removerTarefas(true)
btnRemoverTodas.onclick = () => removerTarefas(false)