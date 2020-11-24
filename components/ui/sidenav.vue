<template>
    <v-sheet rounded="lg">
        <v-list color="transparent">
            <v-list-item v-for="(item, index) in sidebar" :key="index" nuxt :to="`${$route.fullPath.slice($route.fullPath.indexOf('/', 0), $route.fullPath.indexOf('/', 40)) + item.link}`">
                <v-list-item-content>
                    <v-list-item-title>
                        <v-icon>{{ item.icon }}</v-icon>&nbsp;{{ item.data }}
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
            ...mapGetters('admin', ['sidebar'])
        }
    }
</script>

<style lang="scss" scoped>

</style>