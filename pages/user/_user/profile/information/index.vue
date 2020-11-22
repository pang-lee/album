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
                  <v-col class="hidden-xs-only" cols="4" sm="2" md="1">
                    <v-avatar size="36px">
                      <v-img v-if="message.avatar" alt="Avatar" :src="message.avatar"></v-img>
                      <v-icon v-else :color="message.color" v-text="message.icon"></v-icon>
                    </v-avatar>
                  </v-col>
                  <v-col sm="5" md="3">
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
                </v-card-text>
                <v-card-text v-else-if="message.topic == 'Social'">
                  <h1>Hello the is social</h1>
                </v-card-text>
                <v-card-text v-else-if="message.topic == 'Promos'">
                  <h1>Hello the is Promos</h1>
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
        messages: [
          {
            avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
            name: 'John Leider'
          },
          {
            color: 'red',
            icon: 'mdi-account-multiple',
            topic: 'Social'
          },
          {
            color: 'teal',
            icon: 'mdi-tag',
            topic: 'Promos'
          },
        ],
        first:'Hello',
        last:'Hello',
        clear: icon.mdiWindowClose
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>