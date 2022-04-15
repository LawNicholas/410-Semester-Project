<template>
    <div>
        <keyboard-input v-on:keyup="keyboardEvent"></keyboard-input>
        <h1>Tools</h1>
        <p>Tools will help you find clues. To get you started, you've been given you the Scanner, the first tool. This will allow you to view hidden items on the page. (A list of your tools can be viewd on the sidebar)</p>
        <p>To activate it, press the 'S' key on your keyboard.</p>
        <div>
            <template v-if="!hidden">
                <NuxtLink to="/pagethree">Hidden Hyperlink</NuxtLink>
            </template>
            <template v-else>
            </template>
        </div>
    </div>
</template>

<script>
import KeyboardInput from '../components/KeyboardInput.vue'

export default {
    name: "PageTwo",
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