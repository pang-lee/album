<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
            <nuxt-content :document="doc"/>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        layout: 'user',
        async asyncData({ $content }) {
            const doc = await $content('hello').fetch()
            return { doc }
        }
    }
</script>

<style lang="scss" scoped>

</style>