<template>
    <v-row class="mx-auto">
        <v-col>
            <v-card elevation="10">
                <v-card-subtitle class="font-weight-black font-italic text-center">Privacy</v-card-subtitle>
                <v-divider></v-divider>
                <br/>
                <div class="d-flex flex-column align-center">
                    <v-select v-model="privacy_value" :items="items" :value="items[0]" label="Choose the album privacy" outlined dense></v-select>
                </div>
                <v-divider></v-divider>
                <div class="d-flex justify-center mt-5">
                    <v-btn outlined color="primary" class="mb-5">Save</v-btn>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        layout: 'user',
        data(){
            return {
                privacy_value: [],
                items: ['Share All', 'Share I Selected', 'Do Not Share Any']
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>