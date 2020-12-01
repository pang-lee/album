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
          <div v-else-if="n == pages + 1" class="page-cover page-cover-bottom" data-density="hard">
            <div class="page-content">
              <h2 @click="pages++">Plus</h2>
            </div>
          </div>
          <div v-else>
            <div class="page-content">
              <h2 @dblclick="edit1 = true">{{ n }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <v-divider></v-divider>
    <div class="d-flex justify-center mt-5">
      <v-btn text color="primary">Edit</v-btn>
      <v-btn text color="primary">Save</v-btn>
      <v-btn text color="primary" @click="copy()">Copy URL</v-btn>
    </div>
    <br/>
  </div>
</template>

<script>
import { PageFlip } from 'page-flip'
import Swal from 'sweetalert2'

  export default {
    props: {
      page: {
        type: Number,
        default: 1,
        required: true,
      }
    },
    data() {
      return {
        switch1: true,
        edit1: false
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
      }
    },
    methods: {
      copy(){
        this.$copyText(this.$route.fullPath)
        .then(() => {
          Swal.fire({
            type: 'success',
            title: 'Success Copy Url',
            text: 'Now You Can Share With Your Friend',
            timer: 3000
          })
        })
        .catch(() => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            timer: 3000
          })
        })
      }
    },
    mounted() {
      const pageFlip = new PageFlip(this.$refs.book, {
        width: 550,
        height: 733,
        size: "stretch",
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1350,
        maxShadowOpacity: 0.5,
        showCover: true,
        // mobileScrollSupport: false // disable content scrolling on mobile devices
      })

      pageFlip.loadFromHTML(this.$refs.page)
      pageFlip.turnToPage(this.page - 1)
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

    h2 {
      text-align: center;
      padding-top: 50%;
      font-size: 210%;
    }

    &.page-cover-top {
      box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), -2px 0 5px 2px rgba(0, 0, 0, 0.4);
    }

    &.page-cover-bottom {
      box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), 10px 0 8px 0px rgba(0, 0, 0, 0.4);
    }
  }
}
</style>