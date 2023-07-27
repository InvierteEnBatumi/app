<template>
  <v-app>
    <v-main class="pb-16">
      <v-app-bar color="primary">
        <v-btn icon @click="$router.go(-1)">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title class="font-weight-extra-bold white--text">
          <portal-target name="title-toolbar"></portal-target>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu v-model="menu">
          <template v-slot:activator="{ props }">
            <v-btn icon @click="menu = !menu">
              <v-icon color="white">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>Configuracion</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Privacidad</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Ayuda y soporte</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout()">
              <v-list-item-title>Salir</v-list-item-title>
            </v-list-item>

          </v-list>
        </v-menu>

      </v-app-bar>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data(){
      return {
        menu: false
      }
    },
    created() {
      if(!localStorage.hasOwnProperty('loggedIn')){
            this.$router.push('/login')
        }

    },
    methods: {
      logout(){
        localStorage.removeItem('loggedIn')
        this.$router.push('/login')
      }
    },
    computed: {}
  }

</script>
