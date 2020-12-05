<template>
  <div>
    <div class="container">
      <div class="flip-book" ref="book">
        <div v-for="n in pages + 1" :key="n" ref="page" class="page">
          <div v-if="n == 1" class="page-cover page-cover-top" data-density="hard">
            <div class="page-content">
              <h2>BOOK TITLE</h2>
            </div>
          </div>
          <div v-else-if="!mouseEvent && n == pages + 1" class="page-cover page-cover-bottom" data-density="hard">
            <div class="page-content">
              <h2 @click="pages++">plus</h2>
            </div>
          </div>
          <div v-else-if="n == pages + 1" class="page-cover page-cover-bottom" data-density="hard">
            <div class="page-content">
              <h2>Thank You</h2>
            </div>
          </div>
          <div v-else>
            <div class="page-content">
              <h2 class="page-header">Page header {{ n }}</h2>
                <div class="page-image" @click="dialog = true">
                  <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" :style="filters" ></v-img>
                  <v-dialog v-model="dialog" width="250" overlay-opacity="0">
                    <v-card>
                      <v-card-title class="headline grey lighten-2">
                        Privacy Policy
                      </v-card-title>
                      <perfect-scrollbar>
                        <v-card-text>
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
                        </v-card-text>
                      </perfect-scrollbar>
                      
                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="dialog = false">
                          I accept
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
                <div class="page-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna.</div>
                <div class="page-footer">{{ n }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!mouseEvent" class="d-flex justify-center mt-5">
      <v-btn color="primary" outlined @click="prev()">Previous</v-btn>&nbsp;
      <div class="text-body-2 mt-1">[{{ current }} / {{ total }}]</div>&nbsp;
      <v-btn color="primary" outlined @click="next()">Next</v-btn>
    </div>
  </div>
</template>

<script>
import { PageFlip } from 'page-flip'

  export default {
    props: {
      page: {
        type: Number,
        default: 1,
        required: true,
      },
      mouseEvent: {
        type: Boolean,
        default: true,
        required: true
      }
    },
    data() {
      return {
        current: this.page,
        total: 0,
        pageFlip: {},
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
        },
        dialog: false
      }
    },
    computed: {
      pages: {
        get(){
          return this.page
        },
        set(newValue){
          return this.$emit('addPage', newValue)
        }
      },
      filters() {
        return { filter: Object.entries(this._data).filter(item => typeof(item[1]) !== 'object').map(item => `${this.toDash(item[0])}(${item[1]}${this.suffix[item[0]] || ''})`).join(' ') }
      }
    },
    methods: {
      prev(){
        this.pageFlip.flipPrev()
        this.pageFlip.on("flip", (event) => {
          this.current = event.data + 1
        })
      },
      next(){
        this.pageFlip.flipNext()
        this.pageFlip.on("flip", (event) => {
          this.current = event.data + 1
        })
      },
      toDash: (str) => str.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase()
    },
    mounted() {
      this.pageFlip = new PageFlip(this.$refs.book, {
        width: 550,
        height: 733,
        size: "stretch",
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1350,
        maxShadowOpacity: 0.5,
        showCover: true,
        useMouseEvents: this.mouseEvent
      })

      if(this.mouseEvent == false){
        this.pageFlip.loadFromHTML(this.$refs.page)
        this.total = this.pageFlip.getPageCount()
        this.pageFlip.turnToPage(this.page - 1)
      } else {
        this.pageFlip.loadFromHTML(this.$refs.page)
        this.pageFlip.turnToPage(this.page - 1)
      }
    }
  }
</script>

<style lang="scss" scoped>

/* 
Reference:
  https://nodlik.github.io/StPageFlip/demo.html
  https://codepen.io/casper392945/embed/vYNMPBK?height=600&default-tab=result&embed-version=2 
  https://codepen.io/slyka85/pen/opjzPg
*/


.container {
  background-size: cover;
  background-image: url("https://github.com/slyka85/assets/blob/master/bookcover2.png?raw=true");
}

.flip-book {
  display: none;
  background-size: cover;
  position: relative;
  margin-top: 2%;
}

.page {
  padding: 20px;

	background-image: url("https://img00.deviantart.net/cbb9/i/2005/258/c/4/paper_texture_v5_by_bashcorpo.jpg");
  background-size: cover;
  border: solid 1px hsl(35, 20, 70);

  overflow: hidden;

  .page-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;

    .page-header {
      height: 30px;
      font-size: 100%;
      text-transform: uppercase;
      text-align: center;
    }

    .page-image {
      height: 100%;
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
    }

    .page-text {
      height: 100%;
      flex-grow: 1;
      font-size: 80%;
      text-align: justify;
      margin-top: 10px;
      padding-top: 10px;
      box-sizing: border-box;
      border-top: solid 1px hsl(35, 55, 90);
    }

    .page-footer {
      height: 30px;
      border-top: solid 1px hsl(35, 55, 90);
      font-size: 80%;
      color: hsl(35, 20, 50);
    }
  }

  &.--left {
    border-right: 0;
    box-shadow: inset -7px 0 30px -7px rgba(0, 0, 0, 0.4);
  }

  &.--right {
    border-left: 0;
    box-shadow: inset 7px 0 30px -7px rgba(0, 0, 0, 0.4);

    .page-footer {
      text-align: right;
    }
  }

  &.page-cover {
    border: solid 1px hsl(35, 20, 50);

    &.page-cover-top {
      box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), -2px 0 5px 2px rgba(0, 0, 0, 0.4);
    }

    &.page-cover-bottom {
      box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), 10px 0 8px 0px rgba(0, 0, 0, 0.4);
    }
  }
}

.ps {
  height: 250px;
}
</style>