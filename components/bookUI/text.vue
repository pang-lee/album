<template>
    <textarea placeholder="點我寫下你的故事" rows="8" v-model="edit_text"></textarea>
</template>

<script>
import { mapMutations } from 'vuex'

    export default {
        name: 'book_text',
        props:{
            bookpage:{
                type: Number,
                require: true
            },
            bookText:{
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
            edit_text:{
                get(){
                    return this.bookText
                },
                set(value){
                    return this.SET_BOOKTEXT({ which_id: this.bookId, which_page: this.bookpage, value: value })
                }
            }
        },
        methods: {
            ...mapMutations('books', ['SET_BOOKTEXT'])
        },
    }
</script>

<style lang="scss" scoped>
textarea {
  scrollbar-width: thin;
  outline: none;
  resize: none;
  box-shadow: 0 0 0 4px rgba(#9E9E9E, 0.3);
  width: 100%;
  height: 30vh;
  border-radius: 5px;
  border: 1px solid#9E9E9E;

  &:hover,
  &:focus {
    box-shadow: 0 0 0 4px rgba(#E0E0E0, 0.5);
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 0 5px 5px 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #BDBDBD;
    border-radius: 5px;
  }
}
</style>