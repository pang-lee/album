<template>
  <v-card class="flex brown darken-2" flat tile>
    <v-card-title class="grey darken-2">
      <v-row>
        <v-col>
          <div class="d-flex justify-center">
            <v-btn v-for="(social, index) in socials" :key="index" class="mx-4" dark icon large :href="social.href" target="_blank">
              <v-icon size="24px">
                {{ social.icon }}
              </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-title>
  </v-card>
</template>

<script>
import * as icon from '@mdi/js'
    
  export default {
    name: 'foot',
    data(){
      return{
        socials:[
          { icon: icon.mdiFacebook, href: process.env.FACEBOOK_OFFICIAL },
          { icon: icon.mdiInstagram, href: process.env.INSTAGRAM_OFFICIAL },
          { icon: icon.mdiYoutube, href: process.env.YOUTUBE_OFFICIAL },
          { icon: icon.mdiLinkedin, href: process.env.LINKEDIN_OFFICIAL }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>