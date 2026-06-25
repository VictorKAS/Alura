const api = {
    async buscarPensamentos() {
        try {
            const response = await fetch('http://localhost:3000/pensamentos')
            return await response.json()
        }
        catch {
            alert('Não foi possível buscar os pensamentos, tente novamente mais tarde.')
            throw error
        }
    }
}

export default api;