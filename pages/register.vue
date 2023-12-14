<template>
    <section class="primary-gradient fill-height">
        <v-container>
            <v-card color="transparent" flat class="mt-6">

                <v-form ref="form">
                    <v-card-title class="d-flex justify-center">
                        <img contain src="/logo.svg" width="120px">
                    </v-card-title>
                    <v-card-title class="d-flex justify-center font-weight-bold">
                        REGISTRATE AHORA!
                    </v-card-title>


                    <v-card-text>
                        <v-form ref="form">
                        <v-row>
                            <v-col class="col-12">
                                <v-text-field class="white--text" v-model="client.name" required label="Nombre"></v-text-field>
                            </v-col>
                            <v-col class="col-12">
                                <v-text-field class="white--text" v-model="client.lastname" required label="Apellido">
                                </v-text-field>
                            </v-col>
                            <v-col class="col-12">
                                <v-text-field class="white--text" v-model="client.address" required label="Direccion">
                                </v-text-field>
                            </v-col>
                            <v-col class="col-12">
                                <v-text-field class="white--text" v-model="client.phone" required label="Telefono" type="number">
                                </v-text-field>
                            </v-col>
                            <v-col class="col-12">
                                <v-text-field class="white--text" v-model="client.email" required label="Email">
                                </v-text-field>
                            </v-col>
                            <v-col class="col-12">
                                <v-text-field class="white--text" v-model="client.password" required label="Password" type="password">
                                </v-text-field>
                            </v-col>

                            <v-col class="col-12">
                                <v-text-field v-model="referredCode" :filled="referredDisabled"
                                    :readonly="referredDisabled" label="CODIGO DE REFERIDO">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        </v-form>
                    </v-card-text>
                </v-form>
                <v-card-actions>
                    <v-btn rounded block depressed x-large class="font-weight-bold" @click="registerClient()">REGISTRARSE</v-btn>
                </v-card-actions>

            </v-card>

        </v-container>
    </section>
</template>

<script>
    import axios from 'axios'
    export default {
        layout: 'empty',
        data() {
            return {
                referredCode: '',
                client: {},
                referredDisabled: false
            }
        },
        mounted() {
            if (this.$route.query.code != undefined) {
                this.referredDisabled = true
                this.referredCode = this.$route.query.code
            }
        },
        methods: {
            async registerClient() {
                const codeEncrypted = this.$route.query.code
                if(this.referredCode) {
                    const code = await this.$store.dispatch('codegenerator/decrypt',this.referredCode.toString())
                    console.log(code)
                    if(code.indexOf("-")){
                        var rerferredId = code.split("-")[1]
                        this.client.referred = rerferredId
                    }

                }
                if(!this.$refs.form.validate()) return
                this.client.username = this.client.email
                axios.post('https://batumi.app.brupadev.tech/api/auth/local/register', {
                        ...this.client,
                    })
                    .then((data)=>{
                        if(this.referredCode){
                            axios.put('https://batumi.app.brupadev.tech/api/users/'+this.client.referred,{
                                    referrals:[data.data.user.id]
                            })
                        }
                    })
                    .then((data)=>{
                        this.$auth.loginWith('local', {
                    data: {
                        identifier: this.client.username,
                        password: this.client.password
                    }
                    }).then((response) => {
                        this.$router.push('/')
                    })
                    })
            }
        }
    }
</script>

<style>

</style>