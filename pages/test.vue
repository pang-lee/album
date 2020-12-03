<template>
  <div>
    <book :page="page" :key="componentKey" v-on:addPage="onAddPage"></book>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        componentKey: 0,
        page: 1
      }
    },
    methods: {
      forceRerender() {
        this.componentKey += 1
      },
      onAddPage(update) {
        this.page = update
        this.forceRerender()
      }
    }
  }
</script>

<style>

</style> 
