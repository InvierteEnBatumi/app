<template>
  <v-app>
    <v-main class="pb-16">
      <GeneralNavigationComponent></GeneralNavigationComponent>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>


  export default {
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
    computed: {
    }
}

</script>

