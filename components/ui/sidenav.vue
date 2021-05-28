<template>
    <client-only>
        <v-sheet rounded="lg">
            <v-list color="transparent">
                <v-list-item v-if="sidestate == '作品集'" nuxt :to="`/user/${$route.params.user}/dashboard/add`">
                    <v-icon class="addbook">{{ addBook }}</v-icon>
                </v-list-item>
                <v-divider v-if="sidestate == 'Dashboard'"></v-divider>
                <v-list-item v-for="(item, index) in sidebar" :key="index" nuxt :to="`/user/${$route.params.user}${item.link}`">
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
        }
    }
</script>

<style lang="scss" scoped>
.addbook{
    position: relative;
    margin-left:40%
}
</style>