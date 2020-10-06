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

                <ul>
                    <li v-for="character in characters.results" :key="character.id">
                        {{character.name}}
                        {{character.status}}
                    </li>
                </ul>

            </v-col>
        </v-row>    
    </v-container>
</template>

<script>
import * as icon from '@mdi/js'
import login from '~/components/form/login'
import register from '~/components/form/register'
import gql from 'graphql-tag'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

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
        },
        methods:{
            ...mapMutations('modA', {
                setName: 'SET_NAME' 
            }),
            ...mapActions('modA', ['actionModule']),
            current_form(index){
                return index == 0 ? this.form = 'login' : this.form = 'register'
            },
            test(){
                this.setName('change to this')
                this.actionModule("hello")
            }
        },
        apollo:{
            characters: gql`
                query getCharacters{
                    characters{
                        results{
                            id
                            name
                            status
                        }
                    }
                }`
        }
    }
</script>

<style lang="scss" scoped>

</style>