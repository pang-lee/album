<template>
    <div>
        <v-form>
            <div class="white" :class="{error: validation.hasError('register')}">
                <v-text-field :prepend-icon="colorize" v-model="register.first" label="FirstName *" clearable :clear-icon="clear"></v-text-field>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.first') }}</div>
                <v-text-field :prepend-icon="edit" v-model="register.last" label="LastName *" clearable :clear-icon="clear"></v-text-field>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.last') }}</div>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.gender') }}</div>
                <v-text-field label="Email *" :prepend-icon="email" hint="For Example: Joe64@mail.com" v-model="register.email" clearable :clear-icon="clear"></v-text-field>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.email') }}</div>
                <v-text-field label="Password *" name="password" :prepend-icon="lock" clearable :clear-icon="clear" v-model="register.password" :append-icon="show1 ? visibility : visibility_off" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" counter/>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.password') }}</div>
                <v-text-field label="Confirm Password *" name="confirm" :prepend-icon="lock_confirm" clearable :clear-icon="clear" v-model="register.confirm" :append-icon="show2 ? visibility : visibility_off" :type="show2 ? 'text' : 'password'" @click:append="show2 = !show2" counter/>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.confirm') }}</div>
            </div>
        </v-form>
        <v-card-actions>
        <v-spacer/>
            <v-btn color="primary" @click="submit()">Register</v-btn>
        </v-card-actions>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
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
            ...mapMutations('books', ['CREATE_BOOK']),
            async submit(){
                let result = await this.$validate()
                if(result) await this.verify_signup(this.register)
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
                            await this.signup(value)
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
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>