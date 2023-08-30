<template>
  <v-card class="rounded-lg">
    <v-img  height="180" :src="`${main_picture.url}`">
      <div class="property-title fill-height">
        <span class="secondary white--text text-h6 pa-3 font-weight-extra-bold rounded-br-xl text-capitalize">{{ property.name }}</span>
        <v-chip class="sales-chip" v-if="property.in_sale">En venta</v-chip>
      </div>
    </v-img>
  </v-card>
</template>

<script>
export default {
  props:{
    property: {
      type: Object,
      required: true,
      validator: (propValue) => {
        // Verificar si main_picture es nulo o no está definido.
        if (propValue.pictures && propValue.pictures.length>0) {
          propValue.main_picture = propValue?.pictures[0]
          // Asignar una imagen por defecto o URL específica en caso de que main_picture sea nulo o no esté definido.
          // Por ejemplo:
          // propValue.main_picture = { url: 'URL_DE_LA_IMAGEN_POR_DEFECTO' };
        } else {
          propValue.main_picture = { url: '' };
        }
        return true;
      },
      default: function () {
        return { 
          main_picture:{
            url:""
          }
         }
      }


    },
  },
  data() {
      return {
        main_picture:{}
      }
    },
    created() {
      if(this.property && this.property.pictures.length>0) {
        this.main_picture = this.property?.pictures[0]
      } else {
        this.main_picture = { url: '' }
      }
    }


}
</script>

<style>
.property-title{
  position:relative;
}
.sales-chip{
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1rem;
}
</style>