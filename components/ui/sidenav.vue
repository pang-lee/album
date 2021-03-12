<template>
    <client-only>
        <v-sheet rounded="lg">
            <v-list color="transparent">
                <v-list-item v-if="sidestate == 'Dashboard'" @click="add()">
                    <v-icon class="addbook">{{ addBook }}</v-icon>
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
import { mapGetters, mapMutations } from 'vuex'
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
            ...mapMutations('books', ['SET_BOOKID']),
            generateUID() {
                let firstPart = (Math.random() * 46656) | 0
                let secondPart = (Math.random() * 46656) | 0
                firstPart = ("000" + firstPart.toString(36)).slice(-3)
                secondPart = ("000" + secondPart.toString(36)).slice(-3)
                return firstPart + secondPart
            },
            add(){
                let bookId = this.generateUID()
                this.SET_BOOKID(bookId)
                this.$router.push(this.$route.fullPath.slice(this.$route.fullPath.indexOf('/', 0), this.$route.fullPath.indexOf('/', 50)) + '/add?=' + bookId)
            }
        }
    }
</script>

<style lang="scss" scoped>
.addbook{
    position: relative;
    margin-left:40%
}
</style>