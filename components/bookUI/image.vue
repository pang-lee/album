<template>
    <div>
        <v-img v-if="mouseEvent" :src="bookImg.find(element => element.id === this.bookId)[`pages${this.bookpage}`]" aspect-ratio="1.79" :style="filters" eager>
            <v-btn class="link-btn-position" v-if="bookList.find(element => element.id === bookId).bookpage[bookpage].options[1].href" icon fab x-small :href="bookList.find(element => element.id === bookId).bookpage[bookpage].options[1].href" target="_blank"><v-icon color="#BDBDBD">{{ link }}</v-icon></v-btn>
            <v-btn class="link-btn-position" v-if="bookList.find(element => element.id === bookId).bookpage[bookpage].options[2].href" icon fab x-small :href="bookList.find(element => element.id === bookId).bookpage[bookpage].options[2].href" target="_blank"><v-icon color="#BDBDBD">{{ live }}</v-icon></v-btn>
            <v-btn class="link-btn-position" v-if="bookList.find(element => element.id === bookId).bookpage[bookpage].options[3].href" icon fab x-small :href="bookList.find(element => element.id === bookId).bookpage[bookpage].options[3].href" target="_blank"><v-icon color="#BDBDBD">{{ video }}</v-icon></v-btn>
        </v-img>

        <div v-else-if="upload.src" @click="dialog = true">
            <v-img :src="upload.src" aspect-ratio="1.79" :style="filters" eager>
                <v-btn class="link-btn-position" v-if="bookList.find(element => element.id === bookId).bookpage[bookpage].options[1].href" icon fab x-small :href="bookList.find(element => element.id === bookId).bookpage[bookpage].options[1].href" target="_blank" @click.stop="dialog = false"><v-icon color="#BDBDBD">{{ link }}</v-icon></v-btn>
                <v-btn class="link-btn-position" v-if="bookList.find(element => element.id === bookId).bookpage[bookpage].options[2].href" icon fab x-small :href="bookList.find(element => element.id === bookId).bookpage[bookpage].options[2].href" target="_blank" @click.stop="dialog = false"><v-icon color="#BDBDBD">{{ live }}</v-icon></v-btn>
                <v-btn class="link-btn-position" v-if="bookList.find(element => element.id === bookId).bookpage[bookpage].options[3].href" icon fab x-small :href="bookList.find(element => element.id === bookId).bookpage[bookpage].options[3].href" target="_blank" @click.stop="dialog = false"><v-icon color="#BDBDBD">{{ video }}</v-icon></v-btn>
            </v-img>
            <v-dialog v-model="dialog" width="300" overlay-opacity="0.8">
                <v-card>
                    <div class="text-h6 font-weight-black text-center">相片設定</div>
                    <v-img :src="bookImg.find(element => element.id === this.bookId)[`pages${this.bookpage}`]" aspect-ratio="1.79" :style="filters" eager></v-img>
                    <perfect-scrollbar>
                        <v-card-text v-if="filteImage">
                            <strong>灰階 ({{ bookList.find(element => element.id === bookId).bookpage[bookpage].photo.grayscale }})</strong>
                            <v-slider v-model="grayscale" max="1" min="0" step="0.01"></v-slider>
                            <strong>懷舊 ({{ bookList.find(element => element.id === bookId).bookpage[bookpage].photo.sepia }})</strong>
                            <v-slider v-model="sepia" max="1" min="0" step="0.01"></v-slider>
                            <strong>飽和度 ({{ bookList.find(element => element.id === bookId).bookpage[bookpage].photo.saturate }})</strong>
                            <v-slider v-model="saturate" max="1" min="0" step="0.01"></v-slider>
                            <strong>色相旋轉 ({{ bookList.find(element => element.id === bookId).bookpage[bookpage].photo.hueRotate }} 度)</strong>
                            <v-slider v-model="hueRotate" max="360" min="0" step="1"></v-slider>
                            <strong>負片 ({{ bookList.find(element => element.id === bookId).bookpage[bookpage].photo.invert }})</strong>
                            <v-slider v-model="invert" max="1" min="0" step="0.01"></v-slider>
                            <strong>亮度 ({{ bookList.find(element => element.id === bookId).bookpage[bookpage].photo.brightness }})</strong>
                            <v-slider v-model="brightness" max="3" min="0" step="0.01"></v-slider>
                            <strong>對比 ({{ bookList.find(element => element.id === bookId).bookpage[bookpage].photo.contrast }})</strong>
                            <v-slider v-model="contrast" max="1" min="0" step="0.01"></v-slider>
                            <strong>模糊 ({{ bookList.find(element => element.id === bookId).bookpage[bookpage].photo.blur }} 像素)</strong>
                            <v-slider v-model="blur" max="50" min="0" step="0.1"></v-slider>
                        </v-card-text>
                        <v-card-text v-else>
                            <v-expansion-panels focusable popout>
                                <v-expansion-panel v-for="(item, index) in bookList.find(element => element.id === bookId).bookpage[bookpage].options" :key="index">
                                <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <br/>
                                    <div v-if="item.title == '更換相片'" @click="editingImg(bookpage)">
                                        <vue-core-image-upload inputOfFile="bookImg" class="empty-state" :crop="false" @imagechanged="imagechanged" @imageuploaded="imageuploaded" :data="upload" :max-file-size="5242880" :url="book_img_url">
                                            <div class="text-h6 text-center text--secondary">點我更新圖片</div>
                                        </vue-core-image-upload>
                                    </div>
                                    <v-text-field v-else @input="hrefOption(index, $event)" :value="item.href" :label="item.title" outlined clearable></v-text-field>
                                </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-card-text>
                    </perfect-scrollbar>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="filteImage = true">濾鏡</v-btn>
                        <v-btn color="primary" text @click="filteImage = false">相片設定</v-btn>
                        <v-btn color="primary" text @click="dialog = false">完成</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>

        <div v-show="!upload.src" @click="editingImg(bookpage)">
            <vue-core-image-upload inputOfFile="bookImg" class="empty-state" :crop="false" @imagechanged="imagechanged" @imageuploaded="imageuploaded" :data="upload" :max-file-size="5242880" :url="book_img_url">
                <div class="text-h6 text-center text--secondary">點我上傳相片</div>
            </vue-core-image-upload>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as icon from '@mdi/js'

    export default {
        name: 'book_image',
        props:{
            bookId:{
                type: String,
                default: '1',
                required: true
            },
            bookpage:{
                type: Number,
                require: true
            },
            imgfilter:{
                type: Array,
                require: true
            },
            mouseEvent: {
                type: Boolean,
                default: true,
                required: true
            }
        },
        data() {
            return {
                dialog: false,
                filteImage: true,
                link: icon.mdiLinkVariantPlus,
                live: icon.mdiVideoAccount,
                video: icon.mdiVideoBox,
                photo:{},
                edit_img_info: {},
                book_img_url: '',
                upload:{
                    src: ''
                }
            }
        },
        computed:{
            ...mapGetters('books', ['bookList', 'bookImg']),
            filters() {
                return { filter: Object.entries(this._data.photo).filter(item => typeof(item[1]) !== 'object').map(item => `${this.toDash(item[0])}(${item[1]}${this.photo.suffix[item[0]] || ''})`).join(' ') }
            },
            grayscale:{
                get(){
                    return this.imgfilter[this.bookpage].photo.grayscale
                },
                set(value){
                    return this.SET_GRAYSCALE({ which_id: this.bookId, which_page: this.bookpage, value: value})
                }
            },
            sepia:{
                get(){
                    return this.imgfilter[this.bookpage].photo.sepia
                },
                set(value){
                    return this.SET_SEPIA({ which_id: this.bookId, which_page: this.bookpage, value: value})
                }
            },
            saturate:{
                get(){
                    return this.imgfilter[this.bookpage].photo.saturate
                },
                set(value){
                    return this.SET_SATURATE({ which_id: this.bookId, which_page: this.bookpage, value: value})
                }
            },
            hueRotate:{
                get(){
                    return this.imgfilter[this.bookpage].photo.hueRotate
                },
                set(value){
                    return this.SET_HUEROTATE({ which_id: this.bookId, which_page: this.bookpage, value: value})
                }
            },
            invert:{
                get(){
                    return this.imgfilter[this.bookpage].photo.invert
                },
                set(value){
                    return this.SET_INVERT({ which_id: this.bookId, which_page: this.bookpage, value: value})
                }
            },
            brightness:{
                get(){
                    return this.imgfilter[this.bookpage].photo.brightness
                },
                set(value){
                    return this.SET_BRIGHTNESS({ which_id: this.bookId, which_page: this.bookpage, value: value})
                }
            },
            contrast:{
                get(){
                    return this.imgfilter[this.bookpage].photo.contrast
                },
                set(value){
                    return this.SET_CONTRAST({ which_id: this.bookId, which_page: this.bookpage, value: value})
                }
            },
            blur:{
                get(){
                    return this.imgfilter[this.bookpage].photo.blur
                },
                set(value){
                    return this.SET_BLUR({ which_id: this.bookId, which_page: this.bookpage, value: value})
                }
            }
        },
        methods: {
            ...mapMutations('books', ['SET_BOOKIMG', 'SET_BOOKPAGEIMG', 'SET_GRAYSCALE', 'SET_SEPIA', 'SET_SATURATE', 'SET_HUEROTATE', 'SET_INVERT', 'SET_BRIGHTNESS', 'SET_CONTRAST', 'SET_BLUR', 'SET_POSTLINK', 'SET_LIVESTREAMLINK', 'SET_VIDEOLINK']),
            hrefOption(index, e){
                switch(index){
                    case 1:
                        return this.SET_POSTLINK({ which_id: this.bookId, which_page: this.bookpage, value: e })
                    case 2:
                        return this.SET_LIVESTREAMLINK({ which_id: this.bookId, which_page: this.bookpage, value: e })
                    case 3:
                        return this.SET_VIDEOLINK({ which_id: this.bookId, which_page: this.bookpage, value: e })
                    default:
                        return null
                }
            },
            editingImg(page){
                return this.edit_img_info = { which_id: this.bookId, which_page: page }
            },
            toDash: (str) => str.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase(),
            imagechanged(res) {
                const reader = new FileReader()
                reader.onload = (e) => this.upload.src = e.target.result
                this.SET_BOOKIMG({ ...this.edit_img_info, value: res})
                reader.readAsDataURL(res)
            },
            imageuploaded(res) {
                this.SET_BOOKPAGEIMG({ ...this.edit_img_info, value: res })
            }
        },
        created() {
            if(!this.bookImg.length == 0) this.upload.src = this.bookImg.find(element => element.id === this.bookId)[`pages${this.bookpage}`]
            this.photo = this.bookList.find(element => element.id === this.bookId).bookpage[this.bookpage].photo
            this.book_img_url = `${process.env.AXIOS_URL}/upload/bookImg`
        }
    }
</script>

<style lang="scss" scoped>
.link-btn-position{
  position: relative;
  margin-top: 45%;
}

.ps {
  height: 250px;
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