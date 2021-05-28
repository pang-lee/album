<template>
    <client-only>
        <book :page="bookpage" :bookId="bookId"></book>
    </client-only>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'guest',
        computed:{
            ...mapGetters('books', ['bookList']),
            bookId(){
                return this.$route.params.guestbook
            },
            bookpage(){
                if(process.server) return null
                return this.bookList.find(element => element.id === this.bookId).total_page
            }
        },
        methods: {
            ...mapActions('books', ['guestView'])
        },
        created() {
            this.guestView({ which_user: this.$route.params.user, which_book: this.$route.params.guestbook })
        }
    }
</script>

<style lang="scss" scoped>

</style>