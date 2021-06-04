<template>
    <div>
        <v-form>
            <div class="white" :class="{error: validation.hasError('register')}">
                <v-text-field :prepend-icon="colorize" v-model="register.first" label="姓氏 *" clearable :clear-icon="clear"></v-text-field>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.first') }}</div>
                <v-text-field :prepend-icon="edit" v-model="register.last" label="名子 *" clearable :clear-icon="clear"></v-text-field>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.last') }}</div>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.gender') }}</div>
                <v-text-field label="Email 帳號 *" :prepend-icon="email" hint="example: apple@mail.com" v-model="register.email" clearable :clear-icon="clear"></v-text-field>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.email') }}</div>
                <v-text-field label="密碼 *" name="password" :prepend-icon="lock" clearable :clear-icon="clear" v-model="register.password" :append-icon="show1 ? visibility : visibility_off" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" counter/>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.password') }}</div>
                <v-text-field label="確認密碼 *" name="confirm" :prepend-icon="lock_confirm" clearable :clear-icon="clear" v-model="register.confirm" :append-icon="show2 ? visibility : visibility_off" :type="show2 ? 'text' : 'password'" @click:append="show2 = !show2" counter/>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.confirm') }}</div>
            </div>
        </v-form>
        <v-card-actions>
        <v-spacer/>
            <v-btn color="primary" @click="submit()">註冊帳號</v-btn>
        </v-card-actions>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Validator } from 'simple-vue-validator'
import Swal from 'sweetalert2'
import * as icon from '@mdi/js'

    export default {
        name: 'register',
        data(){
            return{
                colorize:icon.mdiPencilPlusOutline,
                clear:icon.mdiClose,
                edit:icon.mdiPencilPlus,
                email:icon.mdiEmail,
                lock:icon.mdiLock,
                lock_confirm:icon.mdiLockOutline,
                visibility:icon.mdiEye,
                visibility_off:icon.mdiEyeOff,
                register:{
                    first:'',
                    last:'',
                    email:'',
                    password:'',
                    confirm:''
                },
                show1:false,
                show2:false
            }
        },
        validators:{
            'register.first'(value){
                return Validator.value(value).required()
            },
            'register.last'(value){
                return Validator.value(value).required()
            },
            'register.email'(value){
                return Validator.value(value).required().email()
            },
            'register.password'(value){
                return Validator.value(value).required().minLength(6)
            },
            'register.confirm, register.password'(password, confirm){
                return Validator.value(confirm).required().match(password)
            }
        },
        computed:{
            ...mapGetters('authentication', ['getSuccessVerify']),
            ...mapGetters('admin', ['user', 'sidebar'])
        },
        methods:{
            ...mapActions('authentication', ['verify_signup', 'signup']),
            ...mapActions('admin', ['fetchMe']),
            async submit(){
                let result = await this.$validate()
                if(result) await this.verify_signup(this.register)
                else return Swal.fire({
                    type: 'error',
                    title: '噢噢...',
                    text: '看來有東西輸入錯囉 !',
                    timer: 3000
                })
                if(this.getSuccessVerify == true) return Swal.fire({
                    title: '輸入您的驗證碼',
                    input: 'text',
                    allowOutsideClick: false,
                    showCloseButton:true,
                    inputPlaceholder: '驗證碼',
                    inputValidator: (value) => {
                      if (!value) return '看來你少輸入東西囉 !'
                    },
                    preConfirm: async (value) => {
                        try {
                            await this.signup(value)
                            if(this.$cookies.get('album_access_token') !== undefined){
                                await this.fetchMe()
                                return this.$router.push(`/user/${this.user.id}/dashboard/add`)
                            }
                            return null
                        } catch (error) {
                            throw new Error(error)
                        }

                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>