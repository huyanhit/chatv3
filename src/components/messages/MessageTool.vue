<script setup>
    import {mapState} from "vuex";
    import ApiConst   from '@/constants/ApiContants';
    import EventConst from "@/constants/EventContants";
</script>

<template>
    <ul id="chat_tool" >
        <li>
            <v-menu location="top" 
                max-height= "300"
                min-height= "100"
                offset="10">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="outlined" :disabled="(CURRENT_ROOM.id === undefined)">
                        <v-icon icon="mdi-emoticon" mid></v-icon>
                    </v-btn>
                </template>
                <v-item-group multiple class="menu-emoij" min-width="250">
                    <v-item v-for="(item, index) in emoij" :key="index" :value="index">
                        <img :src="item.src" :title="item.name" class="mr-1" v-on:click="selectEmoij(item)"/>
                    </v-item>
                </v-item-group>
            </v-menu>
        </li>
        <li>
            <v-menu location="top" 
                max-height= "300"
                offset="10" 
                :close-on-content-click="closeMenuTo">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="outlined" :disabled="(CURRENT_ROOM.id === undefined)">
                        <v-icon icon="mdi-exit-to-app" mid></v-icon>
                    </v-btn >
                </template>
                <v-list class="menu-tos" min-width="300" min-height= "300">
                    <v-list-item v-click-outside="closeMenuTo = true" v-on:click="closeMenuTo = false">
                        <v-text-field 
                            variant="outlined"
                            hide-details
                            v-model="filterTo"
                            single-line
                            placeholder="Filter member"
                            density="compact"
                        ></v-text-field>
                    </v-list-item>
                    <v-list-item v-on:click="selectTo(null)">
                        <b>TO ALL</b> ({{this.$store.getters.members.length}}members)
                    </v-list-item>
                    <v-list-item v-for="(item, index) in filterListTo" :key="index" :value="index" v-on:click="selectTo(item)">
                        <img :src="item.icon_img" :title="item.name" class="mr-1"/> {{ item.name }}
                    </v-list-item>
                </v-list>
            </v-menu>
        </li>
        <li>
            <v-menu location="top" 
                offset="10"
                v-model="active_upload"
                :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="outlined" :disabled="(CURRENT_ROOM.id === undefined)">
                        <v-icon icon="mdi-attachment-plus" mid></v-icon>
                    </v-btn>
                </template>
                <v-card loading class="mx-auto menu-attact">
                    <v-card-item>
                        <div class="text-overline mb-1"> Upload file </div>
                        <v-img v-for="(item, index) in scr_preview" ref="preview_image_upload" max-width="400" :src="item"  class="mb-3" :key="index"></v-img>
                        <v-row>
                            <v-col sm="8">
                                <v-file-input density="compact" v-model="files" placeholder="Choose file" variant="solo" 
                                    v-on:change="displayImage($event)" multiple full-width >
                                </v-file-input>
                            </v-col>
                            <v-col sm="4">
                                <v-btn v-if="watting_upload" variant="outlined" class="mt-1 float-right"> 
                                    <v-progress-circular indeterminate color="primary" :size="20" :width="3"></v-progress-circular>
                                </v-btn>
                                <v-btn v-else variant="outlined" class="mt-1 float-right" v-on:click="uploadFiles"> Upload </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-item>
                </v-card>
            </v-menu>
        </li>
        <li><v-btn variant="outlined" :disabled="true">
            <v-icon icon="mdi-information-outline" mid></v-icon>
            </v-btn></li>
        <li><v-btn variant="outlined" :disabled="true">
            <v-icon icon="mdi-format-title" mid></v-icon>
            </v-btn></li>
        <li><v-btn variant="outlined" :disabled="true">
             <v-icon icon="mdi-xml" mid></v-icon>
            </v-btn></li>
        <li><v-btn variant="outlined" :disabled="true">
            <v-icon icon="mdi-format-bold" mid></v-icon>
            </v-btn></li>
        <li><v-btn variant="outlined" :disabled="true">
            <v-icon icon="mdi-server-plus" mid></v-icon>
            </v-btn></li>
        <li class="group-send">
            <v-progress-circular indeterminate v-if="sending" :size="30" class="load-send"></v-progress-circular>
            <span class="option-send">
                <input tabindex="3" id="check-option-send" class="custom-control-input" value="true" type="checkbox" v-model="checkSend" 
                    v-on:change="updateCheckSend"
                    v-on:keydown.enter.exact.prevent="checkSend = !checkSend">
                <label for="check-option-send" class="custom-control-label">Enter To Send</label>
            </span>
            <v-btn append-icon="mdi-send" class="bg-success"  variant="outlined" tabindex="2" 
            v-on:click="sendMessage" :disabled="(sending === true || CURRENT_ROOM.id === undefined)">
                Send
            </v-btn>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'MessageTool',
    props: [ 
        "sending"
    ],
    data(){
        return {
            filterTo: '',
            emoij: null,
            scr_preview: null,
            files: null,
            closeMenuTo: true,
            checkSend: false,
            active_upload: false,
            watting_upload: false
        }
    },
    computed: {
        ...mapState(['CURRENT_USER', 'CURRENT_ROOM','ICON','EMOIJ']),
        filterListTo() {
            return this.$store.getters.members.filter(user => {
                if(user.name !== undefined){
                    return (user.name.toLowerCase().includes(this.filterTo.toLowerCase()) &&
                        user.user_id !== this.CURRENT_USER.id);
                }
            });
        }
    },
    created(){
        this.event.on(EventConst.EV_CALL_API_SUCCESS, data => {
            if (data.param.url === ApiConst.UPLOAD_FILES){
                let content = '';
                let res = data.response.data.resp;
                for (let index in res) {
                    if(res[index].type === 'image'){
                        content += '[img:'+ index +'] '
                    }else{
                        content += '[file:'+ index +'] '
                    }
                }
                this.files          = null;
                this.scr_preview    = null;
                this.watting_upload = false;
                this.active_upload  = false;
                this.event.emit(EventConst.EV_APPEND_CONTENT, {content:content, break:true});
            }
        });
        this.event.on(EventConst.EV_CALL_API_ERROR, data => {
            if (data.param.url === ApiConst.UPLOAD_FILES){
                this.watting_upload = false;
            }
        });
    },
    mounted() {
        this.event.emit(EventConst.EV_MOUNT_COMPONENT, {name: this.$options.name, time:Date.now()});
        this.getImoij();
    },
    destroyed() {
        this.event.off(EventConst.EV_CALL_API_SUCCESS);
        this.event.off(EventConst.EV_CALL_API_ERROR);
    },
    methods: {
        getImoij(){
            if(this.emoij === null){
                if(this.EMOIJ[this.CURRENT_USER.id] === undefined) return null;
                let data = this.EMOIJ[this.CURRENT_USER.id].map(icon_id => {
                    if(this.ICON[icon_id] !== undefined){
                        return Object.assign(this.ICON[icon_id], {icon_id: icon_id});
                    }
                });
                this.emoij = data.filter(icon => icon !== undefined);
            }
        },
        sendMessage() {
            this.event.emit(EventConst.EV_SEND_MESSAGE);
        },
        updateCheckSend(){
            this.$emit('updateCheckSend', this.checkSend)
        },
        selectEmoij(item){
            this.event.emit(EventConst.EV_APPEND_CONTENT, {content:item.code})
        },
        selectTo(item){
            this.closeMenuTo = true;
            if(item === null){
                this.event.emit(EventConst.EV_APPEND_CONTENT, {content:'[toall]', break:true})
            }else{
                this.event.emit(EventConst.EV_APPEND_CONTENT, {content:'[to:' + item.id + ']' + item.name, break:true})
            }
        },
        displayImage(e){
            this.scr_preview = [];
            for(let item of e.target.files){
                this.scr_preview.push(URL.createObjectURL(item));
            }
        },
        uploadFiles(){
            if(this.files !== null){
                let formData = new FormData();
                for (let index = 0; index < this.files.length; index++) {
                    if(this.files[index].name !== undefined){
                        formData.append('file[]',  this.files[index]);
                    }
                }
                formData.append('room_id', this.CURRENT_ROOM.id);
                this.event.emit(EventConst.EV_CALL_API, { method: "upload", url: ApiConst.UPLOAD_FILES, param: formData });
                this.watting_upload = true;
            }
        }
    },
}
</script>
<style scoped>
    #chat_tool{
        margin: 0 7px;
        padding: 0;
        height: 30px;
    }
    #chat_tool li{
        display: inline-block;
        padding: 3px;
        margin:  3px 0;
    }
    #chat_tool .group-send {
        border: none;
        float: right;
        padding: 3px;
    }
    #chat_tool .group-send button{
        margin-left: 10px;
        position: relative;
        top: -2px;
    }
    #chat_tool .group-send label{
        display: inline-block;
        position: relative;
        font-size: 12px;
        top: -2px;
        margin-left: 4px;
    }
    #chat_tool .option-send {
        position: relative;
        top: 1px;
        margin-left: 10px;
    }
    .load-send{
        position: relative;
        top: -2px;
    }
    .menu-emoij{
        max-width: 290px;
        background-color: #fff;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 1px 3px 8px 2px var(--vt-c-divider-dark-1);
    }
    .menu-emoij img{
        width: 34px;
        padding: 2px;
        border: 1px #fff solid;
        border-radius: 5px;
    }

    .menu-emoij img:hover{
       border: 1px #666 solid;
    }
    .menu-tos img{
        width: 33px;
        height: 33px;
        border-radius: 50%;
        font-size: 0;
        background-color: #ccc;
    }
    .menu-tos .v-list-item{
        padding-inline-start: 10px !important;
        padding-inline-end: 10px !important;
    }
    .menu-attact{
        max-height: 400px;
        min-width: 400px;
        background-color: #fff;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 1px 3px 8px 2px var(--vt-c-divider-dark-1);
        overflow: auto;
    }
    .loading-upload{
        position:absolute;
    }
</style>
