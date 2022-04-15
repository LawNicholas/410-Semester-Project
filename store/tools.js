
export const state = () => {
    return {
        toolList: null
    }
}

export const mutations = {
    setTools (state, tool) {
        state.toolList = tool
    }
}

export const actions = {
    async addTool ({ dispatch }, { tool }) {
        try {
            console.log(tool)
            let endpoint = '/api/tools/' + tool
            const res = await this.$axios.put(endpoint)
            if(res.status === 200) {
                return true
            }
        } catch (e) {
            return false
        }
    },
    async load ({ commit }) {
        try {
            const toolList = []
            let itemName = ''
            let item = ''
            for (let i = 0; i < 3; i++) {
                itemName = 'Tool' + (i + 1)
                item = localStorage.getItem(itemName)
                if (item === "Scanner")
                    toolList.push({ "toolname":item, "mouseover":"Uncovers hidden messages on the page." })
                if (item === "Decrypter")
                    toolList.push({ "toolname":item, "mouseover":"Decrypts Caesar ciphers." })
                if (item === "Advanced Scanner")
                    toolList.push({ "toolname":item, "mouseover":"Uncovers more hidden elements than the regular scanner." })
            }
            let success = true
            if (success) {
                commit('setTools', toolList)
            }
            else {
                commit('setTools', null)
            }
        } catch (e) {
            commit('setTools', null)
        }
    },
}