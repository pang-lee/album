<template>
  <v-row class="mx-auto">
    <v-col>
      <v-card elevation="10">
        <v-card-subtitle class="font-weight-black font-italic text-center">Profile</v-card-subtitle>
        <v-divider></v-divider>
        <br/>
        <client-only>
          <upload field="avatar" :withCredentials="true" @crop-success="cropSuccessAvatar" @crop-upload-success="cropUploadSuccessAvatar" @crop-upload-fail="cropUploadFailAvatar" v-model="avatar.show" url="http://localhost:3001/upload/avatar" img-format="jpg"></upload>
          <div class="d-flex justify-center">
            <v-avatar color="white" size="200">
              <v-img v-if="avatar.imgDataUrl" :src="avatar.imgDataUrl"></v-img>
              <v-icon v-else color="black">{{ defaultAvatar }}</v-icon>
            </v-avatar>
          </div>
        </client-only>
        <v-card-text>
          <v-divider></v-divider>
          <div class="d-flex justify-center mt-5">
            <v-btn outlined color="primary" @click="avatar.show = !avatar.show">
              <v-icon>{{ setAvatar }}</v-icon>&nbsp;<span class="hidden-sm-and-down">set avatar</span>
            </v-btn>
          </div>
        </v-card-text>

        <!-- Upload with avatar and background -->
        <!-- <client-only>
          <upload field="avatar" :withCredentials="true" @crop-success="cropSuccessAvatar" @crop-upload-success="cropUploadSuccessAvatar" @crop-upload-fail="cropUploadFailAvatar" v-model="avatar.show" url="http://localhost:3001/upload/avatar" img-format="jpg"></upload>
          <upload field="background" :withCredentials="true" @crop-success="cropSuccessBackground" @crop-upload-success="cropUploadSuccessBackground" @crop-upload-fail="cropUploadFailBackground" v-model="background.show" url="http://localhost:3001/upload/background" img-format="jpg" :width="window.width / 1.8" :height="window.height / 1.6"></upload>

	        <v-img :src="background.imgDataUrl" aspect-ratio="1.6">
            <div class="d-flex justify-center">
              <v-avatar color="white" size="160">
                <v-avatar v-if="avatar.imgDataUrl" size="150">
                  <v-img :src="avatar.imgDataUrl"></v-img>
                </v-avatar>
                <v-icon v-else color="black">{{ defaultAvatar }}</v-icon>
              </v-avatar>
            </div>
          </v-img>
        </client-only>
        <v-card-text>
          <v-divider></v-divider>
          <div class="d-flex justify-center justify-space-around mt-5">
            <v-btn outlined color="primary" @click="avatar.show = !avatar.show">
              <v-icon>{{ setAvatar }}</v-icon>&nbsp;<span class="hidden-sm-and-down">set avatar</span>
            </v-btn>
            <v-btn outlined color="primary" @click="background.show = !background.show">
              <v-icon>{{ setBackground }}</v-icon>&nbsp;<span class="hidden-sm-and-down">set background</span>
            </v-btn>
          </div>          
        </v-card-text> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as icon from '@mdi/js'

  export default {
    name: 'sticker',
    layout: 'user',
    data() {
      return {
        setAvatar: icon.mdiFaceShimmerOutline,
        defaultAvatar: icon.mdiAccountCircle,
        avatar: {
          show: false,
          imgDataUrl: ''
        }
      }
    },
    computed:{
      ...mapGetters('admin', ['user'])
    },
    methods: {
      ...mapMutations('admin', ['SET_AVATAR']),
			cropSuccessAvatar(imgDataUrl, field){
        console.log('-------- crop success --------')
        this.avatar.imgDataUrl = imgDataUrl
			},
			cropUploadSuccessAvatar(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
        console.log('field: ' + field);
        this.SET_AVATAR(window.URL.createObjectURL(new Blob([jsonData], { type: 'image/*' })))
			},
			cropUploadFailAvatar(status, field){
				console.log('-------- upload fail --------');
				console.log('field: ' + field);
      }
    },
    created() {
      this.avatar.imgDataUrl = this.user.avatar
    }
  }

// image upload with avatar and background
  // export default {
  //   name: 'sticker',
  //   layout: 'user',
  //   data() {
  //     return {
  //       setAvatar: icon.mdiFaceShimmerOutline,
  //       setBackground: icon.mdiImageMultipleOutline,
  //       defaultAvatar: icon.mdiAccountCircle,
  //       avatar: {
  //         show: false,
  //         imgDataUrl: ''
  //       },
  //       background: {
  //         show: false,
  //         imgDataUrl: ''
  //       },
  //       window: {
  //         width: 0,
  //         height: 0
  //       }
  //     }
  //   },
  //   computed:{
  //     ...mapGetters('admin', ['user'])
  //   },
  //   methods: {
  //     ...mapMutations('admin', ['SET_AVATAR', 'SET_BACKGROUND']),
	// 		cropSuccessAvatar(imgDataUrl, field){
  //       console.log('-------- crop success --------')
  //       this.avatar.imgDataUrl = imgDataUrl
	// 		},
	// 		cropUploadSuccessAvatar(jsonData, field){
	// 			console.log('-------- upload success --------');
	// 			console.log(jsonData);
  //       console.log('field: ' + field);
  //       this.SET_AVATAR(window.URL.createObjectURL(new Blob([jsonData], { type: 'image/*' })))
	// 		},
	// 		cropUploadFailAvatar(status, field){
	// 			console.log('-------- upload fail --------');
	// 			console.log('field: ' + field);
  //     },
	// 		cropSuccessBackground(imgDataUrl, field){
  //       console.log('-------- crop success --------')
  //       this.background.imgDataUrl = imgDataUrl;
	// 		},
	// 		cropUploadSuccessBackground(jsonData, field){
	// 			console.log('-------- upload success --------');
	// 			console.log(jsonData);
  //       console.log('field: ' + field);
  //       this.SET_BACKGROUND(window.URL.createObjectURL(new Blob([jsonData], { type: 'image/*' })))
	// 		},
	// 		cropUploadFailBackground(status, field){
	// 			console.log('-------- upload fail --------');
	// 			console.log('field: ' + field);
  //     },
  //     handleResize() {
  //       this.window.width = window.innerWidth
  //       this.window.height = window.innerHeight
  //     }
  //   },
  //   created() {
  //     if(process.client){
  //       window.addEventListener('resize', this.handleResize)
  //       this.handleResize()
  //       this.avatar.imgDataUrl = this.user.avatar
  //       this.background.src = this.user.background
  //     }
  //   },
  //   destroyed() {
  //     if(process.client){
  //       window.removeEventListener('resize', this.handleResize)
  //     }
  //   }
  // }
</script>

<style lang="scss" scoped>
</style>