<template>
  <v-row class="mx-auto">
    <v-col>
      <v-card elevation="10">
        <v-card-subtitle class="font-weight-black font-italic text-center">Personal Information</v-card-subtitle>
        <v-divider></v-divider>
        <br/>
        <v-card-text>
          <v-expansion-panels popout>
            <v-expansion-panel v-for="(message, index) in messages" :key="index" hide-actions>
              <v-expansion-panel-header>
                <v-row align="center" justify="center" no-gutters>
                  <v-col cols="4" sm="2" md="1">
                    <v-avatar size="36px">
                      <v-img v-if="message.avatar" alt="Avatar" :src="message.avatar"></v-img>
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
                  <v-text-field v-model="first" label="First" outlined clearable :clear-icon="clear"></v-text-field>
                  <v-text-field v-model="last" label="Last" outlined clearable :clear-icon="clear"></v-text-field>
                  <v-divider></v-divider>
                  <div class="d-flex justify-center mt-5">
                    <v-btn outlined color="primary">Save</v-btn>
                  </div>
                </v-card-text>

                <v-card-text v-else-if="message.topic == 'Password'">
                  <div class="hidden-sm-and-down">
                    <div class="text-h6 text-center">Do you want to Reset your Password?</div>
                    <br/>
                    <v-text-field label="Reset Your Password" name="password" outlined :prepend-icon="lock" clearable :clear-icon="clear" v-model="reset" :append-icon="show ? visibility : visibility_off" :type="show ? 'text' : 'password'" @click:append="show = !show" counter/>                   
                    <v-divider></v-divider>
                    <div class="d-flex justify-center mt-5">
                      <v-btn outlined color="primary">Save</v-btn>
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
                        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="green darken-1" text @click="mobile_reset = false">Disagree</v-btn>
                          <v-btn color="green darken-1" text @click="mobile_reset = false">Agree</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </v-card-text>

                <v-card-text v-else-if="message.topic == 'Birthday'">
                  <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="date" label="Birthday" :prepend-icon="year" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable :year-icon="year" :prev-icon="preyear" :next-icon="nextyear">
                      <v-spacer></v-spacer>
                      <br/>
                      <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-card-text>

                <v-card-text v-else-if="message.topic == 'Gender'">
                  <div class="d-flex justify-center">
                    <v-radio-group v-model="gender">
                      <v-radio label="Male" value="Male" color="indigo" :off-icon="unchecked" :on-icon="checked"></v-radio>
                      <v-radio label="Female" value="Female" color="error" :off-icon="unchecked" :on-icon="checked"></v-radio>
                    </v-radio-group>                    
                  </div>
                  <v-divider></v-divider>
                  <div class="d-flex justify-center mt-5">
                    <v-btn outlined color="primary">Save</v-btn>
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
import * as icon from '@mdi/js'

  export default {
    layout: 'user',
    data() {
      return {
        clear: icon.mdiWindowClose,
        lock: icon.mdiLock,
        visibility: icon.mdiEye,
        visibility_off: icon.mdiEyeOff,
        show: false,
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        year: icon.mdiCalendarRange,
        preyear: icon.mdiSkipPrevious,
        nextyear: icon.mdiSkipNext,
        unchecked: icon.mdiCheckboxBlankCircleOutline,
        checked: icon.mdiCheckboxBlankCircle,
        messages: [
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider'
          },
          {
            color: 'red',
            icon: icon.mdiLockOpenAlertOutline,
            topic: 'Password'
          },
          {
            color: 'teal',
            icon: icon.mdiCalendarMonthOutline,
            topic: 'Birthday'
          },
          {
            color: 'brown darken-1',
            icon: icon.mdiHumanMaleFemale,
            topic: 'Gender'
          }
        ],
        first:'Hello',
        last:'Hello',
        reset:'123456',
        mobile_reset: false,
        gender: null
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>