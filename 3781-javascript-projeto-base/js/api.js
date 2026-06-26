const URL_BASE = 'http://localhost:3000'

const api = {
    async buscarPensamentos() {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos`)
            return await response.data
        }
        catch {
            alert('Não foi possível buscar os pensamentos, tente novamente mais tarde.')
            throw error
        }
    },
    
    async salvarPensamentos(pensamento) {
        try {
            const response = await axios.post(`${URL_BASE}/pensamentos`, pensamento)
            return await response.data
        }
        catch {
            alert('Não foi possível salvar o pensamento, tente novamente mais tarde.')
            throw error
        }
    },
    async buscarPensamentoPorId(id) {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`)
            return await response.data
        }
        catch {
            alert('Não foi possível buscar o pensamento, tente novamente mais tarde.')
            throw error
        }
    },
    async editarPensamentos(pensamento) {
        try {
            const response = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}` , pensamento)
            return await response.data
        }
        catch {
            alert('Não foi possível editar o pensamento, tente novamente mais tarde.')
            throw error
        }
    },
    async deletarPensamentos(id) {
        try {
            const response = await axios.delete(`${URL_BASE}/pensamentos/${id}`)
            return await response.data
        }
        catch {
            alert('Não foi possível deletar o pensamento, tente novamente mais tarde.')
            throw error
        }
    }
}

export default api;