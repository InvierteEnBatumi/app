<template>
  <v-container>
    <v-row>
      <v-col class="col-12" v-for="property in properties.data" :key="property.id">
        <router-link :to="`/investments/single/${property.id}`" tag="div">
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
  data(){
    return {
      properties:[]
    }
  },
  created() {
    this.getProperties()
  },
  methods:{
    getProperties() {
        this.properties = {}
        this.$axios.get('/promotions/?populate=*', {
          params: {
            filters: {
              type:'Inversion'
            }
          },
          paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }

        }).then((response) => {
          this.properties = response.data
        })
      }
  },
}
</script>
