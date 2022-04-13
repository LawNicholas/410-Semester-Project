<template>
    <div>
        <v-card
            class="mx-auto"
            max-width="1000"
            outlined
            elevation="6"
        >
            <v-form @submit.prevent="postComment()">
                <v-textarea
                    v-model="message"
                    label="Say Something..."
                    counter
                    maxlength="600"
                    full-width
                    single-line
                ></v-textarea>
                <div class="right">
                    <v-btn color="primary" type="submit">Submit</v-btn>
                </div>
            </v-form>
        </v-card>
        <div v-for="chat in chats" :key="chat.message">
            <v-card
                class="mx-auto"
                max-width="1000"
                outlined
                elevation="6"
            >
                <v-card-subtitle>{{chat.username}}</v-card-subtitle>
                <v-card-text>{{chat.message}}</v-card-text>
            </v-card>
        </div>
    </div>
    
</template>
<script>
export default {
    name: 'GroupchatPage',
    middleware: ['authCheck'],
    data () {
        const chats = this.$store.state.groupchat.chat
        return chats === null ? {
            chats: [],
            message: ''
        } : {
            chats: chats,
            message: ''
        }
    },
    methods: {
        async postComment() {
            const status = await this.$store.dispatch('groupchat/createComment', {
                message: this.message
            })
            if (status === 'created') {
                this.message = ''
                await this.$store.dispatch('groupchat/load')
                this.chats = this.$store.state.groupchat.chat
            }
        },
        checkAuth() {
            return this.$store.getters['accounts/isAuthenticated']
        },
        redirectOnNoAuth() {
            if(!this.checkAuth()) {
                this.$router.push('/login')
            }
        }
    }
}
</script>