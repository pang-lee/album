<template>
    <client-only>
        <book :page="bookpage" :bookId="bookId"></book>
    </client-only>
</template>

<script>
import { mapActions } from 'vuex'

    export default {
        name: 'guest',
        data() {
            return {

            }
        },
        methods: {
            ...mapActions('books', ['guestView'])
        },
        created() {
            this.guestView({ which_user: this.$route.params.user, which_book: this.$route.params.guestbook })
        },
    }
</script>

<style lang="scss" scoped>

</style>