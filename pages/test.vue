<template>
    <div>
    <client-only>
        <vue-core-image-upload class="empty-state" inputOfFile="bookImg" :crop="false" :data="upload" :max-file-size="5242880" url="http://localhost:3001/upload/bookImg">
            <div class="text-h6 text-center text--secondary">Click Me To Upload</div>
        </vue-core-image-upload>
    </client-only>
    <v-img :src="upload.src"></v-img>
    <v-img :src="test"></v-img>
    </div>
</template>

<script>
export default {
    data() {
        return {
            upload:{
                src:''
            },
            test:''
        }
    },
    async created() {
        if(process.client){
            let a = await this.$axios.$get('upload/bookImg')
            console.log(a)
            this.upload.src = 'data:image/*;base64,' + a[0].pages0
            this.test = 'data:image/*;base64,' + a[0].pages1

            // this.upload.src = a[0].pages0.toString('base64')

            // const reader = new FileReader()
            // reader.readAsArrayBuffer(a)
            // reader.onload = () => {
            //     console.log('this is a', a)
            //     // let b = JSON.parse(reader.result)
            //     // console.log('this is b', b)
            //     // this.upload.src = window.URL.createObjectURL(new Blob([a], { type: 'image/*' }))
            //     // this.upload.src = window.URL.createObjectURL(new Blob([flatted.parse(b[0].pages0)], { type: 'image/*' }))
            // }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>