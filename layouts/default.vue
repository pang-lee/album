<template>
    <v-app>
        <v-app-bar app dense dark>
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
    export default {

    }
</script>

<style lang="scss" scoped>

</style>