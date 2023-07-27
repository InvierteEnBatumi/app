<template>
  <v-toolbar color="primary">
    <img src="/logo.svg" width="40">
    <v-toolbar-title class="white--text text-subtitle-1 mt-2 ml-2">
      {{ currenTitle }}
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
            <v-list-item to="/login">
              <v-list-item-title>Salir</v-list-item-title>
            </v-list-item>

          </v-list>
        </v-menu>

    <template v-slot:extension>
      <v-tabs slider-size="4" :show-arrows="false" grow centered color="black" >
      
      <v-tab to="/">
        <v-icon color="white">ion-ios-home</v-icon>
      </v-tab>
      <v-tab to="/rents">
        <v-icon color="white">mdi-finance</v-icon>
      </v-tab>
      <v-tab to="/sales">
        <v-icon color="white">ion-ios-home</v-icon>
        <v-icon color="white">mdi-currency-usd</v-icon>
     </v-tab>
      <v-tab to="/news">
        <v-icon color="white">ion-ios-paper</v-icon>
      </v-tab>
    </v-tabs>
      </template>
  </v-toolbar>
</template>

<script>
  export default {
    data() {
      return {
        menu: false,
        drawer: false,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    },
    methods: {

    },
    computed: {
      currenTitle() {
        switch(this.$route.path) {
          case '/':
            return 'Mis inversiones'
          case '/rents':
            return 'Mis alquileres'
          case '/news':
            return 'Novedades'
        }
      }
    }
  }

</script>

<style lang="scss">
.v-tab--active{
  .v-icon{
    color: black!important;
  }
}
.v-slide-group__prev{
  display:none!important;
}
</style>
