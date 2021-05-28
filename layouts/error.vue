<template>
  <v-app dark>
	  <div id="notfound">
	  	<div class="notfound-bg"></div>
	  	<div class="notfound">
	  		<div class="notfound-404">
	  			<h1>404</h1>
	  		</div>
	  		<h2>Oops! Page Not Found</h2>
	  		<div class="notfound-social">
            <v-btn v-for="(social, index) in socials" :key="index" class="mx-4" dark icon large :href="social.href" target="_blank">
              <v-icon size="24px" color="black">
                {{ social.icon }}
              </v-icon>
            </v-btn>
	  		</div>
	  		<!-- <NuxtLink :to="`${$router.back()}`">回上一頁</NuxtLink> -->
	  	</div>
	  </div>
  </v-app>
</template>

<script>
import * as icon from '@mdi/js'

export default {
  name: 'error',
  data(){
    return{
      socials:[
        { icon: icon.mdiFacebook, href: process.env.FACEBOOK_OFFICIAL },
        { icon: icon.mdiInstagram, href: process.env.INSTAGRAM_OFFICIAL },
        { icon: icon.mdiYoutube, href: process.env.YOUTUBE_OFFICIAL },
        { icon: icon.mdiLinkedin, href: process.env.LINKEDIN_OFFICIAL }
      ]
    }
  }
}
</script>

<style scoped>
* {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

#notfound {
  position: relative;
  height: 100vh;
}

#notfound .notfound-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('http://localhost:3000/bg.jpg');
  background-size: cover;
}

#notfound .notfound-bg:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
}

#notfound .notfound:after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50% , -50%);
      -ms-transform: translate(-50% , -50%);
          transform: translate(-50% , -50%);
  width: 100%;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.7);
  -webkit-box-shadow: 0px 0px 0px 30px rgba(255, 255, 255, 0.7) inset;
          box-shadow: 0px 0px 0px 30px rgba(255, 255, 255, 0.7) inset;
  z-index: -1;
}

.notfound {
  max-width: 600px;
  width: 100%;
  text-align: center;
  padding: 30px;
  line-height: 1.4;
}

.notfound .notfound-404 {
  position: relative;
  height: 200px;
}

.notfound .notfound-404 h1 {
  font-family: 'Passion One', cursive;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  font-size: 220px;
  margin: 0px;
  color: #222225;
  text-transform: uppercase;
}

.notfound h2 {
  font-family: 'Muli', sans-serif;
  font-size: 26px;
  font-weight: 400;
  text-transform: uppercase;
  color: #222225;
  margin-top: 26px;
  margin-bottom: 20px;
}

.notfound-social {
  margin-bottom: 15px;
}

@media only screen and (max-width: 480px) {
  .notfound .notfound-404 {
    height: 146px;
  }

  .notfound .notfound-404 h1 {
    font-size: 146px;
  }

  .notfound h2 {
    font-size: 22px;
  }
}
</style>
