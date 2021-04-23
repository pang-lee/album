<template>
    <v-row class="mx-auto">
        <v-col>
            <client-only>
                <v-card elevation="10">
                    <v-card-subtitle class="font-weight-black font-italic text-center">Privacy</v-card-subtitle>
                    <v-divider></v-divider>
                    <br/>
                    <div class="d-flex flex-column align-center">
                        <v-select v-model="privated" :items="items" label="Choose the album privacy" outlined dense></v-select>
                    </div>
                    <v-divider></v-divider>
                    <div class="d-flex justify-center mt-5">
                        <v-btn outlined color="primary" class="mb-5" @click="setprivacy($route.params.user)">Save</v-btn>
                    </div>
                </v-card>
            </client-only>
            
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

    export default {
        name: 'privacy',
        layout: 'user',
        data(){
            return {
                items: ['Share All', 'Share I Selected', 'Do Not Share Any']
            }
        },
        computed:{
            ...mapGetters('admin', ['user']),
            privated:{
                get(){
                    return this.user.privacy
                },
                set(value){
                    return this.SET_PRIVACY(value)
                }
            }
        },
        methods: {
            ...mapMutations('admin', ['SET_PRIVACY']),
            ...mapActions('admin', ['setprivacy'])
        }
    }
</script>

<style lang="scss" scoped>

</style>