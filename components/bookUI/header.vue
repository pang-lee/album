<template>
    <input placeholder="點我輸入頁籤" type="text" v-model="edit_header"/>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'book_header',
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