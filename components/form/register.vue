<template>
    <div>
        <v-form>
            <div class="white" :class="{error: validation.hasError('register')}">
                <v-text-field :prepend-icon="colorize" v-model="register.first" label="FirstName *" clearable :clear-icon="clear"></v-text-field>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.first') }}</div>
                <v-text-field :prepend-icon="edit" v-model="register.last" label="LastName *" clearable :clear-icon="clear"></v-text-field>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.last') }}</div>
                <v-radio-group v-model="register.gender" row :prepend-icon="wc">
                    <v-radio label="Male" value="Male" color="indigo" :off-icon="unchecked" :on-icon="checked"></v-radio>
                    <v-radio label="Female" value="Female" color="error" :off-icon="unchecked" :on-icon="checked"></v-radio>
                </v-radio-group>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.gender') }}</div>
                <v-text-field label="Email *" :prepend-icon="email" hint="For Example: Joe64@mail.com" v-model="register.email" clearable :clear-icon="clear"></v-text-field>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.email') }}</div>
                <v-text-field label="Password *" name="password" :prepend-icon="lock" clearable :clear-icon="clear" v-model="register.password" :append-icon="show1 ? visibility : visibility_off" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" counter/>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.password') }}</div>
                <v-text-field label="Confirm Password *" name="confirm" :prepend-icon="lock_confirm" clearable :clear-icon="clear" v-model="register.confirm" :append-icon="show2 ? visibility : visibility_off" :type="show2 ? 'text' : 'password'" @click:append="show2 = !show2" counter/>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.confirm') }}</div>
                <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field v-model="register.birthday" label="Date of Birth" :prepend-icon="date" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="register.birthday" @input="menu2 = false"></v-date-picker>
                </v-menu>
                <v-text-field label="Phone" v-model="register.phone" :prepend-icon="phone" clearable :clear-icon="clear"></v-text-field>
                <div class="red--text font-italic font-weight-bold ml-8">{{ validation.firstError('register.phone') }}</div>
            </div>
        </v-form>
        <v-card-actions>
        <v-spacer/>
            <v-btn color="primary" @click="submit">Register</v-btn>
        </v-card-actions>
    </div>
</template>

<script>
import { Validator } from 'simple-vue-validator'
import Swal from 'sweetalert2'
import * as icon from '@mdi/js'

    export default {
           data(){
                return{
                    colorize:icon.mdiPencilPlusOutline,
                    clear:icon.mdiClose,
                    edit:icon.mdiPencilPlus,
                    wc:icon.mdiHumanMaleFemale,
                    unchecked:icon.mdiCheckboxBlankCircleOutline,
                    checked:icon.mdiCheckboxBlankCircle,
                    email:icon.mdiEmail,
                    lock:icon.mdiLock,
                    lock_confirm:icon.mdiLockOutline,
                    visibility:icon.mdiEye,
                    visibility_off:icon.mdiEyeOff,
                    date:icon.mdiCalendarMonth,
                    phone:icon.mdiPhone,
                    register:{
                        first:'',
                        last:'',
                        gender:'',
                        email:'',
                        password:'',
                        confirm:'',
                        birthday:new Date().toISOString().substr(0, 10),
                        phone:''
                    },
                    show1:false,
                    show2:false,
                    show:false,
                    menu:false,
                    menu2:false
                }
            },
            validators:{
                'register.first'(value){
                    return Validator.value(value).required()
                },
                'register.last'(value){
                    return Validator.value(value).required()
                },
                'register.gender'(value){
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
                },
                'register.birthday'(value){
                    return Validator.isEmpty(value)
                },
                'register.phone'(value){
                    return Validator.value(value).integer()
                }
            },
            methods:{
                submit(){
                    this.$validate()
                        .then((success) => {
                        if(success){
                            alert(success)
                        }else{
                            Swal.fire({
                                type: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!',
                                timer: 2000,
                            })
                        }
                    })
                }
            }
    }
</script>

<style lang="scss" scoped>

</style>