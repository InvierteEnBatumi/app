<template>
  <v-container>
    <portal to="title-toolbar">
      Referridos
    </portal>
    <v-row>
        <v-col class="col-12">
            <generalCardComponent>
              <GeneralCardTitleComponent>
                Mis referidos
                <v-spacer></v-spacer>
                <v-btn fab tile small class="rounded-lg" color="secondary" @click="shareDialog = true">
                  <v-icon>mdi-share</v-icon>
                </v-btn>
              </GeneralCardTitleComponent>
                <referralsListComponent :data="referrals.level1">
                  Nivel 1
                </referralsListComponent>

              <v-divider></v-divider>
                <referralsListComponent :data="referrals.level2" 
                :listdisabled="referrals.level1.cant<10">
                  Nivel 2

                </referralsListComponent>

              <v-divider></v-divider>



                <referralsListComponent :data="referrals.level3" :listdisabled="referrals.level2.cant<10">
                  Nivel 3
                </referralsListComponent>
                <v-card-actions></v-card-actions>
              <v-dialog v-model="shareDialog" max-width="290">
                <v-card>
                  <v-card-title class="headline">Mi código de referido</v-card-title>
                  <v-card-text>
                    <v-text-field hide-details outlined readonly filled v-model="code"></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn small  width="40%" color="secondary" @click="copyUrl()">
                      <v-icon>mdi-content-copy</v-icon> URL
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn small width="40%" color="secondary" @click="copyCode()">
                      <v-icon>mdi-content-copy</v-icon> CODIGO
                    </v-btn>
                  </v-card-actions>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" block outlined @click="shareDialog = false">Cerrar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </generalCardComponent>
        </v-col>
    </v-row>
    <v-snackbar color="success darken-1" v-model="showSnackbar">
      {{ snackbarText }}
    </v-snackbar>

</v-container>
</template>

<script>
export default {
    layout:'withBackButton',
    data() {
      return {
        referrals:{
          level1:{
            cant:0
          },
          level2:{
            cant:0
          },
          level3:{
            cant:0
          }
        },
        shareDialog:false,
        showSnackbar:false,
        snackbarText:'',
        code:''
      }
    },
    created() {
    this.getReferrals()
  },
  mounted() {
    this.setCode()
  },
  methods:{
    async setCode() {
      const codeDecrypted = this.$auth.user.username + "-"+this.$auth.user.id
      this.code = await this.$store.dispatch('codegenerator/encrypt',codeDecrypted.toString())

    },
    getReferrals() {
      this.$axios.get(`/referrals/findReferrals/${this.$auth.user.id}`)
        .then((data)=>{
          this.referrals = data.data
          
        })
      },
  copyUrl(){
    const code = 12344
    const url = 'https://invierte.pages.dev/register/?code='+this.code
    this.snackbarText = "Url copiada con exito!"
    this.copyToClipboard(url)
    this.showSnackbar = true
  },
  copyCode(){
    this.snackbarText = "Codigo copiado con exito!"
    this.copyToClipboard(this.code)
    this.showSnackbar = true
  },
  copyToClipboard(value) {
    navigator.clipboard.writeText(value)
    this.snackbarText = "Texto copiado con exito!"
    this.showSnackbar = true
  },
  

    },


}
</script>

