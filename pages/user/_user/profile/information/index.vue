<template>
  <v-row class="mx-auto">
    <v-col>
      <v-card elevation="10">
        <v-card-subtitle class="font-weight-black font-italic text-center">關於我</v-card-subtitle>
        <v-divider></v-divider>
        <br/>
        <v-card-text>
          <v-expansion-panels popout>
            <v-expansion-panel v-for="(message, index) in messages" :key="index" hide-actions>
              <v-expansion-panel-header>
                <v-row align="center" justify="center" no-gutters>
                  <v-col cols="4" sm="2" md="1">
                    <v-avatar size="36px">
                      <client-only v-if="message.avatar">
                        <v-icon v-if="message.avatar == 'empty'" color="black">{{ message.icon }}</v-icon>
                        <v-img v-else :src="message.avatar" alt="Avatar"></v-img>
                      </client-only>
                      <v-icon v-else :color="message.color" v-text="message.icon"></v-icon>
                    </v-avatar>
                  </v-col>
                  <v-col class="hidden-xs-only" sm="5" md="3">
                    <strong v-if="message.name">{{ message.name }}</strong>
                    <strong>{{ message.topic }}</strong>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>       
              <v-expansion-panel-content>
                <v-divider></v-divider>

                <v-card-text v-if="message.name">
                  <div class="white" :class="{ error: validation.hasError('first') }">
                    <v-text-field v-model="first" label="First" outlined clearable :clear-icon="clear"></v-text-field>
                    <div class="red--text font-italic font-weight-bold">{{ validation.firstError('first') }}</div>
                  </div>
                  <br/>
                  <div class="white" :class="{ error: validation.hasError('last') }">
                    <v-text-field v-model="last" label="Last" outlined clearable :clear-icon="clear"></v-text-field>
                    <div class="red--text font-italic font-weight-bold">{{ validation.firstError('last') }}</div>
                  </div>
                  <v-divider></v-divider>
                  <div class="d-flex justify-center mt-5">
                    <v-btn outlined color="primary" @click="setname(user.first + ' ' + user.last)">儲存</v-btn>
                  </div>
                </v-card-text>

                 <v-card-text v-else-if="message.topic == '密碼設定'">
                  <div class="hidden-sm-and-down">
                    <div class="text-h6 text-center">你想要重設密碼 ?</div>
                    <br/>
                    <div class="white" :class="{ error: validation.hasError('reset') }">
                      <v-text-field label="重設的密碼" name="password" outlined :prepend-icon="lock" clearable :clear-icon="clear" v-model="reset" :append-icon="show ? visibility : visibility_off" :type="show ? 'text' : 'password'" @click:append="show = !show" counter></v-text-field>
                      <div class="red--text font-italic font-weight-bold">{{ validation.firstError('reset') }}</div>
                    </div>               
                    <v-divider></v-divider>
                    <div class="d-flex justify-center mt-5">
                      <v-btn outlined color="primary" @click="reset_password()">儲存</v-btn>
                    </div>
                  </div>

                  <div class="hidden-md-and-up">
                    <v-dialog v-model="mobile_reset" persistent max-width="290">
                      <template v-slot:activator="{ on, attrs }">
                        <div class="d-flex justify-center mt-5">
                          <v-btn outlined color="blue darken-4" v-bind="attrs" v-on="on">Reset?</v-btn>
                        </div>
                      </template>
                      <v-card>
                        <div class="text-caption text-center pt-5">Do you want to Reset your Password?</div>
                        <br/>
                        <v-divider></v-divider>
                        <br/>
                        <v-card-text>
                          <div class="white" :class="{ error: validation.hasError('reset') }">
                            <v-text-field label="Reset Your Password" name="password" outlined :prepend-icon="lock" clearable :clear-icon="clear" v-model="reset" :append-icon="show ? visibility : visibility_off" :type="show ? 'text' : 'password'" @click:append="show = !show" counter></v-text-field>
                            <div class="red--text font-italic font-weight-bold">{{ validation.firstError('reset') }}</div>
                          </div> 
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="red" outlined @click="mobile_reset = false">Cancel</v-btn>
                          <v-btn color="primary" outlined @click="reset_password('mobile')">Save</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </v-card-text>

                <v-card-text v-else-if="message.topic == '生日'">
                  <v-dialog v-model="modal" width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="date" label="Birthday" :prepend-icon="year" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable :year-icon="year" :prev-icon="preyear" :next-icon="nextyear">
                    </v-date-picker>
                  </v-dialog>
                  <v-divider></v-divider>
                  <div class="d-flex justify-center mt-5">
                    <v-btn outlined color="primary" @click="setdate(user.date)">儲存</v-btn>
                  </div>
                </v-card-text>

                <v-card-text v-else-if="message.topic == '性別'">
                  <div class="d-flex justify-center">
                    <v-radio-group v-model="gender">
                      <v-radio label="Male" value="Male" color="indigo" :off-icon="unchecked" :on-icon="checked"></v-radio>
                      <v-radio label="Female" value="Female" color="error" :off-icon="unchecked" :on-icon="checked"></v-radio>
                    </v-radio-group>                    
                  </div>
                  <v-divider></v-divider>
                  <div class="d-flex justify-center mt-5">
                    <v-btn outlined color="primary" @click="setgender(user.gender)">儲存</v-btn>
                  </div>
                </v-card-text>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Validator } from 'simple-vue-validator'
import * as icon from '@mdi/js'
import Swal from 'sweetalert2'

  export default {
    name: 'information',
    layout: 'user',
    data() {
      return {
        clear: icon.mdiWindowClose,
        lock: icon.mdiLock,
        visibility: icon.mdiEye,
        visibility_off: icon.mdiEyeOff,
        show: false,
        modal: false,
        year: icon.mdiCalendarRange,
        preyear: icon.mdiSkipPrevious,
        nextyear: icon.mdiSkipNext,
        unchecked: icon.mdiCheckboxBlankCircleOutline,
        checked: icon.mdiCheckboxBlankCircle,
        reset:'',
        mobile_reset: false,
      }
    },
    validators:{
      first(value){
        return Validator.value(value).required()
      },
      last(value){
        return Validator.value(value).required()
      },
      reset(value){
        return Validator.value(value).required().minLength(6)
      }
    },
    computed: {
      ...mapGetters('admin', ['user']),
      messages(){
        return [
          {
            avatar: this.user.avatar ? this.user.avatar : 'empty',
            name: `${this.user.first} ${this.user.last}`,
            icon: icon.mdiAccountCircle,
          },
          {
            color: 'red',
            icon: icon.mdiLockOpenAlertOutline,
            topic: '密碼設定'
          },
          {
            color: 'teal',
            icon: icon.mdiCalendarMonthOutline,
            topic: '生日'
          },
          {
            color: 'brown darken-1',
            icon: icon.mdiHumanMaleFemale,
            topic: '性別'
          }
        ]
      },
      first: {
        get(){
          return this.user.first
        },
        set(value){
          if(!value) return this.SET_FIRST('')
          else return this.SET_FIRST(value)
        }
      },
      last: {
        get(){
          return this.user.last
        },
        set(value){
          if(!value) return this.SET_LAST('')
          else return this.SET_LAST(value)
        }
      },
      gender: {
        get(){
          return this.user.gender
        },
        set(value){
          return this.SET_GENDER(value)
        }
      },
      date: {
        get(){
          return this.user.date
        },
        set(value){
          return this.SET_DATE(value)
        }
      }
    },
    methods: {
      ...mapMutations('admin', ['SET_FIRST', 'SET_LAST', 'SET_GENDER', 'SET_DATE']),
      ...mapActions('admin', ['setname', 'resetpassword', 'setgender', 'setdate']),
      async reset_password(mode){
        let validate = await this.$validate()
        if(validate){
          if(mode == 'mobile'){
            this.resetpassword(this.reset)
            return this.mobile_reset = false
          }
          return this.resetpassword(this.reset)
        } else {
          return Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Look like you miss something!',
            timer: 3000,
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>