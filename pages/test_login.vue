<template>
  <div>
    <template v-if="checkAuth()">
        <div>
            <h1>Hi {{username}}! You are already logged in!</h1>
            <div class="right">
                <v-btn color="primary" @click="logout()">Logout</v-btn>
            </div>
        </div>
    </template>
    <template v-else>
        <div>
            <h1>Login</h1>
            <form @submit.prevent="login()">
                <v-text-field label="Username" v-model="username"></v-text-field>
                <v-text-field label="Password" type="password" v-model="password"></v-text-field>
                <sub>{{errorMessage}}</sub>
                <div class="right">
                    <v-btn color="primary" type="submit">Submit</v-btn>
                </div>
            </form>
        </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data () {
    const user = this.$store.state.accounts.user
    return user === null
      ? {
        username: '',
        password: '',
        errorMessage: '',
      }
      : {
        username: user.username,
        password: '',
        errorMessage: ''
      }
  },
  methods: {
    async login () {
      if (this.readyToSubmit) {
        const success = await this.$store.dispatch('accounts/login', {
          username: this.username,
          password: this.password
        })
        if (success === false) {
            this.errorMessage = 'Username or password was incorrect.'
        }
      }
    },
    async logout() {
        this.$store.dispatch('accounts/logout')
    },
    checkAuth() {
        return this.$store.getters['accounts/isAuthenticated']
    }
  },
  computed: {
    readyToSubmit () {
      return this.username !== '' && this.password !== ''
    }
  }
}
</script>

<style scoped>
  .container > div {
    max-width: 500px;
    margin: 0 auto;
  }
  .right {
    text-align: right;
  }
</style>