<template>
    <client-only>
        <v-sheet rounded="lg">
            <v-list color="transparent">
                <v-list-item v-if="sidestate == 'Dashboard'" @click="add()">
                    <v-icon class="ml-7">{{ addBook }}</v-icon>
                </v-list-item>
                <v-divider v-if="sidestate == 'Dashboard'"></v-divider>
                <v-list-item v-for="(item, index) in sidebar" :key="index" nuxt :to="`${$route.fullPath.slice($route.fullPath.indexOf('/', 0), $route.fullPath.indexOf('/', 40)) + item.link}`">
                    <v-list-item-content>
                        <v-list-item-title>
                            <v-icon>{{ item.icon }}</v-icon>&nbsp;{{ item.data }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-sheet>
    </client-only>
</template>

<script>
import { mapGetters } from 'vuex'
import * as icon from '@mdi/js'

    export default {
        name: 'sidenav',
        data() {
            return {
                addBook: icon.mdiEyedropperPlus
            }
        },
        computed: {
            ...mapGetters('admin', ['sidebar', 'sidestate'])
        },
        methods: {
            add(){
                this.$router.push(this.$route.fullPath.slice(this.$route.fullPath.indexOf('/', 0), this.$route.fullPath.indexOf('/', 50)))
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>