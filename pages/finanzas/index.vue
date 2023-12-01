<template>
    <v-container>
        <portal to="title-toolbar">
            Finanzas
        </portal>
        <v-row>
            <v-col class="col-12">
                <generalCardComponent>
                    <GeneralCardTitleComponent>
                        Mis inversiones
                        <v-spacer></v-spacer>
                    </GeneralCardTitleComponent>
                    <v-card-text>
                        <v-row no-gutters>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    PROPIEDAD
                                </span>
                            </v-col>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    $ INV
                                </span>
                            </v-col>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    $ GAN
                                </span>
                            </v-col>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    $ REST
                                </span>
                            </v-col>
                            <v-col class="col-12">
                                <v-divider></v-divider>
                            </v-col>
                        </v-row>
                        <v-row no-gutters v-for="property in properties.data" :key="property.id">
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    {{ property.name }}
                                </span>
                            </v-col>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    $ {{ property.data.contributed_capital }}
                                </span>
                            </v-col>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    $ {{ property.data.market_value - property.data.price }}
                                </span>
                            </v-col>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    $
                                    {{ property.data.price - (property.data.market_value - property.data.price) -property.data.contributed_capital   }}
                                </span>
                            </v-col>
                            <v-col class="col-12">
                                <v-divider></v-divider>
                            </v-col>

                        </v-row>
                        <v-row no-gutters>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    TOTALES
                                </span>
                            </v-col>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    $ {{ getTotalContributedCapital }}
                                </span>
                            </v-col>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    $ {{ getTotalEarned }}
                                </span>
                            </v-col>
                            <v-col class="col-3 text-center">
                                <span class="text-overline font-weight-black black--text">
                                    $ {{ getTotalRestante }}
                                </span>
                            </v-col>

                        </v-row>

                    </v-card-text>
                    <v-card-text>
                        <graphComponent :xAxis="xAxisGraph" :yAxis="yAxisGraph"></graphComponent>

                    </v-card-text>


                </generalCardComponent>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    import qs from 'qs'

    export default {
        layout: 'withBackButton',
        data() {
            return {
                properties: {
                    data:[]
                }
            }
        },
        created() {
            this.getProperties()
        },
        methods: {
            getProperties() {
                this.$axios.get('/promotions/?populate=*', {
                    params: {
                        filters: {
                            type: 'Inversion'
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
        computed: {
            getTotalContributedCapital() {
                let total = 0;
                this.properties.data.forEach(property => {
                    total += property.data.contributed_capital;
                });
                return total;
            },
            getTotalEarned() {
                let total = 0;
                this.properties.data.forEach(property => {
                    total += (property.data.market_value - property.data.price);
                });
                return total;
            },
                xAxisGraph() {
                    const uniqueYears = [...new Set(this.properties.data.map(property => new Date(property.data.start_date).getFullYear()))];
                    return uniqueYears;
            },
            yAxisGraph() {
                let totalByYear = {};
                this.properties.data.forEach(property => {
                    const year = new Date(property.start_date).getFullYear();
                    if (totalByYear[year]) {
                        totalByYear[year] += (property.data.market_value - property.data.price);
                    } else {
                        totalByYear[year] = (property.data.market_value - property.data.price);
                    }
                });
                return Object.values(totalByYear);
            },

            getTotalRestante() {
                let total = 0;
                this.properties.data.forEach(property => {
                    total += (property.data.price - (property.data.market_value - property.data.price) -
                        property.data.contributed_capital);
                });
                return total;
            }

        }

    }
</script>

<style>

</style>