<template>
  <section>
    <portal to="title-toolbar">
      {{ property.name }}
    </portal>
    <v-container>
      <v-row>
        <v-col class="col-12">
          <GeneralCardComponent>
            <v-carousel height="300" hide-delimiters>
              <v-carousel-item v-for="(picture,index) in property.pictures" :key="index">
                <v-img :src="`${picture.url}`" height="300"></v-img>
              </v-carousel-item>
            </v-carousel>
            <v-card-text>
              <v-row no-gutters class="mb-3">
                <v-col class="col-8">
                  <span class="font-weight-bold black--text">Valor actual</span>
                </v-col>
                <v-col class="col-4 text-right">
                  <span class="font-weight-bold black--text">{{ property.price }} $</span>
                </v-col>
              </v-row>
              <v-row no-gutters class="mb-3">
                <v-col class="col-8">
                  <span class="font-weight-bold black--text">Metros cuadrados</span>
                </v-col>
                <v-col class="col-4 text-right">
                  <span class="font-weight-bold black--text">{{ property.data.square_meters }} m2</span>
                </v-col>
              </v-row>

              <v-row no-gutters class="mb-3">
                <v-col class="col-8">
                  <span class="font-weight-bold black--text">Capital contribuido</span>
                </v-col>
                <v-col class="col-4 text-right">
                  <span class="font-weight-bold black--text">{{ property.data.contributed_capital }} $</span>
                </v-col>
              </v-row>


              <v-row no-gutters class="mb-3">
                <v-col class="col-8">
                  <span class="font-weight-bold black--text">Plusvalia generada</span>
                </v-col>
                <v-col class="col-4 text-right">
                  <span class="font-weight-bold black--text">{{ property.data.surplus_value_generated }} $</span>
                </v-col>
              </v-row>
              <v-row no-gutters class="mb-3">
                <v-col class="col-8">
                  <span class="font-weight-bold black--text">Orientacion</span>
                </v-col>
                <v-col class="col-4 text-right">
                  <span class="font-weight-bold black--text">{{ property.data.orientation }}</span>
                </v-col>
              </v-row>




              <v-row no-gutters class="mb-3">
                <v-col class="col-12" v-if="property.data.contract?.id">
                  <a class="font-weight-black text-subtitle-1" target="blank" :href="`${property.data.contract.url}`">
                    Contrato: <v-icon color="orange" size="30">mdi-file</v-icon>contrato.pdf
                  </a>
                </v-col>

                <v-col class="col-12" v-if="property.data.precontract?.id">
                  <a class="font-weight-black text-subtitle-1" target="blank" :href="`${property.data.precontract.url}`">
                    Precontrato: <v-icon color="orange" size="30">mdi-file</v-icon>contrato.pdf
                  </a>
                </v-col>
                <v-col class="col-12" v-if="property.data.reservation_invoice?.id">
                  <a class="font-weight-black text-subtitle-1" target="blank" :href="`${property.data.reservation_invoice.url}`">
                    Factura de reserva: <v-icon color="orange" size="30">mdi-file</v-icon>contrato.pdf
                  </a>
                </v-col>
                <v-col class="col-12" v-if="property.data.sale_invoice?.id">
                  <a class="font-weight-black text-subtitle-1" target="blank" :href="`${property.data.sale_invoice.url}`">
                    Factura de entrada: <v-icon color="orange" size="30">mdi-file</v-icon>contrato.pdf
                  </a>
                </v-col>
                <v-col class="col-12" v-if="property.data.property_registration?.id">
                  <a class="font-weight-black text-subtitle-1" target="blank" :href="`${property.data.property_registration.url}`">
                    Registro de propiedad: <v-icon color="orange" size="30">mdi-file</v-icon>contrato.pdf
                  </a>
                </v-col>

              </v-row>


            </v-card-text>
            <v-divider></v-divider>
            <v-card-text v-if="property.features.length>0">
              <GeneralCardComponent>
                <generalCardTitleComponent>Caracteristicas generales</generalCardTitleComponent>
                <v-card-text>
                  <v-row no-gutters class="mb-3" v-for="feature in property.features" :key="feature.id">
                <v-col class="col-8">
                  <span class="font-weight-bold black--text">{{ feature.name }}</span>
                </v-col>
                <v-col class="col-4 text-right">
                  <span class="font-weight-bold black--text">{{ feature.value }}</span>
                </v-col>
              </v-row>

                </v-card-text>
              </GeneralCardComponent>
            </v-card-text>

            <v-card-actions class="d-flex justify-center" v-if="!property.in_sale">
              <v-btn @click="putInSale()" rounded class="white--text font-weight-black" color="secondary" large>Poner a
                la venta</v-btn>
            </v-card-actions>
          </GeneralCardComponent>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" color="success">
        <span class="black--text">Se ha puesto a la venta la promocion</span>
    </v-snackbar>
  </section>
</template>


<script>
  export default {
    layout: 'withBackButton',
    data() {
      return {
        snackbar: false
      }
    },
    created() {
      this.getProperty()
    },
    methods: {
      async getProperty() {
        await this.$store.dispatch('promotions/find', this.$route.params.id)
      },
      putInSale() {
        this.$axios.put('/promotions/' + this.$route.params.id, {
          data: {
            in_sale: true
          }
        }).then((response) => {
            this.property.in_sale=true
          this.snackbar = true
        })
      }
    },
    computed: {
      property() {
        return this.$store.getters['promotions/get']
      },
      calculatePercentProgress() {
        switch (this.property.progress) {
          case 'Cimentación':
            return 16.5
          case 'Construcción':
            return 33
          case 'Black Frame':
            return 50
          case 'White Frame':
            return 66
          case 'Amueblado':
            return 83
          case 'Finalización':
            return 100
        }
      }
    }
  }

</script>
<style>
a {
  text-decoration: none;
  color: black!important;
}

</style>