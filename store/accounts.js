/**
 * Pulled from the professor's example. There wasn't much to change to adapt it to the project other than some minor variable changes.
 */

/**
 * The state will hold user account information that is returned directly from the API
 */
export const state = () => {
    return {
        user: null
    }
}

export const getters = {
    /**
     * Gets the authentication status of the user.
     * Returns TRUE if logged into an account and FALSE otherwise
     */
    isAuthenticated (state) {
        return state.user !== null
    }
}

export const mutations = {
    /**
     * Sets the state user object equal to the provided user object. Intended to match the local user object to the one returned by the
     * API.
     */
    setUser (state, user) {
        state.user = user
    }
}

export const actions = {
    /**
     * Sends a post request to the accounts API endpoint.
     */
    async createAccount ({ commit }, { email, username, password }) {
        try {
            const res = await this.$axios.post('/api/accounts', {
                email,
                username,
                password
            })
            return 'created'
            
        } catch (e) {
            const status = e.response.status
            if (status === 409) {
                return 'conflict'
            } else {
                return 'failed'
            }
        }
    },

    /**
     * Sends a get request to the accounts API endpoint. It then calls the setUser mutation to match the user object in the response.
     * If the user is not logged in, this should return a null value.
     */
    async load ({ commit }) {
        try {
            let endpoint = 'api/accounts/'
            const res = await this.$axios.get(endpoint)
            if (res.status === 200) {
                commit('setUser', res.data)
            }
        } catch (e) {
            commit('setUser', null)
        }
    },

    /**
     * Sends a put request to the authentication/login API endpoint. Will return TRUE on a 200 response and FALSE otherwise.
     */
    async login ({ dispatch }, { username, password }) {
        try {
            const res = await this.$axios.put('/api/authentication/login', {
                username,
                password
            })

            if (res.status === 200) {
                await dispatch('load')
                return true
            } else {
                return false
            }
        } catch (e) {
            return false
        }
        
    },

    /**
     * Sends a put request to the authentication/logout API endpoint. If a 200 response is returned, the state.user object is set to
     * null. Otherwise, nothing is changed.
     */
    async logout ({ commit }) {
        const res = await this.$axios.put('/api/authentication/logout')
        if (res.status === 200) {
            commit('setUser', null)
        }
    }
}