<template>
    <div class="event-info" v-show="data.show"><span  class="icon-log"><v-icon icon="mdi-close float-right" size="15" v-on:click="data.show = !data.show"></v-icon></span>
        <v-tabs v-model="data.tab" bg-color="basil">
            <v-tab value="two">COMPORNENT</v-tab>
        </v-tabs>
        <v-window v-model="data.tab">
            <v-window-item value="one">
                <div v-for="(item, index) in data.mounts" :key="index">{{item.name}}:
                    <b :class="{'text-danger': (final === item.name)}">{{item.time - data.now}} ms</b> 
                </div>
            </v-window-item>
        </v-window>
    </div>
</template>

<script setup>
    import EventConst from '@/constants/EventContants';
    import ApiConst   from '@/constants/ApiContants';
    import Helper     from '@/common/Helper';
    import { reactive, onMounted, onUnmounted, watch } from "vue";
    import { onBeforeRouteUpdate } from 'vue-router';

    const event  = Helper.useEvent();
    const route  = Helper.useRoute();
    const store  = Helper.useStore();
    const api    = Helper.useApi();
    
    const data = reactive({
        tab: null,
        mounts: [],
        final: '',
        show: true,
        now: Date.now(),
    })

    const changeRoom = function(currentRouter){
        if(currentRouter.params.roomId){
            const roomId = currentRouter.params.roomId;
            store.dispatch('sync_data', { CURRENT_ROOM: {id: roomId} });
            if(store.getters.getKey('ROOM_MEMBER')[roomId] === undefined){
            api.storeApi(store, { 
                method: "get", 
                url: ApiConst.GET_MEMBERS_OF_ROOM, 
                param: {'room_id': roomId} 
            });
            }
            if(store.getters.getKey('ROOM_MESSAGE')[roomId] === undefined){
                api.storeApi(store, { 
                    method: "get", 
                    url: ApiConst.GET_MESSAGES, 
                    param:{'room_id': roomId}
                });
            }
            if (store.getters.getKey('ROOM_FILE')[roomId] === undefined) {
                api.storeApi(store, { 
                    method: "get", 
                    url: ApiConst.GET_ROOM_FILE,
                    param: {'room_id': roomId}
                });
            }
        }
    };

    onBeforeRouteUpdate((to, from, next) => {
        if(to.name === 'chat' && to.params.roomId){
            event.emit(EventConst.EV_CHANGE_NAVIGATE, name);
            changeRoom(to);
            next();
        }
        
        if(to.name !== from.name){
            event.emit(EventConst.EV_CHANGE_NAVIGATE, name);
            next();
        }
    })  

    onMounted(()=>{
        changeRoom(route.currentRoute.value);
        event.on(EventConst.EV_MOUNT_COMPONENT, mount => {
            data.mounts.push(mount);
        });
    })

    onUnmounted(()=>{
        event.off(EventConst.EV_MOUNT_COMPONENT);
        event.off(EventConst.EV_CALL_API);
    })
   
</script>
<style>
    .event-info{
        position: fixed;
        right: 3px;
        bottom: 3px;
        width: 300px;
        height: 300px;
        z-index: 1;
        padding: 10px;
        overflow-y: auto;
        border: 1px #999 solid;
        border-radius: 5px;
        background: #fff;
    }
    .icon-log{
        height: 15px;
        width: 15px;
        position: absolute;
        z-index: 1;
        right: 5px;
        top: 5px;
    }
</style>