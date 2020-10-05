<template>
    <div>
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>

        <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn>
    </div>
</template>

<script>
    export default {
        data() {
            return{
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