export const state = () => {
    return {
        leader_list: null
    }
}

export const getters = {
    getLeaderList (state) {
        return state.leader_list
    }
}

export const mutations = {
    setLeaderList (state, list) {
        state.leader_list = list
    }
}

export const actions = {
    async load ({ commit }) {
        try {
            let endpoint = 'api/leaderboard'
            const res = await this.$axios.get(endpoint)
            if (res.status === 200) {
                commit('setLeaderList', res.data)
            }
            return res.data
        } catch (e) {
            commit('setLeaderList', null)
            return null
        }
    }
}