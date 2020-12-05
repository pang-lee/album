<template>
  <v-row justify="center">
    <v-expansion-panels popout class="transparent">
      <v-expansion-panel
        v-for="(item,i) in 1"
        :key="i"
      >
        <v-expansion-panel-header>
             <v-img
      src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
       :style="filters" 
    ></v-img>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <strong>Grayscale ({{grayscale}})</strong>
          <v-slider v-model="grayscale" max="1" min="0" step="0.01"></v-slider>
          <strong>Sepia ({{sepia}})</strong>
          <v-slider  v-model="sepia" max="1" min="0" step="0.01"></v-slider>
          <strong>Saturate ({{saturate}})</strong>
          <v-slider v-model="saturate" max="1" min="0" step="0.01"></v-slider>
          <strong>Hue Rotate ({{hueRotate}} deg)</strong>
          <v-slider v-model="hueRotate" max="360" min="0" step="1"></v-slider>
          <strong>Invert ({{invert}})</strong>
          <v-slider v-model="invert" max="1" min="0" step="0.01"></v-slider>
          <strong>Brightness ({{brightness}})</strong>
          <v-slider v-model="brightness" max="3" min="0" step="0.01"></v-slider>
          <strong>Contrast ({{contrast}})</strong>
          <v-slider v-model="contrast" max="1" min="0" step="0.01"></v-slider>
          <strong>Blur ({{blur}}px)</strong>
          <v-slider v-model="blur" max="50" min="0" step="0.1"></v-slider>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>
<script>
    export default {

         data(){
             return{
    grayscale: 0,
    sepia: 0,
    saturate: 1,
    hueRotate: 0,
    invert: 0,
    brightness: 1,
    contrast: 1,
    blur: 0,
    suffix: {
      hueRotate: 'deg',
      blur: 'px'
    }
             }

  },
  computed: {
    filters() {
      return { filter: Object.entries(this._data).filter(item => typeof(item[1]) !== 'object').map(item => `${this.toDash(item[0])}(${item[1]}${this.suffix[item[0]] || ''})`).join(' ') }
    }
  },
  methods: {
    toDash: (str) => str.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase(),
    download() {
      const canvas = document.createElement('canvas')
      canvas.width = 600
      canvas.height = 320
      const ctx = canvas.getContext('2d')
      ctx.filter = this.filters.filter
      ctx.drawImage(this.$refs.img, 0, 0, canvas.width, canvas.height)
      const link = document.createElement('a')
      link.href = canvas.toDataURL()
      link.download = 'landscape-canyon.png'
      link.click()
    }
  },
//   mounted() {
//     this.$refs.img.src = 'https://res.cloudinary.com/mykeels/image/upload/v1515494037/landscape-road-canyon_wc8xdf.jpg'
//   }
    }
</script>

<style lang="scss" scoped>
// .style {
//   border: 1px solid gray;
//   color: gray;
//   font-family: calibri;
//   margin-top: 20px;
// }
</style>