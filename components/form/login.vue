<template>
    <div>
        <v-form>
            <div class="white" :class="{error: validation.hasError('login')}">
                <v-text-field label="Email *" name="login" :prepend-icon="account" clearable :clear-icon="clear" v-model="login.email"/>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('login.email') }}</div>
                <v-text-field label="Password *" name="password" :prepend-icon="lock" clearable :clear-icon="clear" v-model="login.password" :append-icon="show ? visibility : visibility_off" :type="show ? 'text' : 'password'" @click:append="show = !show" counter/>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('login.password') }}</div>
            </div>
        </v-form>
        <v-card-actions>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon color="indigo" v-bind="attrs" v-on="on" @click="facebook_login()">{{facebook}}</v-icon>
            </template>
            <span>Facebook</span>
        </v-tooltip>
            <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon class="ml-3" color="red" v-bind="attrs" v-on="on">{{google}}</v-icon>
            </template>
            <span>Google</span>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon class="ml-3" color="light-blue" v-bind="attrs" v-on="on">{{twitter}}</v-icon>
            </template>
            <span>Twitter</span>
        </v-tooltip>
        <v-spacer/>
        <v-btn text x-small :ripple="false" class="mr-4" @click="forget_password()">Forget?</v-btn>
        <v-btn color="primary" @click="submit">Login</v-btn>
        </v-card-actions>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { Validator } from 'simple-vue-validator'
import * as icon from '@mdi/js'
import Swal from 'sweetalert2'

export default {
    data(){
        return{
            facebook:icon.mdiFacebook,
            account:icon.mdiAccount,
            clear:icon.mdiClose,
            lock:icon.mdiLock,
            visibility:icon.mdiEye,
            visibility_off:icon.mdiEyeOff,
            google:icon.mdiGooglePlus,
            twitter:icon.mdiTwitter,
            login:{
                email:'',
                password:'',    
            },
            show:false
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
        ...mapGetters('authentication', ['getSuccessVerify', 'getUser', 'getResetStatus']),
    },
    methods:{
        ...mapActions('authentication', ['verify_login', 'fetchToken', 'forget']),
        submit(){
            this.$validate()
                .then((success) => {
                    if(success){
                        return this.verify_login(this.login)
                    }else{
                        return Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Look like you miss something!',
                            timer: 3000,
                        })
                    }
                }).then(() => {
                    if(this.getSuccessVerify == true){
                        return Swal.fire({
                            title: 'Enter your Verification code',
                            input: 'text',
                            allowOutsideClick: false,
                            showCloseButton:true,
                            inputPlaceholder: 'Code Number',
                            inputValidator: (value) => {
                                if (!value) {
                                    return 'You need to write something!'
                                }
                            },
                            preConfirm: async (value) => {
                                await this.fetchToken(value)
                                if(this.getUser.id) return this.$router.push(`/user/${this.getUser.id}`)
                            }
                        })
                    }
                })
        },
        async forget_password(){
            const { value: email } = await Swal.fire({
                type: 'question',
                title: 'Reset Your Password',
                input: 'email',
                inputPlaceholder: 'Enter your email address',
                showCloseButton: true,
                preConfirm: async (value) => {
                    await this.forget(value)
                    if(this.getResetStatus == true) return Swal.fire({
                        type: 'success',
                        title: 'Please Check Your Email!!',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })
        }
    }
}
</script>

<style scoped>

</style>