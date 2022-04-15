<template>
    <div>
        <h1>To Continue, Please Login</h1>
        <v-btn color="primary" to='/login' nuxt>Login</v-btn>
        <v-btn color="primary" to='/createaccount' nuxt>Create Account</v-btn>
    </div>
</template>

<script> 
    export default {
        name: 'FrontPage',
        data() {
            return {
                input: ''
            }
        },
        methods: {
            async checkInput() {
                if (this.input == '1357'){
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
</style>