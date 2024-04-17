<script setup>
    import AppConst   from '@/constants/AppContants';
    import ApiConst   from '@/constants/ApiContants';
    import EventConst from '@/constants/EventContants';
    import IconConst  from '@/constants/IconConst';
    import _          from 'lodash';
    import Helper     from '@/common/Helper';
    import { onBeforeMount, onMounted } from "vue";

    const event  = Helper.useEvent();
    const socket = Helper.useSocket();
    const store  = Helper.useStore();
    const api    = Helper.useApi();

    onBeforeMount(()=>{
        socket.emit(AppConst.APP_JOIN_CHANNEL, AppConst.APP_JOIN_USER + '29');
        store.dispatch('sync_data', {CURRENT_USER:{id:'29'}});
        store.dispatch('sync_data', {EMOIJ:{'29': IconConst.EMOIJ}});
        store.dispatch('sync_data', {ICON:IconConst.ICON});
        api.storeApi(store, {method:'get', url: ApiConst.GET_USER_SETTING});
    })
    onMounted(()=>{
        event.emit(EventConst.EV_MOUNT_COMPONENT, {name: 'Data Controller', time:Date.now()});
    })
</script>

<script>
export default {
    sockets: {
        connect() {
            console.log('connected');
        },
        disconnect() {
            console.log('dis-connected');
        },
        reconnect() {
            console.log('re-connect');
        },
        user_update_member(data){
            this.event.emit(EventConst.EV_SYNC_DATA, data.sync);
        },
        room_push_message(data){
            this.event.emit(EventConst.EV_PUSH_LIST, data.push);
            this.event.emit(EventConst.EV_SYNC_DATA, data.sync);
            if(data.resp.room_id === this.CURRENT_ROOM.id){
                this.event.emit(EventConst.EV_SCROLL_NOT_READ); 
            }
        },
        room_to_all(data){
            let key = data.resp + '_' + this.CURRENT_USER.id;
            this.event.emit(EventConst.EV_SYNC_DATA, { 'MEMBER': {[key]: { mention: this.MEMBER[key].mention + 1 }}});
        },
        user_add_room(data){
            this.event.emit(EventConst.EV_PUSH_LIST, data.push);
            this.event.emit(EventConst.EV_SYNC_DATA, data.sync);
            this.$socket.emit(AppConst.APP_JOIN_CHANNEL, AppConst.APP.APP_JOIN_ROOM + data.resp);
        }
    }
}
</script>