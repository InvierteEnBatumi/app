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
    middleware:'auth',
    created() {

    },
    methods: {
    },
    computed: {
    }
}

</script>

