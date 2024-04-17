<script setup>
    import {mapState} from "vuex";
    import ApiConst   from '@/constants/ApiContants';
    import EventConst from '@/constants/EventContants';
    import MessageRender from "./MessageRender.vue";
</script>
<template>
    <v-hover>
        <template v-slot:default="{ isHovering, props }">
            <div v-bind="props" :set="auth = getUser(item.auth)" class="item">
                <div class="auth" v-if="(auth !== undefined)">
                    <img :src="auth.icon_img" :title="auth.name" class="mr-2"/>
                    <span class="name">{{auth.name}}</span>
                    <span class="company">{{getCompanyName(auth.company)}}</span>
                </div>
                <MessageRender :item="item"></MessageRender>
                <span class="time"> {{ filters.datetime(item.created) }}</span>
                <span class="edit" v-if="(parseInt(item.status) === 2)"><i class="bi bi-pencil"></i></span>
                <div v-if="isHovering" class="tool-message" :id="('tool-message-'+ item.message_id)">
                    <span class="edit-messsage" title="Edit message" v-on:click="editMessage(item)"> <i class="bi bi-pencil"></i> </span>
                    <span class="delete-message" title="Delete message" v-on:click="deleteMessage(item)"> <i class="bi bi-x-lg"></i> </span>
                    <span class="set-unread" title="Set unread" v-on:click="setUnread(item)"> <i class="bi bi-bookmark-dash"></i> </span>
                </div>
            </div>
        </template>
    </v-hover>
</template>

<script>
export default {
    name:'Message Item',
    props: [
        "item"
    ],
    computed: {
        ...mapState(["CURRENT_USER", "USER", "COMPANY", "CURRENT_ROOM"]),
    },
    mounted() {
        this.event.emit(EventConst.EV_MOUNT_COMPONENT, {name: this.$options.name, time:Date.now()});
    },
    methods: {
        getUser(user_id) {
            return this.USER[user_id];
        },
        getCompanyName(company_id) {
            return this.COMPANY[company_id].name;
        },
        editMessage(item) {
            this.event.emit(EventConst.EV_EDIT_MESSAGE, item);
        },
        deleteMessage(item) {
            this.event.emit(EventConst.EV_CALL_API, {
                method:'delete', 
                url: ApiConst.DELETE_MESSAGE, 
                param:{room_id: this.CURRENT_ROOM.id, message_id:item.id}
            });
        },
        setUnread(item) {
            this.event.emit(EventConst.EV_CALL_API, {method:'put', url: ApiConst.SET_UNREAD, param:{room_id: this.CURRENT_ROOM.id, position: item.id}});
        }
    },
    components: { MessageRender }
}
</script>
<style scoped>  
    .message-item .item{
        padding: 10px;
    }
    .tool-message{
        position: absolute;
        border: 1px #ccc solid;
        bottom: -15px;
        right: 119px;
        z-index: 1;
        background: #fff;
    }
    .tool-message > span{
        padding: 0 10px;
        cursor: pointer;
        display: inline-block;
    }

    .tool-message > span:hover{
        background-color: #ccc;
    }
    .time{
        position: absolute;
        top: 10px;
        right: 25px;
        font-size: 12px;
        color: #999;
    }

    .edit{
        position: absolute;
        right: 10px;
        top: 12px;
        font-size: 10px;
        color: red;
    }

    .msg-deleted{
        color: #ccc;
        margin-left: 48px;
    }

    .set-unread{
        color: #666;
    }

    .content-message{
        margin: 0;
        margin-left: 45px;
        white-space: break-spaces;
    }
    .auth > .icon > img{
        height: 35px;
        width: 35px;
        border-radius: 50%;
        margin-right: 10px;
    }
    .auth img{
        height: 40px;
        width: 40px;
        border: 1px #ccc solid;
        border-radius: 50%;
    }
    .auth > .name {
        font-weight: 600;
        margin-right: 10px;
    }
</style>
