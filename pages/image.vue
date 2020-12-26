<template>
    <div>
        <v-img :src="getImage"></v-img>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

    export default {
        computed:{
            ...mapGetters('upload', ['getImage'])
        },
        methods: {
            ...mapActions('upload', ['fetchImg'])
        },
        created() {
            this.fetchImg()
        },
    }
</script>

<style lang="scss" scoped>

</style>