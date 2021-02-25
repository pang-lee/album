<template>
  <div>
    <div class="container">
      <div v-if="!mouseEvent" class="flip-book" ref="book">
        <div v-for="n in pages + 1" :key="n" ref="page" class="page">
          <div v-if="n == 1" class="page-cover page-cover-top" data-density="hard">
            <div class="page-content">
              <span class="page-first-last">
                <!-- <input style="text-align: center;" v-model="book.bookTitle"/> -->
                <input style="text-align: center;" v-model="title"/>
              </span>
            </div>
          </div>
          <div v-else-if="n == pages + 1" class="page-cover page-cover-bottom" data-density="hard">
            <div class="page-content">
              <span class="page-first-last">
                <v-btn x-large text fab icon @click="pages++">
                  <v-icon x-large>{{ plus }}</v-icon>
                </v-btn>
              </span>
            </div>
          </div>
          <div v-else class="page-content">
            <!-- <input class="page-header" type="text" v-model="book.header"/> -->
            <input class="page-header" type="text" v-model="header"/>

            <div v-if="!upload.src" class="page-image">
              <vue-core-image-upload class="empty-state" :crop="false" @imagechanged="imagechanged" @imageuploaded="imageuploaded" :data="upload" :max-file-size="5242880" url="/upload">
                <div class="text-h6 text-center text--secondary">Click Me To Upload</div>
              </vue-core-image-upload>
            </div>

            <div v-else class="page-image" @click="dialog = true">
              <v-img :src="upload.src" aspect-ratio="1.79" :style="filters">
                <v-btn v-if="items[1].href" icon fab x-small :href="items[1].href" target="_blank" @click.stop="dialog = false"><v-icon>{{ link }}</v-icon></v-btn>
                <v-btn v-if="items[2].href" icon fab x-small :href="items[2].href" target="_blank" @click.stop="dialog = false"><v-icon>{{ live }}</v-icon></v-btn>
                <v-btn v-if="items[3].href" icon fab x-small :href="items[3].href" target="_blank" @click.stop="dialog = false"><v-icon>{{ video }}</v-icon></v-btn>
              </v-img>
              <v-dialog v-model="dialog" width="300" overlay-opacity="0.8">
                <v-card>
                  <div class="text-h6 font-weight-black text-center">Photo Setting</div>
                  <v-img :src="upload.src" :style="filters"></v-img>
                  <perfect-scrollbar>
                    <v-card-text v-if="filteImage">
                      <strong>Grayscale ({{photo.grayscale}})</strong>
                      <v-slider v-model="photo.grayscale" max="1" min="0" step="0.01"></v-slider>
                      <strong>Sepia ({{photo.sepia}})</strong>
                      <v-slider  v-model="photo.sepia" max="1" min="0" step="0.01"></v-slider>
                      <strong>Saturate ({{photo.saturate}})</strong>
                      <v-slider v-model="photo.saturate" max="1" min="0" step="0.01"></v-slider>
                      <strong>Hue Rotate ({{photo.hueRotate}} deg)</strong>
                      <v-slider v-model="photo.hueRotate" max="360" min="0" step="1"></v-slider>
                      <strong>Invert ({{photo.invert}})</strong>
                      <v-slider v-model="photo.invert" max="1" min="0" step="0.01"></v-slider>
                      <strong>Brightness ({{photo.brightness}})</strong>
                      <v-slider v-model="photo.brightness" max="3" min="0" step="0.01"></v-slider>
                      <strong>Contrast ({{photo.contrast}})</strong>
                      <v-slider v-model="photo.contrast" max="1" min="0" step="0.01"></v-slider>
                      <strong>Blur ({{photo.blur}}px)</strong>
                      <v-slider v-model="photo.blur" max="50" min="0" step="0.1"></v-slider>
                    </v-card-text>
                    <v-card-text v-else>
                      <v-expansion-panels focusable popout>
                        <v-expansion-panel v-for="(item, index) in items" :key="index">
                          <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <br/>
                            <vue-core-image-upload v-if="item.title == 'Update Image'" class="empty-state" :crop="false" @imagechanged="imagechanged" @imageuploaded="imageuploaded" :data="upload" :max-file-size="5242880" url="/upload">
                              <div class="text-h6 text-center text--secondary">Click Me To Upload</div>
                            </vue-core-image-upload>
                            <v-text-field v-else v-model="item.href" :label="item.title" outlined clearable></v-text-field>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-card-text>
                  </perfect-scrollbar>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="filteImage = true">Filter</v-btn>
                    <v-btn color="primary" text @click="filteImage = false">Image URL</v-btn>
                    <v-btn color="primary" text @click="dialog = false">OK</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
            <div>
              <!-- <textarea class="page-text" rows="8" v-model="book.text"></textarea> -->
              <textarea class="page-text" rows="8" v-model="text"></textarea>
            </div>
            <div class="page-footer">{{ n }}</div>
          </div>
        </div>
      </div>

      <div v-else class="flip-book" ref="book">
        <div v-for="n in pages + 1" :key="n" ref="page" class="page">
          <div v-if="n == 1" class="page-cover page-cover-top" data-density="hard">
            <div class="page-content">
              <!-- <h2 class="page-first-last">BOOK TITLE</h2> -->
              <h2 class="page-first-last">{{book.title}}</h2>
            </div>
          </div>
          <div v-else-if="n == pages + 1" class="page-cover page-cover-bottom" data-density="hard">
            <div class="page-content">
              <h2 class="page-first-last">Thank You</h2>
            </div>
          </div>
          <div v-else class="page-content">
            <!-- <h2 class="page-header">Page header {{ n }}</h2> -->
            <h2 class="page-header">{{book.header}}</h2>
            <div class="page-image">
              <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" :style="filters">
                <v-btn v-if="items[1].href" icon fab x-small :href="items[1].href" target="_blank"><v-icon>{{ link }}</v-icon></v-btn>
                <v-btn v-if="items[2].href" icon fab x-small :href="items[2].href" target="_blank"><v-icon>{{ live }}</v-icon></v-btn>
                <v-btn v-if="items[3].href" icon fab x-small :href="items[3].href" target="_blank"><v-icon>{{ video }}</v-icon></v-btn>
              </v-img>
              <div class="page-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna.</div>
              <!-- <div class="page-text">{{book.text}}</div> -->
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
import { mapGetters, mapMutations } from 'vuex'
import Swal from 'sweetalert2'
import * as icon from '@mdi/js'

  export default {
    name: 'book',
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
      },
      isSave:{
        type: Boolean,
        default: false,
        required: true
      }
    },
    data() {
      return {
        current: this.page,
        total: 0,
        pageFlip: {},
        dialog: false,
        photo:{
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
        },
        filteImage: true,
        items:[
          { title: 'Update Image', href: '' },
          { title: 'Add Post Link', href: '' },
          { title: 'Add Live Stream Link', href: '' },
          { title: 'Add Video Link', href: ''}
        ],
        link: icon.mdiLinkVariantPlus,
        live: icon.mdiVideoAccount,
        video: icon.mdiVideoBox,
        plus: icon.mdiPlusBoxMultipleOutline,
        upload:{
          src: ''
        }
      }
    },
    computed: {
      ...mapGetters('books', ['book']),
      pages: {
        get(){
          return this.page
        },
        set(newValue){
          if(this.isSave == true) return this.$emit('addPage', newValue)
          else Swal.fire({
            type: 'warning',
            title: `<h2>Oops...</h2>`,
            html: '<strong>Please Remember To <u style="color:red;">Save Before Add Page!</u></strong>',
            timer: 3000
          })
        }
      },
      filters() {
        return { filter: Object.entries(this._data.photo).filter(item => typeof(item[1]) !== 'object').map(item => `${this.toDash(item[0])}(${item[1]}${this.photo.suffix[item[0]] || ''})`).join(' ') }
      },
      title:{
        get(){
          return this.book.title
        },
        set(newValue){
          return this.SET_BOOKTITLE(newValue)
        }
      },
      header:{
        get(){
          return this.book.header
        },
        set(newValue){
          return this.SET_BOOKHEADER(newValue)
        }
      },
      text:{
        get(){
          return this.book.text
        },
        set(newValue){
          return this.SET_BOOKTEXT(newValue)
        }
      }
    },
    methods: {
      ...mapMutations('books', ['SET_BOOKTITLE', 'SET_BOOKHEADER', 'SET_BOOKTEXT']),
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
      toDash: (str) => str.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase(),
      imagechanged(res) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.upload.src = e.target.result
        }
        reader.readAsDataURL(res)
      },
      imageuploaded(res) {
        console.log("this is the imageuploaded ", res)
      }
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
      position: relative;
      margin-top: 4%;
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

  .page-first-last {
    text-align: center;
    padding-top: 50%;
    font-size: 210%;
  }
}

.ps {
  height: 250px;
}

textarea {
  scrollbar-width: thin;
  outline: none;
  resize: none;
  box-shadow: 0 0 0 4px rgba(#9E9E9E, 0.3);
  width: 100%;
  height: 21vh;
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

.empty-state {
  position: relative;
  padding: 22.5% 0% 22.5% 0%;
  border-color: rgba(0, 0, 0, .15);
  border-style: dashed;
  border-width: 2px;
  cursor: pointer;
  transition: border .2s ease-out;

  &:hover {
   border-color: #3897f0;
  }
}
</style>