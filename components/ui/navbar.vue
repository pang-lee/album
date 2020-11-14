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
          <v-list-group v-for="(link, index) in links" :key="index">
            <template v-slot:activator>
              <v-list-item-title @click="to_destination(link)">{{ link.target }}</v-list-item-title>
            </template>

            <v-list-group sub-group v-for="(side, index) in sidebar" :key="index">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{ side.data }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-group>

          </v-list-group>


          <!-- <v-list-group v-for="n in 2" :key="n">
            <template v-slot:activator>
              <v-list-item-title>Users{{n}}</v-list-item-title>
            </template>

            <v-list-group sub-group>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Admin{{n}}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-group>

            <v-list-group sub-group>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Admin{{n}}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-group>

          </v-list-group> -->

        </v-list>
      </v-card>
    </v-dialog>

    <v-col>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar size="60" class="ml-2" v-bind="attrs" v-on="on" @click.prevent="profile()">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
          </v-avatar>
        </template>
        <span>{{ FullName }}</span>
      </v-tooltip>
    </v-col>

    <v-col v-for="(link, index) in links" :key="index" class="hidden-sm-and-down">
      <v-btn text large nuxt @click="to_destination(link)">{{ link.target }}</v-btn>
    </v-col>

    <v-col md="2" sm="2" class="hidden-md-and-up">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>{{ drop }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(link, index) in links" :key="index" @click="to_destination(link)">
              <v-list-item-title>{{ link.target }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
  <v-row v-else no-gutters>
    <v-col cols="11">
      <div class="text-center mt-6 pl-12">
        <strong class="font-italic">Create Your's Album Now!</strong>
      </div>
    </v-col>
    <v-col cols="1">
        <v-select :items="items" label="LANG" dense class="mt-4" :append-icon="drop" eager solo></v-select>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import * as icon from '@mdi/js'

    export default {
        data() {
          return{
            drop: icon.mdiArrowDownDropCircleOutline,
            menu: icon.mdiMenu,
            close: icon.mdiClose,
            drawer: false,
            selected: 0,
            links: [
              { target: 'Dashboard', route: '/dashboard/self1'},
              { target: 'Profile', route: '/profile/self1'},
              { target: 'Setting', route: '/setting/self1'},
              { target: 'Logout', route: '/'}
            ],
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            admins: [
              ['Management', 'mdi-account-multiple-outline'],
              ['Settings', 'mdi-cog-outline'],
            ],
            FullName: 'John Doe'
          }
        },
        computed: {
          ...mapGetters('admin', ['sidebar']),
          auth(){
            if(this.$cookies.get('jwt')) return true
            else return false
          }
          ,
          selectedItem:{
            get(){
              return this.selected
            },
            set(value){
              return this.selected = value
            }
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
          profile(){
            this.selected = 1
            this.SET_SIDEBAR_STATUS('Profile')
            return this.$router.push(`/user${this.$route.path.slice(this.$route.path.indexOf('/', 4), this.$route.path.indexOf('/', 6))}/profile/self1`)
          }
        },
    }
</script>

<style lang="scss" scoped>

</style>