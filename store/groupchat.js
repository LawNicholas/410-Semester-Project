
export const state = () => {
    return {
        chat: null
    }
}

export const getters = {

}

export const mutations = {
    setChat (state, chat) {
        state.chat = chat
    }
}

export const actions = {
    async createComment({ commit }, { message }) {
        try {
            let endpoint = 'api/groupchat'
            const res = await this.$axios.put(endpoint, {
                message
            })
            return 'created'
        }
        catch (e) {
            const status = e.response.status
            if (status === 409) {
                return 'conflict'
            } else {
                return 'failed'
            }
        }
    },

    async load ({ commit }) {
        try {
            let endpoint = 'api/groupchat'
            const res = await this.$axios.get(endpoint)
            if (res.status === 200) {
                commit('setChat', res.data)
            }
        } catch (e) {
            commit('setChat', null)
        }
    }
}