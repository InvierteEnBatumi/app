<template>
    <v-card-text class="p-relative">
        <div class="layer d-flex justify-center align-center" v-if="listdisabled">
                  <v-alert shaped dense type="warning" width="80%" class="text-caption black--text text-uppercase font-weight-black">
                    Este nivel no sera desbloqueado hasta que consigas 10 referidos del nivel anterior
                  </v-alert>
                </div>

        
        <v-card-subtitle class="text-h6  font-weight-bold black--text d-flex">
            <slot></slot>
            <v-spacer></v-spacer>
            <v-chip label color="secondary">
                {{ data.cant }} &nbsp;<v-icon>mdi-account</v-icon>
            </v-chip>
        </v-card-subtitle>
        <v-card-text>
            <v-list dense>
                <v-list-item v-for="referral in data.data" :key="referral.id" class="px-0">
                    <v-list-item-icon>
                        <v-avatar size="50" color="primary">
                            <v-icon color="white">mdi-account</v-icon>
                        </v-avatar>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>
                            {{ referral.name }} {{ referral.lastname }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ referral.email }}
                        </v-list-item-subtitle>

                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn fab small depressed :to="`/referrals/single/${referral.id}?level=${level}`">
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>

        </v-card-text>

    </v-card-text>
</template>

<script>
    export default {
        props: {
            listdisabled:{
                type:Boolean,
                default:false
            },
            level:{
                type:String,
                default:'level_1'
            },
            data: {
                type: Object,
                default: {}
            }
        }
    }
</script>

<style>
.layer{
  position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.38);
    z-index: 100;
}
</style>