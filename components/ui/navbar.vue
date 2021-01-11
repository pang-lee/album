<template>
  <v-row v-if="auth" align="center">
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
          <v-toolbar-title>Album</v-toolbar-title>
        </v-toolbar>
        <v-list>

          <v-list-item @click.prevent="profile('mobile')">
            <div class="d-flex">
              <v-list-item-avatar>
                <v-img :src="user.avatar" alt="avatar"></v-img>
              </v-list-item-avatar>
              <div class="text-h6 mt-3">{{ user.first }} {{ user.last }}</div>
            </div>
          </v-list-item>

          <v-list-group v-for="(link, index) in links" :key="index" :append-icon="`${link.target == 'Logout' ? '' : chevron}`">
            <template v-slot:activator>
              <v-list-item-title @click="to_destination(link)">
                <v-icon>{{ link.icon }}</v-icon>&nbsp;{{ link.target }}
              </v-list-item-title>
            </template>

            <v-list-group sub-group v-for="(side, index) in sidebar" :key="index">
              <template v-slot:activator>
                  <v-list-item nuxt :to="`${$route.fullPath.slice($route.fullPath.indexOf('/', 0), $route.fullPath.indexOf('/', 40)) + side.link}`" @click="drawer = false">
                    <v-list-item-title>
                      <v-icon>{{ side.icon }}</v-icon>&nbsp;{{ side.data }}
                    </v-list-item-title>
                  </v-list-item>
              </template>
            </v-list-group>
          </v-list-group>
        </v-list>
      </v-card>
    </v-dialog>

    <v-col class="hidden-sm-and-down">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar size="60" class="ml-2" v-bind="attrs" v-on="on" @click.prevent="profile('desktop')">
            <v-img :src="user.avatar" alt="avatar"></v-img>
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
    <v-col cols="11">
      <div class="text-center mt-6 pl-12">
        <strong class="font-italic">Create Your's Album Now!</strong>
      </div>
    </v-col>
    <v-col cols="1">
        <!-- <v-select :items="items" label="LANG" dense class="mt-4" :append-icon="drop" eager solo></v-select> -->
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import * as icon from '@mdi/js'

    export default {
      name: 'navbar',
      data() {
        return{
          drop: icon.mdiArrowDownDropCircleOutline,
          menu: icon.mdiMenu,
          close: icon.mdiClose,
          chevron: icon.mdiChevronDown,
          drawer: false,
          links: [
            { target: 'Dashboard', route: '/dashboard/self1', icon: icon.mdiViewDashboardOutline },
            { target: 'Profile', route: '/profile/sticker', icon: icon.mdiFaceOutline },
            { target: 'Setting', route: '/setting/privacy', icon: icon.mdiCogOutline },
            { target: 'Logout', route: '/', icon: icon.mdiLogout }
          ]
        }
      },
      computed: {
        ...mapGetters('admin', ['sidebar', 'user']),
        auth(){
          if(this.$cookies.get('album_access_token')) return true
          else return false
        }
      },
      methods: {
        ...mapActions('authentication', ['logout']),
        ...mapMutations('admin', ['SET_SIDEBAR_STATUS']),
        to_destination(link){
          if(link.target == 'Logout'){
            this.logout()
            return this.$router.push(link.route)
          } else {
            this.SET_SIDEBAR_STATUS(link.target)
            return this.$router.push(`/user${this.$route.path.slice(this.$route.path.indexOf('/', 4), this.$route.path.indexOf('/', 6))}${link.route}`)
          }
        },
        profile(device){
          this.SET_SIDEBAR_STATUS('Profile')
          if(device == 'mobile') this.drawer = !this.drawer
          return this.$router.push(`/user${this.$route.path.slice(this.$route.path.indexOf('/', 4), this.$route.path.indexOf('/', 6))}/profile/information`)
        }
      },
    }
</script>

<style lang="scss" scoped>

</style>