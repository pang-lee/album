<template>
  <v-row v-if="!getInvalidStatus" align="center">
    <v-col class="hidden-md-and-up">
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>{{ menu }}</v-icon>
      </v-btn>
    </v-col>
    <v-dialog v-model="drawer" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="grey darken-1">
          <v-btn icon dark @click="drawer = false">
            <v-icon>{{ close }}</v-icon>
          </v-btn>
          <v-toolbar-title>歡迎使用作品集</v-toolbar-title>
        </v-toolbar>
        <v-list>

          <v-list-item @click.prevent="profile('mobile')">
            <div class="d-flex">
              <v-list-item-avatar>
                <client-only>
                  <v-img v-if="user.avatar" :src="user.avatar" alt="avatar"></v-img>
                  <v-icon v-else color="black">{{ defaultAvatar }}</v-icon>
                </client-only>
              </v-list-item-avatar>
              <div class="text-h6 mt-3">{{ user.first }} {{ user.last }}</div>
            </div>
          </v-list-item>

          <v-list-group v-for="(link, index) in links" :key="index" :append-icon="`${link.target == '登出' ? '' : chevron}`">
            <template v-slot:activator>
              <v-list-item-title @click="to_destination(link)">
                <v-icon>{{ link.icon }}</v-icon>&nbsp;{{ link.target }}
              </v-list-item-title>
            </template>

            <v-btn block text v-for="(side, index) in sidebar" :key="index" @click="drawer = false" nuxt :to="`/user/${$route.params.user}${side.link}`">
              <v-icon>{{ side.icon }}</v-icon>&nbsp;{{ side.data }}
            </v-btn>
          </v-list-group>
        </v-list>
      </v-card>
    </v-dialog>
    
    <v-col class="hidden-sm-and-down">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar size="60" class="ml-2" color="black" v-bind="attrs" v-on="on" @click.prevent="profile('desktop')">
          <client-only>
            <v-img v-if="user.avatar" :src="user.avatar" aspect-ratio="1.79" alt="avatar"></v-img>
            <v-icon v-else color="white">{{ defaultAvatar }}</v-icon>
          </client-only>
          </v-avatar>
        </template>
        <span>{{ user.first }} {{ user.last }}</span>
      </v-tooltip>
    </v-col>

    <v-col v-for="(link, index) in links" :key="index" class="hidden-sm-and-down">
      <v-btn text large nuxt @click="to_destination(link)">
        <v-icon>{{ link.icon }}</v-icon>&nbsp;{{ link.target }}
      </v-btn>
    </v-col>
  </v-row>
  <v-row v-else no-gutters>
    <v-col>
      <div class="d-flex justify-center">
        <v-btn text x-large plain nuxt to="/">
          <div class="font-italic">點我來製作屬於你的作品集&nbsp;<strong>!</strong></div>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import * as icon from '@mdi/js'

    export default {
      name: 'navbar',
      data() {
        return{
          drop: icon.mdiArrowDownDropCircleOutline,
          menu: icon.mdiMenu,
          close: icon.mdiClose,
          chevron: icon.mdiChevronDown,
          defaultAvatar: icon.mdiAccountCircleOutline,
          drawer: false,
          links: [
            { target: '作品集', route: '', icon: icon.mdiViewDashboardOutline },
            { target: '個人資料', route: '/profile/sticker', icon: icon.mdiFaceOutline },
            { target: '設定', route: '/setting/privacy', icon: icon.mdiCogOutline },
            { target: '登出', route: '/', icon: icon.mdiLogout }
          ],
          auth: this.$cookies.get('album_access_token')
        }
      },
      computed: {
        ...mapGetters('admin', ['sidebar', 'user']),
        ...mapGetters('authentication', ['getInvalidStatus'])
      },
      methods: {
        ...mapActions('authentication', ['logout']),
        ...mapMutations('admin', ['SET_SIDEBAR_STATUS']),
        to_destination(link){
          if(link.target == '登出'){
            this.SET_SIDEBAR_STATUS('作品集')
            this.logout()
            return this.$router.push(link.route)
          } else if (link.target == '作品集'){
            this.SET_SIDEBAR_STATUS(link.target)
            return this.$router.push(`/user/${this.$route.params.user}${this.sidebar[0].link}`)
          } else {
            this.SET_SIDEBAR_STATUS(link.target)
            return this.$router.push(`/user/${this.$route.params.user}${link.route}`)
          }
        },
        profile(device){
          this.SET_SIDEBAR_STATUS('個人資料')
          if(device == 'mobile') this.drawer = !this.drawer
          return this.$router.push(`/user/${this.$route.params.user}/profile/information`)
        }
      },
      created() {
        if(process.client) {
          if(!this.sidebar[0]) return null
          this.links[0].route = this.sidebar[0].link
        }
      },
    }
</script>

<style lang="scss" scoped>
.sub_group{
  position: relative;
  margin-left: 10vw;
}
</style>