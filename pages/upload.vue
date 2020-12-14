<template>
    <div>
        <client-only>
            <vue-core-image-upload :crop="false" @imagechanged="imagechanged" @imageuploaded="imageuploaded" :data="upload" :max-file-size="5242880" url="/">
                <div class="text-h6 text-center text--secondary">Click Me To Upload</div>
            </vue-core-image-upload>            
        </client-only>

        <v-img :src="upload.src"></v-img>
        <v-btn @click="save()">123</v-btn>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

    export default {
        data(){
            return{
                upload: {
                    src:''
                }
            }
        },
        methods: {
            ...mapActions('upload', ['fetchSave']),
            imagechanged(res) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.upload.src = e.target.result
                    console.log("Here are upload.src", this.upload.src)
                }
                reader.readAsDataURL(res)
            },
            imageuploaded(res) {
                this.fetchSave(this.upload.src)
                console.log("this is the imageuploaded ", res)
            },
            save(){
                this.fetchSave(this.upload.src)    
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>