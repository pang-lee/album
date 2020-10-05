<template>
    <v-row v-if="auth">
        <v-col>
            <v-avatar color="grey darken-1" size="32"></v-avatar>
        </v-col>
        <v-col v-for="link in links" :key="link" >
            <v-btn text>{{ link }}</v-btn>
        </v-col>
    </v-row>
    <v-row v-else>
        <h1>TEST</h1>
    </v-row>
</template>

<script>
    export default {
        data() {
            return{
                auth: false,
                links: [
                    'Dashboard',
                    'Messages',
                    'Profile',
                    'Updates',
                    'User'
                ],
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>