<template>
    <div>
        <keyboard-input v-on:keyup="keyboardEvent"></keyboard-input>
        <div class="mid">
            <h1>Welcome To Web Maze</h1>
            <p>Try and navigate these pages and find the end page.</p>
        </div>
        <template v-if="!extraHidden">
            <div class="container">
                <v-row justify="space-around"><v-icon x-large>mdi-lock</v-icon></v-row>
                <div max-width="250">
                    <v-form>
                        <v-text-field v-model="input"></v-text-field>
                    </v-form>
                </div>
            </div>
        </template>
        <template v-else></template>
        <div class="container">
            <v-btn color="primary" @click='checkInput()'>Click to Start</v-btn>
        </div>
        <template v-if="!hidden">
            <div class="container">
                <div max-width="250">
                    1 3 5 7
                </div>
            </div>
        </template>
        <template v-else></template>
    </div>
</template>

<script> 
import KeyboardInput from '../components/KeyboardInput.vue'

export default {
    name: 'PageOne',
    middleware: ["authCheck"],
    components: {
        KeyboardInput
    },
    data() {
        const user = this.$store.state.accounts.user
        return {
            input: '',
            hidden: true,
            extraHidden: true,
            tools: user.tools
        }
    },
    methods: {
        async checkInput() {
            if (this.input == '1357'){
                await this.finishAndRoute()
            }
            else {
                await this.toolCheck()
                this.$router.push({ path: '/pagetwo' })
            }
        },
        async toolCheck(){
            const toolList = await this.$store.state.tools.toolList
            if (toolList.length > 0) {
                let giveTool = true
                let i = 0
                while (i < toolList.length) {
                    if (toolList[i].toolname === "Scanner") {
                        giveTool = false
                    }
                    i += 1
                }
                if (giveTool == false) {
                    return
                }
            }
            await this.$store.dispatch('tools/addTool', {
                tool: 1
            })
        },
        async finishAndRoute() {
            const finished = new Date().toUTCString()
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
        },
        keyboardEvent (e) {
            console.log(e)
            // If S is Pressed
            if (this.tools[0] != null && e.which === 83) {
                this.hidden = !this.hidden
                if (this.tools[2] != null) {
                    this.extraHidden = this.hidden
                }
            }
            if (this.tools[1] != null && e.which === 68) {
                
            }
        }
    }
}
</script>

<style scoped>
    .container {
        max-width: 150px;
        margin: 0 auto;
    }
    .center {
        text-align: center;
    }
    .mid {
        height: 200px;
        text-align: center;
    }
</style>