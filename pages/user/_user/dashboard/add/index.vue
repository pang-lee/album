<template>
  <div>
    <client-only>
      <book :page="bookpage" :bookId="bookId" :key="componentKey" :isSave="isSave" v-on:addPage="onAddPage" :mouseEvent="mouseEvent"></book>
      <br/>
      <v-divider></v-divider>
      <botton :btnstatus="btnstatus" :bookId="bookId" :isSave="isSave" :mouseEvent="mouseEvent" v-on:savePage="onSavePage($event)" v-on:mouseChange="onMouseChange($event)" v-on:renderKey="onRenderKey"></botton>
      <br/>
    </client-only>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'add',
    layout: 'user',
    data() {
      return {
        componentKey: 0,
        btnstatus: 'edit',
        mouseEvent: false,
        isSave: false,
        bookId: ''
      }
    },
    computed:{
      ...mapGetters('books', ['bookList']),
      bookpage(){
        if(process.server) return null
        return this.bookList.find(element => element.id === this.bookId).total_page
      }
    },
    methods: {
      ...mapMutations('books', ['SET_BOOKPAGE', 'CREATE_BOOK', 'SET_BOOKIMG']),
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
      generateUID() {
        let firstPart = (Math.random() * 46656) | 0
        let secondPart = (Math.random() * 46656) | 0
        firstPart = ("000" + firstPart.toString(36)).slice(-3)
        secondPart = ("000" + secondPart.toString(36)).slice(-3)
        this.bookId = new Date().getMilliseconds() + '_' + firstPart + secondPart
        this.CREATE_BOOK(this.bookId)
      },
    },
    created() {
      this.generateUID()
    }
  }
</script>

<style lang="scss" scoped>

</style>