<template>
    <div>
        <client-only>
            <book :page="book.page" :key="componentKey" :isSave="isSave" v-on:addPage="onAddPage" :mouseEvent="mouseEvent"></book>
        </client-only>
        <br/>
        <v-divider></v-divider>
        <div class="d-flex justify-center mt-5">
            <v-btn-toggle v-model="btnStatus" tile color="primary" mandatory group>
                <v-btn value="preview" @click.stop="preview()">Preview</v-btn>
                <v-btn value="edit" @click.stop="edit()">Edit</v-btn>
                <v-btn value="save" @click.stop="save()">Save</v-btn>
                <v-btn value="share" @click.stop="share()">Share</v-btn>
                <v-dialog v-model="dialog">
                <v-card>
                    <br/>
                    <v-card-subtitle class="text-center font-weight-black font-italic">Share With Your Friend</v-card-subtitle>
                    <v-divider></v-divider>
                    <br/>
                    <v-card-actions>
                      <share></share>
                    </v-card-actions>
                </v-card>
            </v-dialog>
          </v-btn-toggle>
        </div>
        <br/>
    </div>
</template>

<script>
import * as icon from '@mdi/js'
import Swal from 'sweetalert2'
import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    layout: 'user',
    data() {
      return {
        componentKey: 0,
        btnStatus: 'edit',
        dialog: false,
        mouseEvent: false,
        isSave: false
      }
    },
    computed:{
      ...mapGetters('books', ['book'])
    },
    methods: {
      ...mapMutations('books', ['CLEAR_ALL', 'SET_BOOKPAGE']),
      forceRerender() {
        this.componentKey += 1
      },
      onAddPage(update) {
        this.SET_BOOKPAGE(update)
        this.isSave = false
        this.forceRerender()
      },
      async copy(){
        try {
          await this.$copyText(process.env.BASE_URL + this.$route.fullPath)
          Swal.fire({
            type: 'success',
            title: 'Success Copy Url',
            text: 'Now You Can Share With Your Friend',
            timer: 3000
          })
          return this.dialog = false
        } catch (error) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            timer: 3000
          })
        }
      },
      edit(){
        this.mouseEvent = false
        this.isSave = false
        this.forceRerender()
      },
      preview(){
        if(!this.isSave) return Swal.fire({
          type: 'warning',
          title: `<h2>Oops...</h2>`,
          html: '<strong>Please Remember To <u style="color:red;">Save Before You Preview!</u></strong>',
          timer: 3000
        })
        this.mouseEvent = true
        this.forceRerender()
      },
      share(){
        if(!this.isSave) return Swal.fire({
          type: 'warning',
          title: `<h2>Oops...</h2>`,
          html: '<strong>Please Remember To <u style="color:red;">Save Before You Share!</u></strong>',
          timer: 3000
        })
        return this.dialog = true
      },
      async save(){
        this.isSave = true
      }
    },
    created(){
      this.CLEAR_ALL()
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