<template>
    <div>
        <keyboard-input v-on:keyup="keyboardEvent"></keyboard-input>
        <template v-if='hidden'>
        </template>
        <template v-else>
            You found me!
        </template>
        <test-text label='Enter Text' @displayText="changeText"></test-text> {{message}}
    </div>
</template>

<script>
import TestText from '../components/TestText.vue'
import KeyboardInput from '../components/KeyboardInput.vue'

export default {
    components: {
        KeyboardInput,
        TestText
    },
    data() {
        return {
            message: '',
            hidden: true
        }
    },
    methods: {
        changeText(value) {
            if(value !== null) {
                this.message = value
            }
        },
        keyboardEvent (e) {
            console.log(e)
            // If S is Pressed
            if (e.which === 83) {
                this.hidden = !this.hidden
            }
        }
    }
}
</script>
