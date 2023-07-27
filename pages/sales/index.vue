<template>
  <v-container>
    <v-row>
      <v-col class="col-12" v-for="property in properties.data" :key="property.id">
        <router-link :to="`/sales/single/${property.id}`" tag="div">
          <propertiesCardComponent :property="property"></propertiesCardComponent>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import qs from 'qs'

export default {
  name: 'IndexPage',
  created() {
    this.getProperties()
  },
  methods:{
    getProperties() {
      this.$store.dispatch('promotions/findAll',{
        filters:{
          in_sale:true
        }
      })
      },
  },
  computed:{
        properties(){
          return this.$store.getters['promotions/getAll']
        }
      }


}
</script>
