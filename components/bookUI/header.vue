<template>
    <input placeholder="Click Me To Set Header" type="text" v-model="edit_header"/>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    props:{
        bookpage:{
            type: Number,
            require: true
        },
        bookHead:{
            type: String,
            retuire: true
        },
        bookId:{
            type: String,
            default: '1',
            required: true
        }
    },
    computed:{
        edit_header:{
            get(){
                return this.bookHead
            },
            set(value){
                this.SET_BOOKHEADER({ which_id: this.bookId, which_page: this.bookpage, value: value})
            }
        }
    },
    methods: {
      ...mapMutations('books', ['SET_BOOKHEADER'])
    },
}
</script>

<style lang="scss" scoped>

</style>