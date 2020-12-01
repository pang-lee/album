<template>
  <v-card class="flex brown darken-2" flat tile>
    <v-card-title class="grey darken-2">
      <strong class="subheading white--text font-weight-bold font-italic">Get connected with us on social networks!</strong>

      <v-spacer></v-spacer>

      <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
        <v-icon size="24px">
          {{ icon }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="py-2 white--text text-center">
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </v-card-text>
  </v-card>
</template>

<script>
import * as icon from '@mdi/js'
    
  export default {
    data(){
      return{
        icons: [ icon.mdiFacebook, icon.mdiTwitter, icon.mdiLinkedin, icon.mdiInstagram ],
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>