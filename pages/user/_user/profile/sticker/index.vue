<template>
  <v-row class="mx-auto">
    <v-col>
      <v-card elevation="10">
        <v-card-subtitle class="font-weight-black font-italic text-center">我的頭像</v-card-subtitle>
        <v-divider></v-divider>
        <br/>
        <client-only>
          <avatar-cropper :withCredentials="true" @uploaded="handleUploaded" trigger="#pick-avatar" upload-form-name="avatar" :upload-url="avatarURL" />
          <div class="d-flex justify-center">
            <v-avatar color="black" size="200">
              <v-img v-if="avatar" :src="avatar"></v-img>
              <v-icon v-else color="white">{{ defaultAvatar }}</v-icon>
            </v-avatar>
          </div>
        </client-only>
        <v-card-text>
          <v-divider></v-divider>
          <div class="d-flex justify-center mt-5">
            <v-btn outlined color="primary" id="pick-avatar">
              <v-icon>{{ setAvatar }}</v-icon>&nbsp;<span class="hidden-sm-and-down">設定頭像</span>
            </v-btn>
          </div>
        </v-card-text>
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
        defaultAvatar: icon.mdiAccountCircleOutline,
        avatarURL: '',
        avatar: ''
      }
    },
    computed:{
      ...mapGetters('admin', ['user'])
    },
    methods: {
      ...mapMutations('admin', ['SET_AVATAR']),
      handleUploaded(resp) {
        let img_url = 'data:image/*;base64,' + resp
        this.avatar = img_url
        this.SET_AVATAR(img_url)
      }
    },
    created() {
      this.avatar = this.user.avatar
      this.avatarURL = `${process.env.AXIOS_URL}/upload/avatar`
    }
  }
</script>

<style lang="scss" scoped>
</style>