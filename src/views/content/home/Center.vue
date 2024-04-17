<script setup>
    import {mapState} from "vuex";
    import EventConst from '@/constants/EventContants';
    import ConvertService   from '@/common/ConvertService';
</script>
<template>
    <div class="container-fluid">
        <div> <LIcon icon="IconCommunity"></LIcon> {{ $t("title") }} </div>
        <div class="row mt-3">
            <LForm ref="formDemo" validate_on="auto">
                <LTextField v-model="textfield" label="Text Field" placeholder="Input Field" variant="dask" :rules="{max:10, min:1}"></LTextField>
                <LTextArea  v-model="textarea"  label="Text Area" placeholder="Input Textara"  variant="dask" :rules="{required:true, min:1}"></LTextArea>
            </LForm>
        </div>
        <div class="mt-3">
            <v-btn color="primary"  @click="submitForm">submit Form</v-btn>
        </div>
        <div class="mt-3">
            <v-btn color="primary"  @click="resetFrom">reset Form</v-btn></div>
        <!-- <div class="mt-3">
            <v-btn color="primary"  @click="showInput">show Input</v-btn></div>
        <div class="mt-3">
            <v-btn color="primary"  @click="convertFormToObjects"> convert Form To Objects </v-btn>
        </div>
        <div class="mt-3">
            <v-btn color="primary"  @click="convertObjectsToRaws"> convert Objects To Raws </v-btn>
        </div>
        <div class="mt-3">
            <v-btn color="primary"  @click="convertRawsToObjects"> convert Raws To Objects </v-btn>
        </div>
        <div class="mt-3">
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
        </div> -->
    </div>
</template>
<script>
export default {
    name:'Home Center',
    computed: {
        ...mapState(['CURRENT_RAWS','ROOM']),
    },
    data: () => ({
        textfield: 'Text field',
        textarea: 'Text area',
        raws: null,
        items: [
            { title: 'Tiếng việt', language: 'vi' },
            { title: 'English', language: 'en'},
            { title: 'Japaness' , language: 'jp'},
        ],
    }),
    mounted() {
        this.event.emit(EventConst.EV_MOUNT_COMPONENT, {name: this.$options.name, time:Date.now()});
    },
    methods: {
        submitForm(){
            this.$refs.formDemo.validate()
        },
        resetFrom(){
            this.$refs.formDemo.reset()
        },
        showInput(){
            console.log(this.textfield);
            console.log(this.textarea);
        },
        changeLanguage(item){
            this.event.emit('change-language', (item.language));
        },
        convertFormToObjects(){
            let room_id = 1;
            
            let data = {room_id: room_id, name:"update room", description:"desc update room", icon:"123_update.jpg"};
            console.log('FORM DATA');
            console.log(data);

            console.log('CONVERT FORM TO OBJECT: ');
            let object = ConvertService.converFormToObjects('ROOM', room_id, data);
            console.log(object);

            this.event.emit(EventConst.EV_SYNC_DATA, object);
        },
        convertObjectsToRaws(){
            let room_id = 1;

            console.log('OBJECT DATA');
            console.log(this.ROOM[room_id]);

            console.log('CONVERT OBJECT TO RAWS: ');
            let raw = ConvertService.convertObjectsToRaws({'ROOM':{[room_id]:this.ROOM[room_id]}});
            console.log(raw);
            
            this.$store.dispatch('update_raw', raw);
        },

        convertRawsToObjects(){
            console.log('RAWS DATA');
            console.log(this.CURRENT_RAWS);

            let objectRaw = ConvertService.convertRawsToObjects(this.CURRENT_RAWS);
            console.log(objectRaw);
        }
    },
}

</script>