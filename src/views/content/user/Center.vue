<script setup>
    import EventConst from '@/constants/EventContants';
    import {mapState}       from "vuex";
</script>
<template>
    <div class="container-fluid">
        <div class="row">{{ $t("title") }} </div>
        <div class="row">
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props"> Choose Language </v-btn>
                </template>
                <v-list>
                    <v-list-item  v-for="(item, index) in items" :key="index" :value="index">
                        <v-list-item-title v-on:click="changeLanguage(item)">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
        <div class="row mt-3">
            <ul class="col-12" style="max-height: 600px; overflow-y: scroll;">
                <li v-for="(item, index) in this.RAWS" :key="index">
                    {{index}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'Home Center',
    computed: {
        ...mapState(['RAWS']),
    },
    data: () => ({
        raws: null,
        items: [
            { title: 'Tiếng việt', language: 'vi' },
            { title: 'English', language: 'en'},
            { title: 'Japanesss' , language: 'jp'},
        ],
    }),
    mounted() {
        this.event.emit(EventConst.EV_MOUNT_COMPONENT, {name: this.$options.name, time:Date.now()});
    },
    methods: {
        changeLanguage(item){
            this.event.emit('change-language', (item.language));
        },
        showRaws(){
            this.raws = this.RAWS;
        }
    },
}

</script>