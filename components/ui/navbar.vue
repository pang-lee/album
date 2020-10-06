<template>
    <v-row v-if="auth">
        <v-col>
            <v-avatar color="grey darken-1" size="32"></v-avatar>
        </v-col>
        <v-col v-for="link in links" :key="link" >
            <v-btn text>{{ link }}</v-btn>
        </v-col>
    </v-row>
    <v-row v-else justify="center" no-gutters>
        <v-col cols="11">
            <div class="text-center mt-4 pl-12">
                <strong>Welcome To Memory Album</strong>
                <br/>
                <span class="font-italic">Create Your's Album Now!</span>
            </div>
        </v-col>
        <v-col cols="1">
            <v-select :items="items" label="LANG" dense class="mt-4" :append-icon="drop" eager solo></v-select>
        </v-col>
    </v-row>
</template>

<script>
import * as icon from '@mdi/js'
    export default {
        data() {
            return{
                auth: false,
                drop: icon.mdiArrowDownDropCircleOutline,
                links: [
                    'Dashboard',
                    'Messages',
                    'Profile',
                    'Updates',
                    'User'
                ],
                items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>