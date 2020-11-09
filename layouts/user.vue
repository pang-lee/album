<template>
  <v-app>
    <v-app-bar app color="white" extended extension-height="30" flat>
      <v-container class="py-0 fill-height">
        <navbar/>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2" class="hidden-sm-and-down">
            <sidenav/>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <nuxt/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    middleware: ['check-auth','admin']
  }
</script>