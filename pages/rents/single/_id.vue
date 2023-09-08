<template>
  <section>
    <portal to="title-toolbar">
      {{ property.name }}
    </portal>
    <v-container>
      <v-row>
        <v-col class="col-12">
          <v-card class="rounded-lg">
            <v-carousel height="300" hide-delimiters>
              <v-carousel-item v-for="(picture,index) in property.pictures" :key="index">
                <v-img :src="`${picture.url}`" height="300"></v-img>
              </v-carousel-item>
            </v-carousel>
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
            <v-divider></v-divider>
            <v-card-text>

              <v-row no-gutters class="mb-3">
                <v-col class="col-7">
                  <span class="font-weight-bold black--text">Propietario</span>
                </v-col>
                <v-col class="col-5 text-right">
                  <span class="font-weight-bold black--text">{{ property.data.owner }}</span>
                </v-col>
              </v-row>
              <v-row no-gutters class="mb-3">
                <v-col class="col-7">
                  <span class="font-weight-bold black--text">Areaados</span>
                </v-col>
                <v-col class="col-5 text-right">
                  <span class="font-weight-bold black--text">{{ property.data.square_meters }}m2</span>
                </v-col>
              </v-row>
              <v-row no-gutters class="mb-3">
                <v-col class="col-7">
                  <span class="font-weight-bold black--text">Inicio de gestion</span>
                </v-col>
                <v-col class="col-5 text-right">
                  <span class="font-weight-bold black--text">{{ property.data.start_of_management | formatDate}}</span>
                </v-col>
              </v-row>

              <v-row no-gutters class="mb-3">
                <v-col class="col-7">
                  <span class="font-weight-bold black--text">Retorno anual estimado</span>
                </v-col>
                <v-col class="col-5 text-right">
                  <span class="font-weight-bold black--text">{{ property.data.estimated_annual_return }}%</span>
                </v-col>
              </v-row>
              <v-row no-gutters class="mb-3">
                <v-col class="col-7">
                  <span class="font-weight-bold black--text">Tipo de alquiler</span>
                </v-col>
                <v-col class="col-5 text-right">
                  <span class="font-weight-bold black--text">{{ property.data.rent_type }}</span>
                </v-col>
              </v-row>
              <v-row no-gutters class="mb-3">
                <v-col class="col-7">
                  <span class="font-weight-bold black--text">Tiempo de amortizacion</span>
                </v-col>
                <v-col class="col-5 text-right">
                  <span class="font-weight-bold black--text">{{ property.data.amortization_time }} meses</span>
                </v-col>
              </v-row>
              <v-row no-gutters class="mb-3">
                <v-col class="col-7">
                  <span class="font-weight-bold black--text">Precio de alquiler</span>
                </v-col>
                <v-col class="col-5 text-right">
                  <span class="font-weight-bold black--text">{{ property.data.rent_price }} USD</span>
                </v-col>
              </v-row>

            </v-card-text>
            <v-card-actions class="d-flex justify-center">
              <v-btn class="white--text font-weight-black" color="secondary" large target="blank" depressed rounded
                :href="`${property.file.url}`">
                Ver contrato
              </v-btn>
            </v-card-actions>
            <v-card-text>
              <v-card color="grey lighten-3">
                <v-card-text class="d-flex justify-center">
                  <v-progress-circular size="150" width="12" :value="amortizationProgress" color="primary">
                    <span class="text-h3 font-weight-black">{{amortizationProgress}}%</span>
                  </v-progress-circular>

                </v-card-text>
                <v-card-subtitle>
                  <span class="font-weight-bold black--text">Amortizacion</span>
                </v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                  <graphComponent :xAxis="xAxisGraph" :yAxis="yAxisGraph"></graphComponent>
                </v-card-text>
                <v-card-subtitle>
                  <span class="font-weight-bold black--text">Revalorizacion anual</span>
                </v-card-subtitle>

              </v-card>

            </v-card-text>
            <v-card-actions class="d-flex justify-center" v-if="!property.in_sale">
              <v-btn @click="putInSaleDialog = true" rounded class="white--text font-weight-black" color="secondary" x-large>Poner
                a
                la venta</v-btn>
            </v-card-actions>
            <v-card-actions class="d-flex justify-center">
              <v-btn @click="disponibilityModal = true" rounded class="white--text font-weight-black" color="secondary"
                depressed x-large>
                Definir disponibilidad
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="putInSaleDialog" persistent>
      <GeneralCardComponent>
        <v-card-title>
          <span class="font-weight-bold black--text">Precio de venta</span>
          </v-card-title>
          <v-divider></v-divider>
        <v-card-text>
          <formsFieldsTextComponent prepend-icon="mdi-cash" v-model="property.data.sale_price"></formsFieldsTextComponent>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="putInSale()" :disabled="!property.data.sale_price">Guardar</v-btn>
        </v-card-actions>
      </GeneralCardComponent>
    </v-dialog>
    <v-snackbar v-model="snackbar" color="success">
      <span class="black--text">Se ha puesto a la venta la promocion</span>
    </v-snackbar>
    <v-dialog v-model="disponibilityModal" persistent>
      <GeneralCardComponent>
        <GeneralCardTitleComponent>
          Definir disponibilidad
          <v-spacer></v-spacer>
          <v-btn icon @click="disponibilityModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </GeneralCardTitleComponent>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col class="col-12">
              <FormsFieldsSelectComponent :items="[{value:true,text:'Si'},{value:false,text:'No'}]" label="Disponibilidad completa" v-model="disponibility.complete"></FormsFieldsSelectComponent>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-if="!disponibility.complete">
          <v-row>
            <v-col class="col-3">
              <v-btn block color="secondary" @click="removeDisponibility()">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-col>
            <v-col class="col-3">
              <v-btn block color="secondary" @click="addDisponiblity()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>

            </v-col>
          </v-row>
          <v-row v-for="(dates,index) in disponibility.disponibility_dates" :key="index">
            <v-col class="col-12">
              <FormsFieldsTextComponent type="date" label="Fecha de inicio" v-model="dates.from"></FormsFieldsTextComponent>
            </v-col>
            <v-col class="col-12">
              <FormsFieldsTextComponent type="date" label="Fecha de fin" v-model="dates.to"></FormsFieldsTextComponent>
            </v-col>
          </v-row>

        </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          <v-btn color="secondary" class="black--text rounded-lg font-weight-black white--text"  @click="saveDisponibility()">Guardar</v-btn>
        </v-card-actions>
      </GeneralCardComponent>
    </v-dialog>
  </section>
</template>


<script>
import moment from 'moment'
  export default {
    filters:{
      formatDate(value){
        return moment(value).format('DD/MM/YYYY')
      }
    },
    layout: 'withBackButton',
    data() {
      return {
        putInSaleDialog: false,
        width: 2,
        radius: 10,
        padding: 8,
        lineCap: 'round',
        value: [0, 1, 2, 1, 3, 2, 5, 5, 5, 6, 7, 8, 9, 10],

        disponibilityModal: false,
        disponibility:{
          complete:true,
          disponibility_dates:[{}]
        },
        snackbar: false
      }
    },
    created() {
      this.getProperty()
    },
    methods: {
      async getProperty() {
        await this.$store.dispatch('promotions/find', this.$route.params.id)
        this.disponibility = JSON.parse(JSON.stringify(this.property.data.disponibility))
      },
      putInSale() {
        this.$axios.put('/promotions/' + this.$route.params.id, {
          data: {
            in_sale: true
          }
        }).then((response) => {
          this.$axios.put('/rents/' + this.property.data.id, {
            data: this.property.data
          })

        }).then(()=>{
          this.property.in_sale = true
          this.snackbar = true
          this.putInSaleDialog = false

        })
      },
      removeDisponibility(){
        this.disponibility.disponibility_dates.pop()
      },
      addDisponiblity(){
        this.disponibility.disponibility_dates.push({})
      },
      saveDisponibility(){
        this.$axios.put('/rents/' + this.property.data.id, {
          data: {
            disponibility: this.disponibility
          }
        }).then((response) => {
          this.disponibilityModal = false
        })
      }
    },
    computed: {
      property() {
        console.log(this.$store.getters['promotions/get'])
        return this.$store.getters['promotions/get']
      },
      amortizationProgress(){
        const yearsAfterBuy = moment().diff(this.property.data.purchase_date, 'years')
        return yearsAfterBuy*this.property.data.estimated_annual_return
      },
      xAxisGraph() {
        return this.property.revalorization.map((revalorization)=>{
          return revalorization.year
        })
      },
      yAxisGraph() {
        return this.property.revalorization.map((revalorization)=>{
          return revalorization.value
        })
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

</style>
