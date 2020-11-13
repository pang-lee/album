<template>
    <v-sheet rounded="lg">
        <v-list color="transparent">
            <v-list-item v-for="(item, index) in sidebar" :key="index" nuxt :to="`${$route.fullPath.slice($route.fullPath.indexOf('/', 0), $route.fullPath.indexOf('/', 40)) + item.link}`">
                <v-list-item-content>
                    <v-list-item-title>{{ item.data }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item link color="grey lighten-4">
                <v-list-item-content>
                    <v-list-item-title>
                      Refresh
                      {{side_status}}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-sheet>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters('admin', ['side_status']),
            sidebar(){
                switch (this.side_status) {
                    case 'Dashboard':
                        return [
                            { link: '/dashboard/self1', data: 'a' },
                            { link: '/dashboard/self2', data: 'b' },
                            { link: '/dashboard/self3', data: 'c' },
                        ]
                        break
                    case 'Profile':
                        return [
                            { link: '/profile/self1', data: 'b' },
                            { link: '/profile/self2', data: 'a' },
                            { link: '/profile/self3', data: 'c' },
                        ]
                        break
                    case 'Setting':
                        return [
                            { link: '/setting/self1', data: 'c' },
                            { link: '/setting/self2', data: 'b' },
                            { link: '/setting/self3', data: 'a' },
                        ]
                        break
                    default: return ['a', 'b', 'c', 'this is dash']
                        break
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>