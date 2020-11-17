<template>
  <v-row class="mx-auto">
    <v-col>

  <v-card elevation="10">
    <v-card-subtitle class="font-weight-black font-italic text-center">Profile</v-card-subtitle>
    {{ window.width }} - {{ window.height }}
    <v-divider></v-divider>
    <br/>
    <v-img src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
      <v-avatar class="mr-5" :size="caculate_size">
        <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
      </v-avatar>
      <!-- <v-row align="end" class="fill-height">
        <v-col align-self="start" class="pa-0" cols="12">
          <v-avatar class="profile" color="grey" size="164" tile>
            <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <v-list-item-title class="title">
                Marcus Obrien
              </v-list-item-title>
              <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row> -->
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
      computed: {
        caculate_size(){
          if(this.window.width > this.window.height) return (this.window.width / this.window.height) * 100
          else return (this.window.height / this.window.width) * 100
        }
      },
      methods: {
        handleResize() {
          this.window.width = window.innerWidth;
          this.window.height = window.innerHeight;
        }
      },
      created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
      },
      destroyed() {
        window.removeEventListener('resize', this.handleResize);
      }
    }
</script>

<style lang="scss" scoped>

</style>