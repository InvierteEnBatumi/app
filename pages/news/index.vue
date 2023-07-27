<template>
    <v-container>
      <v-row>
        <v-col class="col-12" v-for="(post,index) in news" :key="index">
          <router-link tag="div" :to="`/news/single/${post.id}`">
            <newsCardComponent :post="post"></newsCardComponent>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import news from '~/static/news.json'
  export default {
    name: 'IndexPage',
    data() {
      return {
        news: news
      }
    },

  }
  </script>
  