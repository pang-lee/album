<template>
    <v-row class="mx-auto">
        <v-col>
            <client-only>
                <v-card elevation="10">
                    <v-card-subtitle class="font-weight-black font-italic text-center">隱私權設定</v-card-subtitle>
                    <v-divider></v-divider>
                    <br/>
                    <div class="d-flex flex-column align-center">
                        <v-select v-model="privated" :items="items" label="選擇您作品集的權限" outlined dense></v-select>
                    </div>
                    <v-divider></v-divider>
                    <div class="d-flex justify-center mt-5">
                        <v-btn outlined color="primary" class="mb-5" @click="setprivacy($route.params.user)">儲存</v-btn>
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
                items: ['全部分享', '分享我選擇的', '全部都不要分享']
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