<template>
    <section class="primary-gradient fill-height">
        <v-dialog :value="dialog" fullscreen>
            <v-card color="transparent" height="100vh" width="100vw"
                class="d-flex justify-center align-center primary-gradient">
                <div>
                    <v-img src="/logo.svg" width="100%"></v-img>
                    <div class="text-center white--text">
                        <span class="text-h6">Invierte en</span><br><span class="font-weight-bold text-h3">Batumi</span>
                    </div>

                </div>
            </v-card>
        </v-dialog>
        <v-container>
            <v-card color="transparent" flat class="mt-6">
                <v-card-title class="d-flex justify-center">
                    <img contain src="/logo.svg" width="120px">
                </v-card-title>
                <v-card-text class="mt-16">
                    <v-text-field label="Nombre de usuario" v-model="user.username"></v-text-field>
                    <v-text-field color="white" label="Contrasena" v-model="user.password"></v-text-field>
                </v-card-text>
            </v-card>
            <v-card-actions>
                <v-btn rounded block depressed x-large class="font-weight-bold" @click="login()">ENTRAR</v-btn>
            </v-card-actions>
            <v-card-actions>
                <v-btn rounded block depressed x-large to="/register" outlined class="font-weight-bold">REGISTRARSE</v-btn>
            </v-card-actions>

        </v-container>
    </section>
</template>

<script>
    export default {
        layout: 'empty',
        data() {
            return {
                dialog: true,
                user:{}
            }
        },
        created() {
            setTimeout(() => {
                this.dialog = false
            }, 5000);
        },
        methods: {
            login() {

                this.$auth.loginWith('local', {
                    data: {
                        identifier: this.user.username,
                        password: this.user.password
                    }
                }).then((response) => {
                    this.$router.push('/')
                    console.log(response)
                    resolve(response)
                }).catch((error) => {
                    console.log(error)
                    reject(error)
                })
            }
        }
    }
</script>

<style lang="scss">
    .primary-gradient {
        background: linear-gradient(#CA4282, #269aa4) !important;
    }

    .v-label {
        color: white !important;
        font-weight: bold;
    }

    .theme--light.v-text-field>.v-input__control>.v-input__slot:before {
        background: white !important;
        height: 3px !important
    }
</style>