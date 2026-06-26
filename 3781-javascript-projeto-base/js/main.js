import ui from "./ui.js"
import api from "./api.js"

document.addEventListener('DOMContentLoaded', () => {
    ui.redenderizarPensamentos()

    const formularioPensamento = document.getElementById('pensamento-form')
    const botaoCancelar = document.getElementById('botao-cancelar')

    formularioPensamento.addEventListener('submit', manipularEnvioFormulario)
    botaoCancelar.addEventListener('click', manipularCancelamento)
})

async function manipularEnvioFormulario(event) {
    event.preventDefault()
    const id = document.getElementById('pensamento-id').value
    const conteudo = document.getElementById('pensamento-conteudo').value
    const autoria = document.getElementById('pensamento-autoria').value

    try {
        if (id) {
            await api.editarPensamentos({id, conteudo, autoria})
        }
        else {
            await api.salvarPensamentos({conteudo, autoria})
        }
        ui.redenderizarPensamentos()
    
    }
    catch  {
        alert('Não foi possível salvar o pensamento, tente novamente mais tarde.')
    }
}

async function manipularCancelamento(event) {
    event.preventDefault()
    document.getElementById('pensamento-id').value = ''
    document.getElementById('pensamento-conteudo').value = ''
    document.getElementById('pensamento-autoria').value = ''
}
