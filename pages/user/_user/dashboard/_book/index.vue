<template>
  <div>
    <client-only>
      <book :page="bookpage" :bookId="bookId" :key="componentKey" :isSave="isSave" v-on:addPage="onAddPage" :mouseEvent="mouseEvent"></book>
      <br/>
      <v-divider></v-divider>
      <botton :btnstatus="btnstatus" :firstIn="firstIn" :isSave="isSave" :bookId="bookId" :mouseEvent="mouseEvent" v-on:savePage="onSavePage($event)" v-on:mouseChange="onMouseChange($event)" v-on:renderKey="onRenderKey" v-on:secondeIn="onSecondIn($event)"></botton>
      <br/>
    </client-only>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'album',
    layout: 'user',
    data() {
      return {
        componentKey: 0,
        btnstatus: 'preview',
        mouseEvent: true,
        isSave: false,
        firstIn: true,
      }
    },
    computed:{
      ...mapGetters('books', ['bookList']),
      bookId(){
        return this.$route.params.book
      },
      bookpage(){
        if(process.server) return null
        return this.bookList.find(element => element.id === this.bookId).total_page
      }
    },
    methods: {
      ...mapMutations('books', ['SET_BOOKPAGE', 'SET_BOOKIMG']),
      forceRerender() {
        this.componentKey += 1
      },
      onAddPage(update) {
        this.SET_BOOKPAGE(update)
        this.SET_BOOKIMG({ which_id: this.bookId, which_page: update })
        this.isSave = false
        this.forceRerender()
      },
      onRenderKey(){
        this.forceRerender()
      },
      onSavePage(e){
        this.isSave = e
      },
      onMouseChange(e){
        this.mouseEvent = e
      },
      onSecondIn(e){
        this.firstIn = e
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>