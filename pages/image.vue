<template>
    <div>
        <v-img :src="getImage"></v-img>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

    export default {
        computed:{
            ...mapGetters('upload', ['getImage'])
        }
    }
</script>

<style lang="scss" scoped>

</style>