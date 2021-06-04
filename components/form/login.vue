<template>
    <div>
        <v-form>
            <div class="white" :class="{ error: validation.hasError('login') }">
                <v-text-field label="Email 帳號 *" name="login" :prepend-icon="account" clearable :clear-icon="clear" v-model="login.email"/>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('login.email') }}</div>
                <v-text-field label="密碼 *" name="password" :prepend-icon="lock" clearable :clear-icon="clear" v-model="login.password" :append-icon="show ? visibility : visibility_off" :type="show ? 'text' : 'password'" @click:append="show = !show" counter/>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('login.password') }}</div>
            </div>
        </v-form>
        <v-card-actions class="d-flex justify-end">
            <v-btn text x-small :ripple="false" class="mr-4" @click="forget_password()">忘記密碼 ?</v-btn>
            <v-btn color="primary" @click="submit()">登入</v-btn>
        </v-card-actions>
        <br/>
        <div class="d-flex justify-end">
            <v-btn text outlined small nuxt to="/privacy-policy">
                <span class="font-weight-bold font-italic">隱私權與服務條款</span>
            </v-btn>
        </div>
        <br/>
        <v-divider></v-divider>
        <client-only>
            <v-container fluid>
                <v-row align-content="center">
                    <v-col cols="12">
                        <span class="d-flex justify-center">
                            <GoogleLogin :params="google_params" :renderParams="google_renderParams" :onSuccess="googleOnSuccess" :onFailure="googleOnFailure"></GoogleLogin>
                        </span>
                    </v-col>
                    <v-col>
                        <span class="d-flex justify-center">
                            <v-facebook-login :app-id="facebook_id" @login="fb_login" @sdk-init="fb_init"></v-facebook-login>
                        </span>
                    </v-col>
                </v-row>   
            </v-container>
        </client-only>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Validator } from 'simple-vue-validator'
import GoogleLogin from 'vue-google-login'
import * as icon from '@mdi/js'
import Swal from 'sweetalert2'

export default {
    name: 'login',
    components:{
        GoogleLogin,
        VFacebookLogin: () => process.client ? import('vue-facebook-login-component') : null,
    },
    data(){
        return{
            google_params: {
                client_id: process.env.OAUTH_GOOGLE
            },
            google_renderParams: {
                width: 210,
                height: 35,
                longtitle: true
            },
            facebook_id: process.env.OAUTH_FACEBOOK,
            facebook: icon.mdiFacebook,
            account: icon.mdiAccount,
            clear: icon.mdiClose,
            lock: icon.mdiLock,
            visibility: icon.mdiEye,
            visibility_off: icon.mdiEyeOff,
            google: icon.mdiGooglePlus,
            dropmenu: icon.mdiChevronDown,
            login:{
                email:'',
                password:'',    
            },
            show:false,
            options:[
                { option: icon.mdiFacebook, color: 'indigo' },
                { option: icon.mdiGooglePlus, color: 'red' }
            ],
            fb:{}
        }
    },
    validators:{
        'login.email'(value){
            return Validator.value(value).required().email()
        },
        'login.password'(value){
            return Validator.value(value).required().minLength(6)
        }
    },
    computed:{
        ...mapGetters('authentication', ['getSuccessVerify', 'getResetStatus']),
        ...mapGetters('admin', ['user', 'sidebar'])
    },
    methods:{
        ...mapActions('authentication', ['verify_login', 'fetchToken', 'forget', 'googleLogin', 'facebookLogin']),
        ...mapActions('admin', ['fetchMe']),
        async submit(){
            let result = await this.$validate()
            if(result) await this.verify_login(this.login)
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
                        await this.fetchToken(value)
                        if(this.$cookies.get('album_access_token') !== undefined){
                            await this.fetchMe()
                            return (this.user.id && this.sidebar.length !== 0) ? this.$router.push(`/user/${this.user.id}${this.sidebar[0].link}`) : this.$router.push(`/user/${this.user.id}/dashboard/add`)
                        }
                        return null
                    } catch (error) {
                        throw new Error(error)
                    }
                }
            })
        },
        async forget_password(){
            return await Swal.fire({
                type: 'question',
                title: '忘記密碼 ?',
                input: 'email',
                inputPlaceholder: '請輸入您的Email',
                showCloseButton: true,
                preConfirm: async (value) => {
                    await this.forget(value)
                    if(this.getResetStatus == true) return Swal.fire({
                        type: 'success',
                        title: '重設的密碼已經傳入Email !!',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })
        },
        async googleOnSuccess(googleUser){
            await this.googleLogin(googleUser)
            if(this.$cookies.get('album_access_token') !== undefined){
                return (this.user.id && this.sidebar.length !== 0) ? this.$router.push(`/user/${this.user.id}${this.sidebar[0].link}`) : this.$router.push(`/user/${this.user.id}/dashboard/add`)
            }
        },
        googleOnFailure(){
            return Swal.fire({
                type: 'error',
                title: '噢噢...',
                text: '看來Google登入失敗囉 !',
                timer: 3000
            })
        },
        fb_init({ FB }){
            this.fb = FB
        },
        fb_login(facebookAuth){
            this.fb.api('/me', { fields: 'id,email,first_name,last_name,picture{url}' }, async(response) => {
                await this.facebookLogin({ fbUser: response, fbAuth: facebookAuth })
                if(this.$cookies.get('album_access_token') !== undefined){
                    return (this.user.id && this.sidebar.length !== 0) ? this.$router.push(`/user/${this.user.id}${this.sidebar[0].link}`) : this.$router.push(`/user/${this.user.id}/dashboard/add`)
                }
            })
        }
    }
}
</script>

<style scoped>

</style>