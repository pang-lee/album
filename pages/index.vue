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
                    <v-divider></v-divider>
                    <br/>
                    <v-btn x-large block outlined color="indigo" nuxt to="/freetrial">
                        <v-icon>{{ free }}</v-icon>&nbsp;&nbsp;免費試用
                    </v-btn>
            	  </v-card-text>
            	</v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import register from '~/components/form/register'
import login from '~/components/form/login'
import * as icon from '@mdi/js'

    export default {
        name: 'index',
        components:{
            login,
            register
        },
        data(){
            return{
                form: 'login',
                status:[
                    { select: '登入', icon: icon.mdiLogin },
                    { select: '註冊', icon: icon.mdiNotebook }
                ],
                free: icon.mdiDatabaseEditOutline
            }
        },
        methods:{
            current_form(index){
                return index == 0 ? this.form = 'login' : this.form = 'register'
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>