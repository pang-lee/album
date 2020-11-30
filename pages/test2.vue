<template>
    <div class="container">
        <div class="flip-book" ref="book">


        <div v-for="n in page + 1" :key="n" ref="page" class="page">

            <div v-if="n == 1" class="page-cover page-cover-top" data-density="hard">
                <div class="page-content">
                    <h2>BOOK TITLE</h2>
                </div>
            </div>
            <div v-else-if="n == page + 1" class="page-cover page-cover-bottom" data-density="hard">
                <div class="page-content">
                    <h2 @click="page++">Plus</h2>
                </div>
            </div>
            <div v-else>
                <div class="page-content">
                    <h2 @dblclick="edit1 = true">{{ n }}</h2>
                </div>
            </div>


        </div>
        <!-- <div class="page page-cover page-cover-bottom" data-density="hard">
            <div class="page-content">
                <h2 @click="page++">Plus</h2>
            </div>
        </div> -->


      <!-- <div class="page page-cover page-cover-top" data-density="hard">
        <div class="page-content">
          <h2>BOOK TITLE</h2>
        </div>
      </div>
      <div class="page">
        <div class="page-content">
          <h2 class="page-header">Page header 1</h2>
          <div class="page-image" style="background-image: url(images/html/1.jpg)"></div>
          <div class="page-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna.</div>
          <div class="page-footer">2</div>
        </div>
      </div>
      <div class="page">
        <div class="page-content">
          <h2 class="page-header">Page header - 15</h2>
          <div class="page-image" style="background-image: url(images/html/7.jpg)"></div>
          <div class="page-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna.</div>
          <div class="page-footer">16</div>
        </div>
      </div>
      <div class="page">
        <div class="page-content">
          <h2 class="page-header">Page header - 16</h2>
          <div class="page-image" style="background-image: url(images/html/8.jpg)"></div>
          <div class="page-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna.</div>
          <div class="page-footer">17</div>
        </div>
      </div>
      <div class="page page-cover page-cover-bottom" data-density="hard">
        <div class="page-content">
          <h2>THE END</h2>
        </div>
      </div> -->
        </div>
    </div>
</template>

<script>
import { PageFlip } from 'page-flip'

  export default {
    data() {
        return {
            page: 5,
            edit1: false
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

      pageFlip.loadFromHTML(this.$refs.page);
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