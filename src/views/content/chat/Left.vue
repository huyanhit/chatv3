<template>
    <div id="chat_left" class="row">
        <div class="header-list_room">
            <v-menu>
                <template v-slot:activator="{ props }">
                    <span class="select-group" v-bind="props" >
                       ALL
                    </span>
                </template>
                <v-list >
                    <v-list-item v-for="(item, index) in data.group_items" :key="index" :value="index" class="mr-3 ml-3">
                        <v-list-item-title >{{ item.name }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <span class="add-room" v-on:click="addRoom"> + </span>
            <template>
                <div justify="center" class="text-center">
                    <v-dialog
                        v-model="dialog"
                        max-width="50%"
                        min-height="80%"
                    >
                    <template v-slot:activator="{ props }">
                        <v-btn color="primary"  v-bind="props"> Open Dialog </v-btn>
                    </template>
                    <v-card>
                        <v-card-title><h4 class="text-center mt-3 title"> ADD ROOM </h4></v-card-title>
                        <div class="form-add-room" >
                            <div class="form-group">
                                <label>Name </label>
                                <input v-model="data.form.name" type="text" class="form-control" placeholder="Enter name">
                            </div>
                            <div class="form-group">
                                <label>Description </label>
                                <input v-model="data.form.description" type="text" class="form-control" placeholder="Enter description">
                            </div>
                            <div class="form-group  mt-3">
                                <label>Add member </label>
                                <v-card loading class="popup-scroll">
                                    <template v-slot:title>
                                        <v-checkbox v-model="check_all" label="Check All" color="info" hide-details class="border-box" v-on:change="checkAllMember()"></v-checkbox>
                                    </template>
                                    <template v-slot:text>
                                        <div class="custom-control border-bottom-line" v-for="(item, index) in this.$store.getters.users" :key="index">
                                            <v-checkbox color="gray" v-model="data.form.members" hide-details :value="item.id" 
                                                :label="item.name" 
                                                :id="'member_'+item.id" 
                                                :name="'member_'+item.id"
                                            ></v-checkbox>
                                        </div>
                                    </template>
                                </v-card>
                            </div>
                            <div class="form-group mt-3">
                                <button class="btn btn-primary" v-on:click="saveRoom">Add Room</button>
                            </div>
                        </div>
                    </v-card>
                    </v-dialog>
                </div>
            </template>
        </div>
        <ul id="list_rooms">
            <li v-for="(item, key) in this.$store.getters.rooms" :key="key">
                <router-link :to="'/chat/rid-'+item.id" :set="unread = getUnread(item.id)">
                    <v-avatar :image="item.icon" size="40" color="light"></v-avatar>
                    <span class="title ml-2"> {{item.name}}  </span>
                    <span class="float-right">  
                        <v-chip variant="outlined" v-if="unread.unread > 0" size="x-small" class="ml-1">{{ unread.unread }}</v-chip> 
                        <v-badge v-if="unread.mention > 0" offset-y="-10"  offset-x="3" dot color="red" floating size="20"></v-badge> 
                        <v-icon v-if="item.pin" icon="mdi-pin"></v-icon> 
                    </span>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script setup>
    import ApiConst   from '@/constants/ApiContants';
    import EventConst from '@/constants/EventContants';
    import _ from 'lodash';

    import Helper     from '@/common/Helper';
    import { onBeforeMount, onMounted, reactive } from "vue";

    const event  = Helper.useEvent();
    const store  = Helper.useStore();
    const api    = Helper.useApi();

    const data = reactive({
        dialog: false,
        check_all: false,
        form: { 
            name: "",
            description: "",
            icon: "",
            members: [],
        },
        group: { name: 'All', value: '1' },
        group_items: [
            { name: 'All', value: '1' },
            { name: 'Unread', value: '2' },
            { name: 'Mention', value: '3' },
            { name: 'Direct', value: '4' },
            { name: 'Custom', value: '5' },
        ],
    })

    const checkAllMember = function(){
        let items = [];
        if(data.check_all){
            for (let item of store.getters.users){
                items.push(item.id);
            }
        }
        
        data.form.members = items;
    }
    const saveRoom = function(){
        api.storeApi({
            method:'post', url:
            ApiConst.ADD_ROOM, 
            param:data.form
        });
    }

    const addRoom = function(){
        data.dialog = true
    }

    const editRoom = function(room_id){
        api.store({
            method:'put', 
            url: ApiConst.UPDATE_ROOM, 
            param:{room_id: room_id, name:"New room", description:"Desc", icon:"update.jpg"}
        });
    }

    const deleteRoom = function (room_id){
        api.store({
            method:'delete', 
            url: ApiConst.DELETE_ROOM, 
            param:{room_id:room_id}
        });
}

    const getUnread = function(room_id){
        const currentUser = store.getters.getKey('CURRENT_USER');
        if(currentUser){
            const member = store.getters.getKey('MEMBER');
            const room   = store.getters.getKey('ROOM');
            const curentMember = member ?? member[room_id + '_' + currentUser.id];
            const curentRoom   = room_id ?? room[room_id];

            if(curentMember && curentRoom){
                const unread  = curentRoom.total - (curentMember.position - 1);
                const mention = curentMember.mention;
                
                return {unread: unread, mention: mention}
            }
        }

        return {unread: 0, mention: 0};
    }

    onBeforeMount(()=>{
        api.storeApi(store, {method:'get', url: ApiConst.GET_ALL_ROOM});
        data.dialog = false;
    })

    onMounted(()=>{
        event.emit(EventConst.EV_MOUNT_COMPONENT, {name: 'Left chat', time:Date.now()});
    })
</script>

<style scoped>
    #chat_left, #contact_left{
        background: #EAF2E7;
        height: 100vh;
        display: block;
    }
    .select-group{
        display: inline-block;
        height: 50px;
        background: var(--bs-gray-300);
        width: 85%;
        line-height: 18px;
        padding: 15px;
    }
    #list_rooms{
        background: #EAF2E7;
        height: calc(100% - 50px);
        overflow: auto;
        padding: 0;
    }
    #list_rooms li a{
        background: #eaf2e7;
        width: 100%;
        padding: 10px;
        border-bottom: 1px #ccc solid;
        cursor: pointer;
        display: inline-block;
        color: #666;
        text-decoration: none;
    }

    #list_rooms li.active{
        background-color: gray;
        color: #fff;
    }
    .header-list_room{
        padding: 0;
    }
    .add-room{
        height: 50px;
        border: none;
        background: var(--bs-gray-300);
        outline: none;
        box-shadow: none;
        width: 15%;
        float: right;
        text-align: center;
        font-size: 30px;
        cursor: pointer;
        border-left: 1px #ccc solid;
    }
    .add-room:hover{
        background-color: #ccc;
    }
    .edit-room, .delete-room{
        float: right;
        background-color: var(--bs-black);
        margin: 0 2px;
        width: 30px;
        height: 30px;
        text-align: center;
        color: #fff;
        border-radius: 50%;
        line-height: 30px;
        margin-top: -3px;
    }
    .edit-room:hover, .delete-room:hover{
        background: #fff;
        color: #333;
    }
    .form-add-room{
        padding: 0px 30px;
        margin-bottom: 30px;
    }
    .popup-scroll{
        max-height: 400px;
        overflow-y: scroll;
    }
    .border-bottom-line{
        border-bottom: 1px #ccc solid;
    }
    .border-box{
        border: 1px #ddd solid;
        border-radius: 4px;
        display: inline-block;
        padding-right: 30px;
    }
    .select-group .v-field__input{
       min-height: 50px;
    }
</style>
