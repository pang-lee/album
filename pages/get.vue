<template>
    <div>
        {{user}}
        <v-btn @click="fetchMe()">123</v-btn>
        <!-- <v-img :src=""></v-img> -->

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