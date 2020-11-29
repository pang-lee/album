<template>
  <div class="container">
    <div class="book-wrapper" id="book">
      <div class="page" data-density="soft">
        <div class="pages-content">
          <div class="pages-background"></div>
          <div class="content-inner">
            <h1>Chapter 1</h1>
            <div class="text"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ea non vitae a assumenda sint quod, dolores laboriosam velit corrupti nobis cupiditate perspiciatis natus exercitationem, architecto esse ratione blanditiis! Itaque.</p></div>
          </div>
        </div>
      </div>

      <div class="ml-5 page">
        <div class="pages-content">
          <div class="content-inner">
            <h1>Chapter 2</h1>
            <div class="text">
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, cumque autem! Magni eligendi qui officiis? Fugit iste voluptatum atque voluptatibus totam! Nisi accusantium saepe hic. Aut nobis nesciunt mollitia error.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam odio modi, hic ratione fugit quod natus, excepturi quae minus voluptatum cupiditate quia magnam eveniet ex, reiciendis voluptates ipsam iste laudantium!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati deserunt magnam, at perspiciatis aut. Voluptatem consequuntur neque quisquam?</p>
              </div>
          </div>
        </div>
      </div>

      <div class="page">
        <div class="pages-content">
          <div class="content-inner">
            <h1>Chapter 3</h1>
            <div class="text"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate voluptas molestiae tempore amet adipisci dicta incidunt nisi alias distinctio fugit blanditiis dignissimos nobis deserunt eum consequuntur ipsam, perspiciatis numquam repellendus.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus in odio deserunt est hic minima inventore, mollitia, officia aspernatur eaque voluptatibus? Amet, molestias adipisci delectus ea eligendi sit numquam illo.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="ml-5 page">
        <div class="pages-content">
          <div class="content-inner">
            <h1>The End</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PageFlip } from 'page-flip'

  export default {
    mounted() {
      const pageFlip = new PageFlip(document.getElementById("book"), {
          width: 550, // base page width
          height: 733, // base page height
          size: "stretch",
          // set threshold values:
          minWidth: 315,
          maxWidth: 1000,
          minHeight: 420,
          maxHeight: 1350,
          maxShadowOpacity: 0.5, // Half shadow intensity
          showCover: true,
          mobileScrollSupport: false // disable content scrolling on mobile devices
        }
      )

      // load pages
      pageFlip.loadFromHTML(document.querySelectorAll(".page"));
    }
  }
</script>

<style scoped>

/* 
Reference:
  https://nodlik.github.io/StPageFlip/demo.html
  https://codepen.io/casper392945/embed/vYNMPBK?height=600&default-tab=result&embed-version=2 
  https://codepen.io/slyka85/pen/opjzPg
*/

.container {
  width: 100%;
  background-size: cover;
  background-image: url("https://github.com/slyka85/assets/blob/master/bookcover2.png?raw=true");
}

.book-wrapper {
  position: relative;
  margin-top: 2%;
}

.page {
	background-image: url("https://img00.deviantart.net/cbb9/i/2005/258/c/4/paper_texture_v5_by_bashcorpo.jpg");
  background-size: auto 100%;
}
</style>