<template>
    <div>
        <p>123</p>
    </div>
</template>

<script>
    export default {
        created() {
            console.log(this.$route.fullPath.slice(this.$route.fullPath.indexOf('?') + 2))
        },
    }
</script>

<style lang="scss" scoped>

</style>