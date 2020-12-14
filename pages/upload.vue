<template>
    <div>
        <client-only>
            <vue-core-image-upload :crop="false" @imagechanged="imagechanged" @imageuploaded="imageuploaded" :data="upload" :max-file-size="5242880" url="/">
                <div class="text-h6 text-center text--secondary">Click Me To Upload</div>
            </vue-core-image-upload>            
        </client-only>

        <v-img :src="upload.src"></v-img>
    </div>
</template>

<script>

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
                    console.log(res)
                }
                reader.readAsDataURL(res)
            },
            imageuploaded(res) {
                this.fetchSave(this.upload.src)
                console.log("this is the imageuploaded ", res)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>