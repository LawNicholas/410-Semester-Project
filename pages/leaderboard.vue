<template>
    <div>
        <v-app>
            <v-data-table dense :headers="headers" :items="leaders" item-key="name" class="elevation-1"></v-data-table>
        </v-app>
    </div>
</template>

<script>
export default {
    name: 'LeaderboardPage',
    middleware: ['authCheck'],
    data () {
        const list = this.$store.state.leaderboard.leader_list
        return list === null ? {
            leaders: [],
            headers: [
                { text: 'Place', value: 'leaderboard' },
                {
                    text: 'Username',
                    align: 'start',
                    sortable: false,
                    value: 'username',
                },
                { text: 'Days', value: 'days' },
                { text: 'Hours', value: 'hours' },
                { text: 'Minutes', value: 'minutes' },
                { text: 'Seconds', value: 'seconds' }
            ]
        } : {
            leaders: list,
            headers: [
                { text: 'Place', value: 'leaderboard' },
                {
                    text: 'Username',
                    align: 'start',
                    sortable: false,
                    value: 'username',
                },
                { text: 'Days', value: 'days' },
                { text: 'Hours', value: 'hours' },
                { text: 'Minutes', value: 'minutes' },
                { text: 'Seconds', value: 'seconds' }
            ]
        }
    },
    methods: {
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
