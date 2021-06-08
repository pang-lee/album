<template>
    <div>
        <div ref="qrcode"></div>
    </div>
</template>

<script>
    export default {
        data() {
          return {
            qrcodeObj: {}
          }
        },
        mounted() {
            this.qrcodeObj = new QRCode(this.$refs.qrcode, {
                  text: 'Always believe that good things are about to happen',    
                  width: 200,
                  height: 200,
                  colorDark : '#0f0', // green
                  colorLight : '#fff',
                  correctLevel : QRCode.CorrectLevel.H
            });
        },
    }
</script>

<style lang="scss" scoped>

</style>