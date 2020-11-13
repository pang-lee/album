<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">


      <!-- <flipbook class="flipbook" :pages="pages"></flipbook> -->


      <nuxt-content :document="doc"/>
    </v-col>
  </v-row>
</template>

<script>
// import flipbook from 'flipbook-vue'

export default {
  layout: 'user',
  // components:{
  //   flipbook
  // },
  async asyncData({ $content }) {
    const doc = await $content('hello').fetch()
    return { doc }
  },
  // data() {
  //   return {
  //     pages: [
  //          null,
  //          'https://cdn.vuetifyjs.com/images/cards/cooking.png',
  //          'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
  //          'https://cdn.vuetifyjs.com/images/cards/house.jpg',
  //          'https://cdn.vuetifyjs.com/images/cards/road.jpg'
  //          ]
  //   }
  // }
}
</script>

<style>
/* .flipbook .viewport {
  width: 57vw;
  height: 57vh;
} */
.flipbook{
  width: 85;
  height: 85vh;
}
</style> 
