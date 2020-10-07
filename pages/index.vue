<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
            	<v-card class="elevation-12">
            	  <v-toolbar flat>
            	  <v-tabs fixed-tabs background-color="indigo" dark>
                  <v-tabs-slider color="cyan accent-2"></v-tabs-slider>
            	    <v-tab v-for="(status, index) in status" :key="status.select" @click="current_form(index)">
            	      <v-icon>{{ status.icon }}</v-icon>&nbsp;{{ status.select }}
            	    </v-tab>
            	  </v-tabs>
            	  </v-toolbar>
            	  <v-card-text>
            	    <keep-alive>
            	      <component :is="form"></component>
            	    </keep-alive>
            	  </v-card-text>
            	</v-card>


                {{c1}} -- c1
                {{c2}} -- c2
                <v-btn @click="test()">123</v-btn>

                {{getbook}}
                {{getToken}}

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import register from '~/components/form/register'
import login from '~/components/form/login'
import * as icon from '@mdi/js'

    export default {
        components:{
            login,
            register
        },
        data(){
            return{
                form: 'login',
                status:[
                    { select: 'login', icon: icon.mdiLogin },
                    { select: 'register', icon: icon.mdiNotebook }
                ]
            }
        },
        computed:{
            ...mapState('modA', {
                c1: state => state.name,
            }),
            ...mapGetters('modA', {
                c2: 'module'
            }),
            ...mapGetters('books', ['getbook']),
            ...mapGetters('authentication', ['getToken'])
        },
        methods:{
            ...mapMutations('modA', {
                setName: 'SET_NAME' 
            }),
            ...mapActions('modA', ['actionModule']),
            current_form(index){
                return index == 0 ? this.form = 'login' : this.form = 'register'
            },
            ...mapActions('books', ['fetchBookList']),
            test(){
                this.setName('change to this')
                this.actionModule("hello")
                this.fetchBookList()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>