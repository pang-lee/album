<template>
  <v-row class="mx-auto">
    <v-col>
      <v-card elevation="10">
        <v-card-subtitle class="font-weight-black font-italic text-center">Profile</v-card-subtitle>
        <v-divider></v-divider>
        <br/>
        <client-only>
          <avatar field="img" @crop-success="cropSuccessAvatar" @crop-upload-success="cropUploadSuccessAvatar" @crop-upload-fail="cropUploadFailAvatar" v-model="avatar.show" url="/upload" :params="avatar.params" :headers="avatar.headers" img-format="jpg"></avatar>
          <avatar field="img" @crop-success="cropSuccessBackground" @crop-upload-success="cropUploadSuccessBackground" @crop-upload-fail="cropUploadFailBackground" v-model="background.show" :width="(window.width) / 1.8" :height="(window.height) / 1.8" url="/upload" :params="background.params" :headers="background.headers" img-format="jpg"></avatar>
        </client-only>

        <div class="d-flex justify-center">
	        <v-img v-if="background.imgDataUrl" :src="background.imgDataUrl" :max-height="window.height" :max-width="(window.width) * 0.5">
            <div class="d-flex justify-center" v-if="avatar.imgDataUrl">
              <v-avatar :size="(window.width / window.height) * 75">
                <v-img :src="avatar.imgDataUrl"></v-img>
              </v-avatar>
            </div>
            <div class="d-flex justify-center" v-else>
              <v-avatar color="black" :size="(window.width / window.height) * 75">
                <v-icon dark>{{ defaultAvatar }}</v-icon>
              </v-avatar>
            </div>
          </v-img>
	        <v-img v-else src="https://cdn.vuetifyjs.com/images/cards/house.jpg" :max-height="window.height" :max-width="(window.width) * 0.5">
            <div class="d-flex justify-center" v-if="avatar.imgDataUrl">
              <v-avatar :size="(window.width / window.height) * 75">
                <v-img :src="avatar.imgDataUrl"></v-img>
              </v-avatar>
            </div>
            <div class="d-flex justify-center" v-else>
              <v-avatar color="black" :size="(window.width / window.height) * 75">
                <v-icon dark>{{ defaultAvatar }}</v-icon>
              </v-avatar>
            </div>
          </v-img>
        </div>
        <v-card-text>
          <v-divider></v-divider>
          <div class="d-flex justify-center justify-space-around mt-5">
            <v-btn outlined color="primary" @click="toggleShowAvatar('avatar')">
              <v-icon>{{ setAvatar }}</v-icon>&nbsp;<span class="hidden-sm-and-down">set avatar</span>
            </v-btn>
            <v-btn outlined color="primary" @click="toggleShowBackground('background')">
              <v-icon>{{ setBackground }}</v-icon>&nbsp;<span class="hidden-sm-and-down">set background</span>
            </v-btn>
          </div>          
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import * as icon from '@mdi/js'

  export default {
    layout: 'user',
    data() {
      return {
        setAvatar: icon.mdiFaceShimmerOutline,
        setBackground: icon.mdiImageMultipleOutline,
        defaultAvatar: icon.mdiAccountCircle,
        avatar: {
          show: false,
			    params: {
			  	  token: '123456798',
			  	  name: 'avatar'
			    },
			    headers: {
			  	  smail: '*_~'
			    },
          imgDataUrl: '',
        },
        background: {
          show: false,
			    params: {
			  	  token: '987654321',
			  	  name: 'background'
			    },
			    headers: {
			  	  smail: '*_~'
			    },
          imgDataUrl: '',
        },
        window: {
          width: 0,
          height: 0
        }
      }
    },
    methods: {
      toggleShowAvatar() {
        this.avatar.show = !this.avatar.show
			},
			cropSuccessAvatar(imgDataUrl, field){
        console.log('-------- crop success --------')
        this.avatar.imgDataUrl = imgDataUrl;
			},
			cropUploadSuccessAvatar(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
				console.log('field: ' + field);
			},
			cropUploadFailAvatar(status, field){
				console.log('-------- upload fail --------');
				console.log('field: ' + field);
      },
      toggleShowBackground() {
        this.background.show = !this.background.show;
			},
			cropSuccessBackground(imgDataUrl, field){
        console.log('-------- crop success --------')
        this.background.imgDataUrl = imgDataUrl;
			},
			cropUploadSuccessBackground(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
				console.log('field: ' + field);
			},
			cropUploadFailBackground(status, field){
				console.log('-------- upload fail --------');
				console.log('field: ' + field);
      },
      handleResize() {
        this.window.width = window.innerWidth
        this.window.height = window.innerHeight
      }
    },
    created() {
      if(process.client){
        window.addEventListener('resize', this.handleResize)
        this.handleResize()          
      }
    },
    destroyed() {
      if(process.client){
        window.removeEventListener('resize', this.handleResize)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>