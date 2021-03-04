<template>
  <div>
    <client-only>
      <book :page="book.page" :key="componentKey" :isSave="isSave" v-on:addPage="onAddPage" :mouseEvent="mouseEvent"></book>
    </client-only>
    <br/>
    <v-divider></v-divider>
    <botton :btnstatus="btnstatus" :isSave="isSave" :mouseEvent="mouseEvent" v-on:savePage="onSavePage($event)" v-on:mouseChange="onMouseChange($event)" v-on:renderKey="onRenderKey"></botton>
    <br/>
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
      ...mapGetters('books', ['book'])
    },
    methods: {
      ...mapMutations('books', ['CLEAR_ALL', 'SET_BOOKPAGE']),
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
    },
    created(){
      this.CLEAR_ALL()
    }
  }
</script>

<style lang="scss" scoped>

</style>