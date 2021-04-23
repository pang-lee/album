<template>
    <v-app>
        <v-app-bar app dark>
            <v-container fluid>
                <navbar/>
            </v-container>
        </v-app-bar>

        <v-spacer/>

        <v-main>
            <v-container fluid>
                <nuxt/>
            </v-container>
        </v-main>

        <v-footer app padless absolute>
            <foot/>
        </v-footer>
    </v-app>
</template>

<script>
import navbar from '~/components/ui/navbar'
import foot from '~/components/ui/foot'
    export default {
        name: 'default',
        components:{
            navbar,
            foot
        }
    }
</script>

<style lang="scss" scoped>

</style>