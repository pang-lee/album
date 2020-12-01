<template>
  <v-app>
    <v-app-bar app color="white" extended extension-height="30" flat>
      <v-container class="py-0 fill-height">
        <navbar/>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2" class="hidden-sm-and-down">
            <sidenav/>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <nuxt/>
            </v-sheet>
            <SocialChat :attendants="attendants" class="chat">
              <div slot="header" class="text-subtitle-1 text-center font-italic">Contact Us With :</div>
              <template v-slot:button="{ open }">
                <span v-show="!open"><v-icon color="white">{{ contact }}</v-icon></span>
                <span v-show="open"><v-icon color="white">{{ close }}</v-icon></span>
              </template>
              <div slot="footer" class="text-subtitle-2 text-center font-italic">We will response as soon as possible!</div>
            </SocialChat>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { SocialChat } from 'vue-social-chat'
import * as icon from '@mdi/js'

  export default {
    middleware: ['check-auth','admin'],
    components: {
      SocialChat
    },
    data() {
      return {
        attendants: [
          {
            app: 'whatsapp',
            label: 'Support',
            name: 'Alan Ktquez',
            number: 'YOUR_PHONE_NUMBER',
            avatar: {
              src: 'https://avatars0.githubusercontent.com/u/8084606?s=460&u=20b6499a416cf7129a18e5c168cf387e159edb1a&v=4',
              alt: 'Avatar Support Alan Ktquez'
            }
          },
          {
            app: 'messenger',
            label: 'Technical support',
            name: 'Alan Ktquez',
            id: 'YOUR_FACEBOOK_ID',
            avatar: {
              src: 'https://avatars0.githubusercontent.com/u/8084606?s=460&u=20b6499a416cf7129a18e5c168cf387e159edb1a&v=4',
              alt: 'Alan Ktquez avatar'
            }
          },
          {
            app: 'twitter',
            label: 'Human Resources',
            name: 'Alan Ktquez',
            id: 'YOUR_TWITTER_ID',
            avatar: {
              src: 'https://avatars0.githubusercontent.com/u/8084606?s=460&u=20b6499a416cf7129a18e5c168cf387e159edb1a&v=4',
              alt: 'Avatar Support Alan Ktquez'
            }
          }
        ],
        contact: icon.mdiPhoneOutline,
        close: icon.mdiClose
      }
    }
  }
</script>

<style lang="scss" scoped>
.chat {
  --messenger:#A9A9A9;
  --vsc-bg-header: var(--messenger);
  --vsc-bg-button: var(--messenger);
  --vsc-outline-color: var(--messenger);
}
</style>