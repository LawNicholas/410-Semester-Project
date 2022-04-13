<template>
    <div>
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