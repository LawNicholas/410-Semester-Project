<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item v-for="(tool, i) in tools" :key="i">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-action>
              </v-list-item-action>
              <v-list-item-content v-bind="attrs" v-on="on">
                <v-list-item-title v-text="tool.toolname"/>
              </v-list-item-content>
            </template>
            <span>{{tool.mouseover}}</span>
          </v-tooltip>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon>
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    const tools = this.$store.state.tools.toolList
    return {
      drawer: false,
      fixed: false,
      tools: tools,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
          mouseover: ''
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
          mouseover: ''
        },
        {
          icon: 'mdi-emoticon',
          title: 'PageOne',
          to: '/pageone',
          mouseover: 'Go To Page One'
        }
      ],
      title: 'Vuetify.js',
    }
  },
}
</script>
