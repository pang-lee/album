<template>
  <div>
    <div class="container">
      <div class="flip-book" ref="book">
        <div v-for="n in total" :key="n" ref="page" class="page">
          <div v-if="n == 1" class="page-cover page-cover-top" data-density="hard">
            <div class="page-content">
              <input placeholder="點我輸入標題" style="text-align: center; margin-top: 50%; font-size: 210%"/>
            </div>
          </div>
          <div v-else-if="n == total" class="page-cover page-cover-bottom" data-density="hard">
            <div class="page-content">
              <h2 class="page-first-last">謝謝觀看</h2>
            </div>
          </div>
          <div v-else-if="n == total - 1" class="page-content">
            <input class="page-header" placeholder="點我輸入頁籤" type="text"/>

            <div v-show="!upload.src" class="page-image">
              <client-only>
                <vue-core-image-upload class="empty-state" inputOfFile="bookImg" :crop="false" @imagechanged="imagechanged" :data="upload" url="/">
                  <div class="text-h6 text-center text--secondary">點我上傳相片</div>
                </vue-core-image-upload>
              </client-only>
            </div>

            <div v-if="upload.src" class="page-image" @click="dialog = true">
              <v-img :src="upload.src" aspect-ratio="1.79" :style="filters" eager>
                <v-btn v-if="options[1].href" icon fab x-small :href="options[1].href" target="_blank" @click.stop="dialog = false" >
                  <v-icon color="#BDBDBD">{{ link }}</v-icon>
                </v-btn>
                <v-btn v-if="options[2].href" icon fab x-small :href="options[2].href" target="_blank" @click.stop="dialog = false">
                  <v-icon color="#BDBDBD">{{ live }}</v-icon>
                </v-btn>
                <v-btn v-if="options[3].href" icon fab x-small :href="options[3].href" target="_blank" @click.stop="dialog = false">
                  <v-icon color="#BDBDBD">{{ video }}</v-icon>
                </v-btn>
              </v-img>
              <v-dialog v-model="dialog" width="300" overlay-opacity="0.8">
                <v-card>
                  <div class="text-h6 font-weight-black text-center">相片設定</div>
                  <v-img :src="upload.src" :style="filters"></v-img>
                  <perfect-scrollbar>
                    <v-card-text v-if="filteImage">
                      <strong>灰階 ({{ photo.grayscale }})</strong>
                      <v-slider v-model="photo.grayscale" max="1" min="0" step="0.01"></v-slider>
                      <strong>棕褐色 ({{ photo.sepia }})</strong>
                      <v-slider v-model="photo.sepia" max="1" min="0" step="0.01"></v-slider>
                      <strong>飽和度 ({{ photo.saturate }})</strong>
                      <v-slider v-model="photo.saturate" max="1" min="0" step="0.01"></v-slider>
                      <strong>色相旋轉 ({{ photo.hueRotate }} 度)</strong>
                      <v-slider v-model="photo.hueRotate" max="360" min="0" step="1"></v-slider>
                      <strong>倒置 ({{ photo.invert }})</strong>
                      <v-slider  v-model="photo.invert"  max="1"  min="0"  step="0.01"></v-slider>
                      <strong>亮度 ({{ photo.brightness }})</strong>
                      <v-slider v-model="photo.brightness" max="3" min="0" step="0.01"></v-slider>
                      <strong>對比 ({{ photo.contrast }})</strong>
                      <v-slider v-model="photo.contrast" max="1" min="0" step="0.01"></v-slider>
                      <strong>模糊 ({{ photo.blur }} 像素)</strong>
                      <v-slider v-model="photo.blur" max="50" min="0" step="0.1"></v-slider>
                    </v-card-text>
                    <v-card-text v-else>
                      <v-expansion-panels focusable popout>
                        <v-expansion-panel v-for="(item, index) in options" :key="index">
                          <v-expansion-panel-header>{{item.title}}</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <br />
                            <vue-core-image-upload  v-if="item.title == '更換相片'" class="empty-state" inputOfFile="bookImg" :crop="false" @imagechanged="imagechanged" :data="upload" :max-file-size="5242880" url="/">
                              <div class="text-h6 text-center text--secondary">點我上傳相片</div>
                            </vue-core-image-upload>
                            <v-text-field v-else v-model="item.href" :label="item.title" outlined clearable></v-text-field>
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
            <div>
              <textarea placeholder="點我輸入內容" rows="8"></textarea>
            </div>
            <div class="page-footer">{{ n }}</div>
          </div>
          <div v-else>
            <div class="page-content">
              <h2 class="page-header">Page header {{ n }}</h2>
              <div class="page-image" style="background-image: url(images/html/1.jpg)"></div>
              <div class="page-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                cursus mollis nibh, non convallis ex convallis eu. Suspendisse
                potenti. Aenean vitae pellentesque erat. Integer non tristique
                quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
                velit viverra metus, a venenatis tellus tellus id magna. Aliquam
                ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque
                non justo vel nibh sollicitudin pharetra suscipit ut ipsum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                cursus mollis nibh, non convallis ex convallis eu. Suspendisse
                potenti. Aenean vitae pellentesque erat. Integer non tristique
                quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros
                velit viverra metus, a venenatis tellus tellus id magna.
              </div>
              <div class="page-footer">{{ n }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-center mt-5">
      <v-btn color="primary" outlined @click="prev()">上一頁</v-btn>&nbsp;
      <div class="text-body-2 mt-1">[{{ current }} / {{ total }}]</div>&nbsp;
      <v-btn color="primary" outlined @click="next()">下一頁</v-btn>
    </div>
  </div>
</template>

<script>
import { PageFlip } from "page-flip"
import * as icon from "@mdi/js"

export default {
  name: 'free',
  data() {
    return {
      current: 1,
      total: 5,
      pageFlip: {},
      dialog: false,
      photo: {
        grayscale: 0,
        sepia: 0,
        saturate: 1,
        hueRotate: 0,
        invert: 0,
        brightness: 1,
        contrast: 1,
        blur: 0,
        suffix: {
          hueRotate: "deg",
          blur: "px",
        },
      },
      options: [
        { title: "更換相片" },
        { title: "設定文章連結", href: "" },
        { title: "設定直播連結", href: "" },
        { title: "設定影片連結", href: "" },
      ],
      filteImage: true,
      link: icon.mdiLinkVariantPlus,
      live: icon.mdiVideoAccount,
      video: icon.mdiVideoBox,
      plus: icon.mdiPlusBoxMultipleOutline,
      upload: {
        src: ''
      }
    };
  },
  computed: {
    filters() {
      return {
        filter: Object.entries(this._data.photo)
          .filter((item) => typeof item[1] !== "object")
          .map(
            (item) =>
              `${this.toDash(item[0])}(${item[1]}${
                this.photo.suffix[item[0]] || ""
              })`
          )
          .join(" "),
      };
    },
  },
  methods: {
    prev() {
      this.pageFlip.flipPrev();
      this.pageFlip.on("flip", (event) => {
        this.current = event.data + 1;
      });
    },
    next() {
      this.pageFlip.flipNext();
      this.pageFlip.on("flip", (event) => {
        this.current = event.data + 1;
      });
    },
    toDash: (str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
    imagechanged(res) {
      const reader = new FileReader()
      reader.onload = (e) => this.upload.src = e.target.result
      reader.readAsDataURL(res)
    }
  },
  mounted() {
    this.pageFlip = new PageFlip(this.$refs.book, {
      width: 550,
      height: 733,
      size: "stretch",
      minWidth: 315,
      maxWidth: 1000,
      minHeight: 420,
      maxHeight: 1350,
      maxShadowOpacity: 0.5,
      showCover: true,
      useMouseEvents: false,
    });

    this.pageFlip.loadFromHTML(this.$refs.page);
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-size: cover;
  background-image: url("http://localhost:3000/bookcover2.png");
  // background-image: url("https://github.com/slyka85/assets/blob/master/bookcover2.png?raw=true");
}

.flip-book {
  display: none;
  background-size: cover;
  position: relative;
  margin-top: 2%;
}

.page {
  padding: 20px;
  background-image: url("http://localhost:3000/bookpaper.jpg");
  // background-image: url("https://img00.deviantart.net/cbb9/i/2005/258/c/4/paper_texture_v5_by_bashcorpo.jpg");
  background-size: cover;
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
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
    }

    .page-text {
      overflow: hidden;
      height: 35vh;
      flex-grow: 1;
      font-size: 80%;
      text-align: justify;
      margin-top: 10px;
      padding-top: 10px;
      box-sizing: border-box;
      border-top: solid 1px hsl(35, 55%, 90%);
    }

    .page-footer {
      position: relative;
      margin-top: 4%;
      height: 30px;
      border-top: solid 1px hsl(35, 55%, 90%);
      font-size: 80%;
      color: hsl(35, 20%, 50%);
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
    border: solid 1px hsl(35, 20%, 50%);

    &.page-cover-top {
      box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5),
        -2px 0 5px 2px rgba(0, 0, 0, 0.4);
    }

    &.page-cover-bottom {
      box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5),
        10px 0 8px 0px rgba(0, 0, 0, 0.4);
    }
  }

  .page-first-last {
    text-align: center;
    padding-top: 50%;
    font-size: 210%;
  }
}

.ps {
  height: 250px;
}

textarea {
  scrollbar-width: thin;
  outline: none;
  resize: none;
  box-shadow: 0 0 0 4px rgba(#9e9e9e, 0.3);
  width: 100%;
  height: 30vh;
  border-radius: 5px;
  border: 1px solid#9E9E9E;

  &:hover,
  &:focus {
    box-shadow: 0 0 0 4px rgba(#e0e0e0, 0.5);
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 0 5px 5px 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bdbdbd;
    border-radius: 5px;
  }
}

.empty-state {
  position: relative;
  padding: 22.5% 0% 22.5% 0%;
  border-color: rgba(0, 0, 0, 0.15);
  border-style: dashed;
  border-width: 2px;
  cursor: pointer;
  transition: border 0.2s ease-out;

  &:hover {
    border-color: #3897f0;
  }
}
</style>