<template>
  <div class="hidden-sm-and-down">
    <div v-if="!displayOrNot" class="d-flex justify-center">
      <v-switch v-model="shareOrNot" inset :label="`${shareOrNot ? '分享' : '不分享'}`"></v-switch>
    </div>
    <div class="d-flex justify-center mt-5">
      <v-btn-toggle v-model="btnstate" tile color="primary" mandatory group>
          <v-btn value="preview" @click.stop="preview()">預覽</v-btn>
          <v-btn value="edit" @click.stop="edit()">編輯</v-btn>
          <v-btn value="save" @click.stop="save()">儲存</v-btn>
          <v-btn v-if="displayOrNot && shareOrNot" value="share" @click.stop="share()">分享</v-btn>
          <v-btn v-if="!displayOrNot && shareOrNot" value="share" @click.stop="share()">分享</v-btn>
          <v-dialog v-model="dialog">
            <v-card>
              <br/>
              <v-card-subtitle class="text-center font-weight-black font-italic">快分享給其他人吧 <strong>!</strong></v-card-subtitle>
              <v-divider></v-divider>
              <br/>
              <v-card-actions>
                <perfect-scrollbar>
                  <div class="share-network-list">
                    <ShareNetwork v-for="network in networks" :network="network.network" :key="network.network" :style="{ backgroundColor: network.color }" :url="sharing.url" :title="sharing.title" :description="sharing.description" :quote="sharing.quote" :hashtags="sharing.hashtags" :twitterUser="sharing.twitterUser">
                      <i :class="network.icon"></i>
                      <span>{{ network.name }}</span>
                    </ShareNetwork>
                    <v-btn icon fab small @click="copy()"><v-icon>{{ copyLink }}</v-icon></v-btn>
                    <input type="hidden" ref="copy_url" :value="host"/>
                  </div>
                </perfect-scrollbar>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script>
import * as icon from '@mdi/js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: 'botton',
    props:{
      btnstatus:{
        type: String,
        require: true,
        default: 'preview'
      },
      firstIn:{
        type: Boolean,
        require: true,
        default: false
      },
      isSave: {
        type: Boolean,
        require: true,
        default: false
      },
      bookId:{
        type: String,
        default: '1',
        required: true
      },
      mouseEvent: {
        type: Boolean,
        require: true,
        default: false
      }
    },
    data() {
        return {
          dialog: false,
          btnstate: this.btnstatus,
          host: '',
          cur_book: {},
          sharing: {
            url: '',
            hashtags: 'album,collection',
            title: '',
            description: '',
            quote: '',
            twitterUser: ''
          },
          networks: [
            { network: 'baidu', name: 'Baidu', icon: 'fas fah fa-lg fa-paw', color: '#2529d8' },
            { network: 'buffer', name: 'Buffer', icon: 'fab fah fa-lg fa-buffer', color: '#323b43' },
            { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
            { network: 'evernote', name: 'Evernote', icon: 'fab fah fa-lg fa-evernote', color: '#2dbe60' },
            { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
            { network: 'flipboard', name: 'Flipboard', icon: 'fab fah fa-lg fa-flipboard', color: '#e12828' },
            { network: 'hackernews', name: 'HackerNews', icon: 'fab fah fa-lg fa-hacker-news', color: '#ff4000' },
            { network: 'instapaper', name: 'Instapaper', icon: 'fas fah fa-lg fa-italic', color: '#428bca' },
            { network: 'line', name: 'Line', icon: 'fab fah fa-lg fa-line', color: '#00c300' },
            { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' },
            { network: 'odnoklassniki', name: 'Odnoklassniki', icon: 'fab fah fa-lg fa-odnoklassniki', color: '#ed812b' },
            { network: 'pinterest', name: 'Pinterest', icon: 'fab fah fa-lg fa-pinterest', color: '#bd081c' },
            { network: 'pocket', name: 'Pocket', icon: 'fab fah fa-lg fa-get-pocket', color: '#ef4056' },
            { network: 'quora', name: 'Quora', icon: 'fab fah fa-lg fa-quora', color: '#a82400' },
            { network: 'reddit', name: 'Reddit', icon: 'fab fah fa-lg fa-reddit-alien', color: '#ff4500' },
            { network: 'skype', name: 'Skype', icon: 'fab fah fa-lg fa-skype', color: '#00aff0' },
            { network: 'sms', name: 'SMS', icon: 'far fah fa-lg fa-comment-dots', color: '#333333' },
            { network: 'stumbleupon', name: 'StumbleUpon', icon: 'fab fah fa-lg fa-stumbleupon', color: '#eb4924' },
            { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
            { network: 'tumblr', name: 'Tumblr', icon: 'fab fah fa-lg fa-tumblr', color: '#35465c' },
            { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
            { network: 'viber', name: 'Viber', icon: 'fab fah fa-lg fa-viber', color: '#59267c' },
            { network: 'vk', name: 'Vk', icon: 'fab fah fa-lg fa-vk', color: '#4a76a8' },
            { network: 'weibo', name: 'Weibo', icon: 'fab fah fa-lg fa-weibo', color: '#e9152d' },
            { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' },
            { network: 'wordpress', name: 'Wordpress', icon: 'fab fah fa-lg fa-wordpress', color: '#21759b' },
            { network: 'xing', name: 'Xing', icon: 'fab fah fa-lg fa-xing', color: '#026466' },
            { network: 'yammer', name: 'Yammer', icon: 'fab fah fa-lg fa-yammer', color: '#0072c6' }
          ],
          copyLink: icon.mdiLinkVariant
        }
    },
    computed:{
      ...mapGetters('books', ['bookList']),
      ...mapGetters('admin', ['privacy_value']),
      shareOrNot:{
        get(){
          if(!Array.isArray(this.privacy_value.share_btn)) return this.privacy_value.share_btn
          else return this.privacy_value.share_btn[this.bookId]
        },
        set(value){
          this.SELECTED_SHARE({ which_id: this.bookId, value: value})
        }
      },
      displayOrNot(){
        return this.privacy_value.notDisplay
      },
      bookquote(){
        this.bookList.find(element => element.id === this.bookId).booktitle
      }
    },
    watch:{
      'cur_book.book.title': function(){
        this.sharing.quote = this.bookList.find(element => element.id === this.bookId).booktitle
      }
    },
    methods: {
      ...mapMutations('books', ['SELECTED_SHARE']),
      ...mapActions('books', ['saveBook']),
      edit(){
        this.$emit('mouseChange', false)
        this.$emit('savePage', false)
        this.$emit('secondeIn', false)
        this.$emit('renderKey', 1)
      },
      preview(){
        if(this.firstIn) return this.$emit('mouseChange', true)
        if(!this.isSave) return Swal.fire({
          type: 'warning',
          title: `<h2>噢噢...</h2>`,
          html: '<strong>預覽前請先記得<u style="color:red;">存檔 !</u></strong>',
          timer: 3000
        })
        this.$emit('mouseChange', true)
        this.$emit('renderKey', 1)
      },
      share(){
        if(this.firstIn) return this.dialog = true
        if(!this.isSave) return Swal.fire({
          type: 'warning',
          title: `<h2>噢噢...</h2>`,
          html: '<strong>分享前請先記得<u style="color:red;">存檔 !</u></strong>',
          timer: 3000
        })
        return this.dialog = true
      },
      copy(){
        let testingCodeToCopy = this.$refs.copy_url
        testingCodeToCopy.setAttribute('type', 'text')
        testingCodeToCopy.select()

        try {
          var successful = document.execCommand('copy')
          if(successful){
            Swal.fire({
              type: 'success',
              title: '成功複製網址',
              text: '趕快分享給別人吧 !',
              timer: 3000
            })
          }
        } catch (err) {
          Swal.fire({
            type: 'error',
            title: '噢噢...',
            text: '看來有東西錯了喔 !',
            timer: 3000
          })
        }

        testingCodeToCopy.setAttribute('type', 'hidden')
        window.getSelection().removeAllRanges()
        return this.dialog = false
      },
      async save(){
        this.$emit('savePage', true)
        this.saveBook({ theId: this.bookId, theUser: this.$route.params.user })
      }
    },
    created(){
      this.cur_book = this.bookList.find(element => element.id === this.bookId)
      this.sharing.quote = this.cur_book.booktitle
      this.host = `${process.env.BASE_URL}/user/${this.$route.params.user}/guest/${this.$route.params.book}`
      this.sharing.url = this.host
    }
}
</script>

<style lang="scss" scoped>
.share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
}

a[class^="share-network-"] {
  flex: none;
  color: #FFFFFF;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 10px 0;
}

a[class^="share-network-"] .fah {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  flex: 0 1 auto;
}

a[class^="share-network-"] span {
  padding: 0 10px;
  flex: 1 1 0%;
  font-weight: 500;
}

.ps {
  height: 250px;
}
</style>