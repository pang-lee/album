<template>
    <div>
        {{user}}
        <v-btn @click="fetchMe()">123</v-btn>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

    export default {
        computed:{
            ...mapGetters('admin', ['user'])
        },
        methods: {
            ...mapActions('admin', ['fetchMe'])
        }
    }
</script>

<style lang="scss" scoped>

</style>