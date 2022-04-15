<template>
    <div>
        <keyboard-input v-on:keyup="keyboardEvent"></keyboard-input>
        <p>I ran low on time, so here's a button that gives you the rest of the tools.</p>
        <v-btn color="primary" @click="getTools()">Cheat Button</v-btn>
        <template v-if="!extraHidden">
            <NuxtLink to="/pageone">Back to page 1</NuxtLink>
        </template>
        <template v-else></template>
    </div>
</template>

<script>
import KeyboardInput from '../components/KeyboardInput.vue'

export default {
    name:"PageThree",
    components: {
        KeyboardInput
    },
    data () {
        const user = this.$store.state.accounts.user
        return {
            hidden: true,
            extraHidden: true,
            tools: user.tools
        }
    },
    methods: {
        async getTools() {
            if (this.tools.length < 2) {
                await this.$store.dispatch('tools/addTool', {
                    tool: 2
                })
            }
            if (this.tools.length < 3) {
                await this.$store.dispatch('tools/addTool', {
                    tool: 3
                })
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

<style>

</style>