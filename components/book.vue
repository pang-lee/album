<template>
  <div>
    <div class="container">
      <div v-if="!mouseEvent" class="flip-book" ref="book">
        <div v-for="n in pages + 1" :key="n" ref="page" class="page">
          <div v-if="n == 1" class="page-cover page-cover-top" data-density="hard">
            <div class="page-content">
              <span class="page-first-last">
                <textarea style="text-align: center;" placeholder="點我寫下書本標題" v-model="title"/>
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
            <bookheader class="page-header" :bookId="bookId" :bookpage="n -2" :bookHead="header[n - 2].header"></bookheader>
            <bookimg class="page-image" :bookId="bookId" :bookpage="n - 2" :imgfilter="imgfilter" :mouseEvent="mouseEvent"></bookimg>
            <div>
              <booktext :bookId="bookId" :bookpage="n - 2" :bookText="text[n - 2].text"></booktext>
            </div>
            <div class="page-footer">{{ n }}</div>
          </div>
        </div>
      </div>

      <div v-else class="flip-book" ref="book">
        <div v-for="n in pages + 1" :key="n" ref="page" class="page">
          <div v-if="n == 1" class="page-cover page-cover-top" data-density="hard">
            <div class="page-content">
              <h2 class="page-first-last">{{ bookList.find(element => element.id === bookId).booktitle }}</h2>
            </div>
          </div>
          <div v-else-if="n == pages + 1" class="page-cover page-cover-bottom" data-density="hard">
            <div class="page-content">
              <div class="page-first-last">
                <div class="text-h5">
                  <span class="font-weight-black">使用QR code分享</span>
                </div>
                <div>
                  <div id="qrcode"></div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="page-content">
            <h2 class="page-header">{{ bookList.find(element => element.id === bookId).bookpage[n - 2].header }}</h2>
            <div class="page-image">
              <bookimg :bookId="bookId" :bookpage="n - 2" :imgfilter="imgfilter" :mouseEvent="mouseEvent"></bookimg>
              <div class="page-text">
                <div class="text font-weight-black text-subtitle-1">
                  {{ bookList.find(element => element.id === bookId).bookpage[n - 2].text }}
                </div>
              </div>
              <div class="page-footer">{{ n }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!mouseEvent" class="d-flex justify-center mt-5">
      <v-btn color="primary" outlined @click="prev()">上一頁</v-btn>&nbsp;
      <div class="text-body-2 mt-1">[{{ current }} / {{ total }}]</div>&nbsp;
      <v-btn color="primary" outlined @click="next()">下一頁</v-btn>
    </div>
  </div>
</template>

<script>
import { PageFlip } from 'page-flip'
import { mapGetters, mapMutations } from 'vuex'
import bookheader from '~/components/bookUI/header'
import booktext from '~/components/bookUI/text'
import bookimg from '~/components/bookUI/image'
import Swal from 'sweetalert2'
import * as icon from '@mdi/js'

  export default {
    name: 'book',
    components:{
      bookheader,
      booktext,
      bookimg
    },
    props: {
      bookId:{
        type: String,
        default: '1',
        required: true
      },
      page: {
        type: Number,
        default: 1,
        required: true,
      },
      mouseEvent: {
        type: Boolean,
        default: true
      },
      isSave:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        current: this.page,
        total: 0,
        pageFlip: {},
        qrcodeObj: {},
        link: icon.mdiLinkVariantPlus,
        live: icon.mdiVideoAccount,
        video: icon.mdiVideoBox,
        plus: icon.mdiPlusBoxMultipleOutline
      }
    },
    computed: {
      ...mapGetters('books', ['bookList']),
      pages: {
        get(){
          return this.page
        },
        set(newValue){
          if(this.isSave == true) return this.$emit('addPage', { which_id: this.bookId, value: newValue })
          else return Swal.fire({
            type: 'warning',
            title: `<h2>噢噢...</h2>`,
            html: '<strong>新增前請先記得<u style="color:red;">存檔 !</u></strong>',
            timer: 3000
          })
        }
      },
      title:{
        get(){
          return this.bookList.find(element => element.id === this.bookId).booktitle
        },
        set(newValue){
          return this.SET_BOOKTITLE({ which_id: this.bookId, value: newValue })
        }
      },
      header(){
        return this.bookList.find((element => element.id === this.bookId)).bookpage
      },
      text(){
        return this.bookList.find((element => element.id === this.bookId)).bookpage
      },
      imgfilter(){
        return this.bookList.find((element => element.id === this.bookId)).bookpage
      }
    },
    methods: {
      ...mapMutations('books', ['SET_BOOKTITLE']),
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
        disableFlipByClick: this.mouseEvent,
        useMouseEvents: this.mouseEvent
      })

      this.qrcodeObj = new QRCode('qrcode', {
        text: `${process.env.BASE_URL}${this.$route.fullPath}`,    
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel : QRCode.CorrectLevel.H
      })

      if(!this.mouseEvent){
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

  photo:
  // background-image: url("https://github.com/slyka85/assets/blob/master/bookcover2.png?raw=true");
	// background-image: url("https://img00.deviantart.net/cbb9/i/2005/258/c/4/paper_texture_v5_by_bashcorpo.jpg");
*/

.container {
  background-size: cover;
  background-image: url("http://localhost:3000/bookcover2.png");
}

.flip-book {
  display: none;
  background-size: cover;
  position: relative;
  margin-top: 2%;
}

.page {
  padding: 20px;
  background-image: url("http://localhost:3000/bookpaper.jpg");
  background-size: cover;
  border: solid 1px hsl(35, 20%, 70%);
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
      overflow: hidden;
      height: 35vh;
      flex-grow: 1;
      font-size: 80%;
      text-align: justify;
      margin-top: 10px;
      padding-top: 10px;
      box-sizing: border-box;
      border-top: solid 1px hsl(35, 55%, 90%);
    }

    .text{
      word-wrap: break-word;
      width: 100%;
      height: 30vh;
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-width: thin;
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #BDBDBD;
      }
    }

    .page-footer {
      position: relative;
      margin-top: 4%;
      height: 30px;
      border-top: solid 1px hsl(35, 55%, 90%);
      font-size: 80%;
      color: hsl(35, 20%, 50%);
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
    border: solid 1px hsl(35, 20%, 50%);

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

  #qrcode{
    display: inline-block;
  }
}

.link-btn-position{
  position: relative;
  margin-top: 45%;
}

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