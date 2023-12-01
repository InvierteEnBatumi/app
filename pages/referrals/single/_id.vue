<template>
    <v-container>
        <portal to="title-toolbar">
            {{ user.name }} {{ user.lastname }}
        </portal>
        <v-row>
            <v-col class="col-12">
                <generalCardComponent>
                    <GeneralCardTitleComponent>Inversiones</GeneralCardTitleComponent>
                    <v-card-text>
                        <v-row no-gutters>
                            <v-col class="col-3">

                            </v-col>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    NOMBRE
                                </span>
                            </v-col>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    $ MERCADO
                                </span> 
                            </v-col>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    GANANCIAS
                                </span> 
                            </v-col>
                        </v-row>
                        <v-row no-gutters v-for="property in properties.data" :key="property.id">
                            <v-col class="col-3">
                                <v-avatar>
                                    <v-img></v-img>
                                </v-avatar>
                            </v-col>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    {{ property.name }}
                                </span>
                            </v-col>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text text-center">
                                    $ {{ property.data.market_value }}
                                </span>
                            </v-col>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    $ {{ calculateEarnings(property.data.market_value) }}
                                </span>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </generalCardComponent>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        layout: 'withBackButton',
        filters: {},
        data() {
            return {
                user: {},
                settings: {},
                commission: 0
            }
        },
        created() {
            this.getPromotions()
            this.getSettings()
            this.getUser()
        },
        methods: {
            calculateEarnings(market_value) {
                return market_value * (this.commission / 100)
            },

            async getSettings() {
                this.$axios.get('/setting')
                    .then((data) => {
                        const level = this.$route.query.level
                        this.settings = data.data.data
                        this.commission = this.settings[`comission_${level}`]
                    })
            },
            async getPromotions() {
                const idClient = this.$route.params.id
                await this.$store.dispatch('promotions/findAll', {
                    filters: {
                        type: 'Inversion',
                        clients: [idClient]

                    }
                })
            },
            async getUser() {
                const idClient = this.$route.params.id
                this.$axios.get(`/users/${idClient}`)
                    .then((data) => {
                        this.user = data.data
                    })
            }

        },
        computed: {
            properties() {
                return this.$store.getters['promotions/getAll']
            },

        }
    }
</script>