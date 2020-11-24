<template>
  <v-row class="mx-auto">
    <v-col>
      <v-card elevation="10">
        <v-card-subtitle class="font-weight-black font-italic text-center">Profile</v-card-subtitle>
        <v-divider></v-divider>
        <br/>
        <client-only>
          <avatar field="img"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="show"
	    	    :width="(window.width) / 1.8"
	    	    :height="(window.height) / 1.8"
	    	    url="/upload"
	    	    :params="params"
	    	    :headers="headers"
	    	    img-format="jpg">
          </avatar>
        </client-only>
	      <v-img :src="imgDataUrl"></v-img>

        <client-only>
          <image-uploader
            :preview="true"
            :className="['fileinput', { 'fileinput--loaded': hasImage }]"
            capture="environment"
            :debug="1"
            doNotResize="gif"
            :autoRotate="true"
            outputFormat="verbose"
            @input="setImage"
          >
            <!-- <label for="fileInput" slot="upload-label">
                <figure>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <path
                      class="path1"
                      d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
                    ></path>
                  </svg>
                </figure>
                <span class="upload-caption">{{ hasImage ? "Replace" : "Click to upload" }}</span>
            </label> -->
          </image-uploader>
        </client-only>
        <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
          <div class="d-flex justify-center ma-7">
            <v-avatar :size="(window.width / window.height) * 150">
              <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
            </v-avatar>
          </div>
        </v-img> -->
        <v-card-actions>
          <div>
            <v-btn outlined color="primary" @click="toggleShow">set avatar</v-btn>
            <v-btn outlined color="primary">set background</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    layout: 'user',
    data() {
      return {
        show: false,
			  params: {
			  	token: '123456798',
			  	name: 'avatar'
			  },
			  headers: {
			  	smail: '*_~'
			  },
        imgDataUrl: '',
        hasImage: false,
        image: null,
        window: {
          width: 0,
          height: 0
        }
      }
    },
    methods: {
      toggleShow() {
				this.show = !this.show;
			},
			cropSuccess(imgDataUrl, field){
				console.log('-------- crop success --------');
				this.imgDataUrl = imgDataUrl;
			},
			cropUploadSuccess(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
				console.log('field: ' + field);
			},
			cropUploadFail(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
      },
      setImage(output) {
        this.hasImage = true;
        this.image = output;
        console.log('Info', output.info)
        console.log('Exif', output.exif)
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