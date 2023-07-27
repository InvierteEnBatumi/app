<template>
    <v-card class="rounded-lg" elevation="6">
      <v-img  height="150" :src="post.image">
          <v-chip color="white" class="mt-3 ml-3 text-subtitle-1 pa-3 font-weight-extra-bold text-capitalize">
            {{ post.title }}
          </v-chip>
      </v-img>
      <v-card-text class="black--text">
        {{ post.content }}
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    props:{
      post:{
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style>
  
  </style>