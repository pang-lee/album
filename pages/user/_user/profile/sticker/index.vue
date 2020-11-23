<template>
  <v-row class="mx-auto">
    <v-col>
      <v-card elevation="10">
        <v-card-subtitle class="font-weight-black font-italic text-center">Profile</v-card-subtitle>
        <v-divider></v-divider>
        <br/>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
          <div class="d-flex justify-center ma-7">
            <v-avatar :size="(window.width / window.height) * 150">
              <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
            </v-avatar>
          </div>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    layout: 'user',
    data() {
      return {
        window: {
          width: 0,
          height: 0
        }
      }
    },
    methods: {
      handleResize() {
        this.window.width = window.innerWidth
        this.window.height = window.innerHeight
      }
    },
    created() {
      if(process.client){
        window.addEventListener('resize', this.handleResize)
        this.handleResize()          
      }
    },
    destroyed() {
      if(process.client){
        window.removeEventListener('resize', this.handleResize)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>