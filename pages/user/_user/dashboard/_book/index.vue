<template>
  <div>
    <client-only>
      <book :page="book.page" :key="componentKey" :isSave="isSave" v-on:addPage="onAddPage" :mouseEvent="mouseEvent"></book>
    </client-only>
    <br/>
    <v-divider></v-divider>
    <botton :btnstatus="btnstatus" :firstIn="firstIn" :isSave="isSave" :mouseEvent="mouseEvent" v-on:savePage="onSavePage($event)" v-on:mouseChange="onMouseChange($event)" v-on:renderKey="onRenderKey" v-on:secondeIn="onSecondIn($event)"></botton>
    <br/>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'album',
    layout: 'user',
    data() {
      return {
        page:1,
        componentKey: 0,
        btnstatus: 'preview',
        mouseEvent: true,
        isSave: false,
        firstIn: true
      }
    },
    computed:{
      ...mapGetters('books', ['book'])
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
      },
      onSecondIn(e){
        this.firstIn = e
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>