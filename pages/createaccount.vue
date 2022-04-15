<template>
  <div>
    <template v-if="checkAuth()">
        <div>
            <h1>Hi, {{username}}! You are already logged in!</h1>
            <div class="right">
                <v-btn color="primary" @click="logout()">Logout</v-btn>
            </div>
        </div>
    </template>
    <template v-else>
        <div>
            <h1>Create Account</h1>
            <form @submit.prevent="createAccount()">
                <v-text-field label="Email" v-model="email"></v-text-field>
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
  name: 'CreateAccountPage',
  data () {
    const user = this.$store.state.accounts.user
    return user === null
      ? {
        username: '',
        email: '',
        password: '',
        errorMessage: '',
      }
      : {
        username: user.username,
        email: '',
        password: '',
        errorMessage: ''
      }
  },
  methods: {
    async createAccount () {
      if (this.readyToSubmit) {
        const status = await this.$store.dispatch('accounts/createAccount', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        if (status !== 'created') {
            this.errorMessage = 'Username or email already exists.'
        }
        else {
            this.errorMessage = ''
            this.username = ''
            this.email = ''
            this.password = ''
            this.$router.push({ path: '/pageone' })
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
      return this.username !== '' && this.email !== '' && this.password !== ''
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