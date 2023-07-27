<template>
  <section>
    <portal to="title-toolbar">
      {{ post.title }}
    </portal>
    <v-container>
      <v-row>
        <v-col class="col-12">
          <v-card class="rounded-lg">
            <v-img :src="post.image" height="300">
            </v-img>
            <v-card-title class="font-weight-bold">
                {{ post.title }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="black--text">
              {{ post.content }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </section>
</template>


<script>
  import news from '~/static/news.json'
  import moment from 'moment'
  export default {
    layout: 'withBackButton',
    data() {
      return {
        news: news
      }
    },
    methods: {
      formatDate(date) {
        return moment(date).format('DD/MM/YYYY')
      }
    },
    computed: {
      post() {
        const post = this.news.find((p) => {
          return p.id === parseInt(this.$route.params.id)
        })
        return post
      }
    }
  }

</script>
