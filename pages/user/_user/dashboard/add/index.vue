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
        isSave: false
      }
    },
    computed:{
      ...mapGetters('books', ['bookList']),
      bookId(){
        return this.$route.fullPath.slice(this.$route.fullPath.indexOf('?') + 2)
      },
      bookpage(){
        if(process.server) return null
        return this.bookList.find(element => element.id === this.bookId).total_pages
      }
    },
    methods: {
      ...mapMutations('books', ['SET_BOOKPAGE']),
      forceRerender() {
        this.componentKey += 1
      },
      onAddPage(update) {
        this.SET_BOOKPAGE(update)
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
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>