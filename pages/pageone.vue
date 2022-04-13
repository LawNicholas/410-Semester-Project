<template>
    <div>
        <keyboard-input v-on:keyup="keyboardEvent"></keyboard-input>
        <template v-if="hidden"></template>
        <template v-else>1357</template>
        <v-container
            max-width="250"
        >
            <v-form>
                <v-text-field
                    v-model="input"
                ></v-text-field>
            </v-form>
        </v-container>
        <div class="center">
            <v-btn color="primary" @click='checkInput()'>Click</v-btn>
        </div>
    </div>
</template>

<script> 
import KeyboardInput from '../components/KeyboardInput.vue'

export default {
    name: 'FrontPage',
    middleware: ["authCheck"],
    components: {
        KeyboardInput
    },
    data() {
        const user = this.$store.state.accounts.user
        return {
            input: '',
            hidden: true,
            tools: user.tools
        }
    },
    methods: {
        async checkInput() {
            if (this.input == '1357'){
                console.log('hit')
                const finished= new Date().toUTCString()
                const user = await this.$store.state.accounts.user
                let success = await this.$store.dispatch('accounts/finishLine', {
                    username: user.username,
                    progress: 100,
                    datecompleted: finished,
                    pagescompleted: 4
                })
                if (success) {
                    this.$router.push({ path: '/groupchat' })
                }
            }
        },
        keyboardEvent (e) {
            console.log(e)
            // If S is Pressed
            if (this.tools[1] != null && e.which === 83) {
                this.hidden = !this.hidden
            }
        }
    }
}
</script>

<style scoped>
  .container > div {
    max-width: 150px;
    margin: 0 auto;
  }
  .center {
    text-align: center;
  }
</style>