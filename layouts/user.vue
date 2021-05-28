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
              <div slot="header" class="text-subtitle-1 text-center font-italic">使用以下方式來聯繫我 :</div>
              <template v-slot:button="{ open }">
                <span v-show="!open"><v-icon color="white">{{ contact }}</v-icon></span>
                <span v-show="open"><v-icon color="white">{{ close }}</v-icon></span>
              </template>
              <div slot="footer" class="text-subtitle-2 text-center font-italic">我會盡快回復給您 !</div>
            </SocialChat>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { SocialChat } from 'vue-social-chat'
import navbar from '~/components/ui/navbar'
import sidenav from '~/components/ui/sidenav'
import * as icon from '@mdi/js'

  export default {
    name: 'user',
    middleware: ['check-auth','admin'],
    components: {
      SocialChat,
      navbar,
      sidenav
    },
    data() {
      return {
        attendants: [
          {
            app: 'messenger',
            label: 'FB Messanger 聯絡製作人',
            name: 'Pang龐德',
            id: '101317471923604',
            avatar: {
              src: process.env.BASE_URL + '/avatar.png',
              alt: 'Pang'
            }
          },
          {
            label: 'Email 聯繫製作人',
            name: '94justpang@gmail.com',
            avatar: {
              src: process.env.BASE_URL + '/avatar.png',
              alt: 'Pang'
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