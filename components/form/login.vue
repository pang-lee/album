<template>
    <div>
        <v-form>
            <div class="white" :class="{ error: validation.hasError('login') }">
                <v-text-field label="Email *" name="login" :prepend-icon="account" clearable :clear-icon="clear" v-model="login.email"/>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('login.email') }}</div>
                <v-text-field label="Password *" name="password" :prepend-icon="lock" clearable :clear-icon="clear" v-model="login.password" :append-icon="show ? visibility : visibility_off" :type="show ? 'text' : 'password'" @click:append="show = !show" counter/>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('login.password') }}</div>
            </div>
        </v-form>
        <v-card-actions class="hidden-sm-and-down">
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon color="indigo" v-bind="attrs" v-on="on">{{ facebook }}</v-icon>
                </template>
                <span>Facebook</span>
            </v-tooltip>
                <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-3" color="red" v-bind="attrs" v-on="on" @click="googleAuth()">{{ google }}</v-icon>
                </template>
                <span>Google</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-3" color="light-blue" v-bind="attrs" v-on="on">{{ twitter }}</v-icon>
                </template>
                <span>Twitter</span>
            </v-tooltip>
            <v-spacer/>
            <v-btn text x-small :ripple="false" class="mr-4" @click="forget_password()">Forget?</v-btn>
            <v-btn color="primary" @click="submit()">Login</v-btn>
        </v-card-actions>
        <v-card-actions class="hidden-md-and-up">
            <v-menu offset-y>
                <template v-slot:activator="{ on: menu, attrs }">
                    <v-tooltip top>
                      <template v-slot:activator="{ on: tooltip }">
                        <v-btn text icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                            <v-icon>{{ dropmenu }}</v-icon>
                        </v-btn>
                        </template>
                        <span>Login With Option:</span>
                    </v-tooltip>
                </template>
                <v-list>
                    <v-list-item v-for="(login, index) in options" :key="index">
                      <v-icon :color="login.color" @click="test()">{{ login.option }}</v-icon>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-spacer/>
            <v-btn text :ripple="false" class="mr-4" @click="forget_password()">?</v-btn>
            <v-btn color="primary" @click="submit()">Login</v-btn>
        </v-card-actions>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Validator } from 'simple-vue-validator'
import * as icon from '@mdi/js'
import Swal from 'sweetalert2'

export default {
    name: 'login',
    data(){
        return{
            facebook: icon.mdiFacebook,
            account: icon.mdiAccount,
            clear: icon.mdiClose,
            lock: icon.mdiLock,
            visibility: icon.mdiEye,
            visibility_off: icon.mdiEyeOff,
            google: icon.mdiGooglePlus,
            twitter: icon.mdiTwitter,
            dropmenu: icon.mdiChevronDown,
            login:{
                email:'',
                password:'',    
            },
            show:false,
            options:[
                { option: icon.mdiFacebook, color: 'indigo' },
                { option: icon.mdiGooglePlus, color: 'red' },
                { option: icon.mdiTwitter, color: 'light-blue' }
            ],
            items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],

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
        ...mapActions('authentication', ['verify_login', 'fetchToken', 'forget']),
        ...mapActions('admin', ['fetchMe']),
        ...mapMutations('books', ['CREATE_BOOK']),
        generateUID() {
            let firstPart = (Math.random() * 46656) | 0
            let secondPart = (Math.random() * 46656) | 0
            firstPart = ("000" + firstPart.toString(36)).slice(-3)
            secondPart = ("000" + secondPart.toString(36)).slice(-3)
            return new Date().getMilliseconds() + '_' + firstPart + secondPart
        },
        async submit(){
            let result = await this.$validate()
            if(result) await this.verify_login(this.login)
            else return Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Look like you miss something!',
                timer: 3000
            })
            if(this.getSuccessVerify == true) return Swal.fire({
                title: 'Enter your Verification code',
                input: 'text',
                allowOutsideClick: false,
                showCloseButton:true,
                inputPlaceholder: 'Code Number',
                inputValidator: (value) => {
                    if (!value) return 'You need to write something!'
                },
                preConfirm: async (value) => {
                    try {
                        await this.fetchToken(value)
                        if(this.$cookies.getAll().length == 0) return
                        await this.fetchMe()
                        if(this.user.id && this.sidebar.length !== 0) return this.$router.push(`/user/${this.user.id}${this.sidebar[0].link}`)
                        else {
                            let bookId = this.generateUID()
                            this.CREATE_BOOK(bookId)
                            return this.$router.push(`/user/${this.user.id}/dashboard/add?=${bookId}`)
                        }
                    } catch (error) {
                        throw new Error(error)
                    }
                }
            })
        },
        async forget_password(){
            return await Swal.fire({
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
        },
        googleAuth(){
            window.location.href = process.env.OAUTH_GOOGLE
        },
        test(){
            console.log('test click')
        }
    }
}
</script>

<style scoped>

</style>