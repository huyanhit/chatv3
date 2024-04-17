<script setup>
    import {mapState}  from "vuex";
    import ApiConst    from '@/constants/ApiContants';
    import EventConst  from '@/constants/EventContants';
    import MessageItem from "./MessageItem.vue";
</script>

<template>
    <ul id="chat-time-line"  v-on:scroll="eventScrollMessage" 
        v-on:mouseenter="hoverTimeLine = true"  
        v-on:mouseleave="hoverTimeLine = false">
        <template v-for="(item, index) in this.$store.getters.messages" :key="index">
            <li class="message-item" :set="lastId = getPrevMessageId(index)" v-if="(item.id - 1) > lastId">
                <span class="more"  
                    v-on:click="loadMessageMiss(item.id, lastId)" 
                    >Show more +{{(item.id - 1) - lastId}} messages
                </span> 
            </li>
            <li class="message-item" v-if="this.$store.getters.currentMember" :id="('message-item-' + item.id)" 
                :class="{unread: (this.$store.getters.currentMember.position <= item.id) }">
                <MessageItem :item="item"></MessageItem>
            </li>
        </template>
    </ul>
</template>

<script>
const LOAD_MORE_MESSAGE_UP   = '1';
const LOAD_MORE_MESSAGE_DOWN = '2';
const LOAD_MORE_MESSAGE_MISS = '3';
const TIME_WATING_LOAD_API   = 1000;

export default {
    name: 'MessageTimeLine',
    components: { MessageItem },
    data(){
        return{
            lastId: 0,
            scrollBotton: false,
            hoverTimeLine: false,
            load_more_message: false,
        }
    },
    computed: {
        ...mapState(["CURRENT_USER", "CURRENT_ROOM", "ROOM_MESSAGE", "MESSAGE", "MEMBER", "ROOM"]),
    },
    created(){
        this.event.on(EventConst.EV_SCROLL_NOT_READ, (behavior) =>{
            behavior = behavior ?? 'smooth'; 
            if(this.scrollBotton){
                this.$nextTick(() => {
                    let box = document.getElementById('chat-time-line');
                    box.scrollTo({top:box.scrollHeight, behavior:behavior})
                })
            }
        }),

        this.event.on(EventConst.EV_GO_TO_BOTTOM, (behavior) =>{
            behavior = behavior ?? 'smooth'; 
            this.$nextTick(() => {
                let box = document.getElementById('chat-time-line');
                box.scrollTo({top:box.scrollHeight, behavior:behavior})
            })
        })
        this.event.on(EventConst.EV_GO_TO_POSITION, (behavior) => {
            behavior = behavior ?? 'smooth'; 
            if(this.$store.getters.currentMember === undefined){
                setTimeout(() => this.event.emit(EventConst.EV_GO_TO_POSITION, behavior), TIME_WATING_LOAD_API);
            }else{
                if(this.$store.getters.currentMember.position > this.ROOM[this.CURRENT_ROOM.id].total){
                    this.event.emit(EventConst.EV_GO_TO_BOTTOM, behavior);
                }else{
                    this.scrollToId(this.$store.getters.currentMember.position - 1, behavior);
                }
            }
        })
        this.event.on(EventConst.EV_GO_TO_MESSAGE_ID, data => {
            this.scrollToId(data.messageId, data.behavior);
        })
    },
    mounted() {
        this.event.emit(EventConst.EV_MOUNT_COMPONENT, {name: this.$options.name, time:Date.now()});
        this.event.on(EventConst.EV_CALL_API_SUCCESS, data => {
            if (data.param.url === ApiConst.GET_MESSAGES){
                if(data.param.option) {
                    this.load_more_message = false;
                    this.scrollToId(data.param.option.message_id, 'auto', data.param.option.type);
                }else{
                    this.event.emit(EventConst.EV_GO_TO_POSITION, 'smooth');
                }
            }
        });
    },
    destroyed() {
        this.event.off(EventConst.EV_CALL_API_SUCCESS);
        this.event.off(EventConst.EV_GO_TO_MESSAGE_ID);
        this.event.off(EventConst.EV_GO_TO_BOTTOM);
    },
    methods: {
        getPrevMessageId(index){
            if(index > 0 && this.$store.getters.messages[index - 1] !== undefined){
                return this.$store.getters.messages[index - 1].message_id;
            }
            return this.$store.getters.messages[index].message_id;
        },
        loadMessageMiss(lastMessageId, messageId){
            this.callApiLoadMore(lastMessageId, messageId, LOAD_MORE_MESSAGE_MISS);
        },
        callApiLoadMore(messageId, position, type){
            this.load_more_message = true;
            this.event.emit(EventConst.EV_CALL_API, {
                method:'get', 
                url:ApiConst.GET_MESSAGES,
                param:{room_id: this.CURRENT_ROOM.id, position:position, type:type},
                option:{message_id: messageId, type:type}
            });
        },
        addMoreMessages(messageId, type){
            let moreIds = [];
            let roomMessages = [];
            if(type === LOAD_MORE_MESSAGE_UP){
                for(let i = 1; i <= 10; i++){
                    let id = parseInt(messageId) - i;
                    if(id > 0){
                        if(this.MESSAGE[this.CURRENT_ROOM.id + "_" + id] === undefined){
                            return this.callApiLoadMore(messageId, id, type);
                        }
                        moreIds.unshift(id.toString());
                    }else{
                        break;
                    }
                }
                roomMessages = [...new Set([...moreIds ,...this.ROOM_MESSAGE[this.CURRENT_ROOM.id]])].slice(0, 30);
            }
            if(type === LOAD_MORE_MESSAGE_DOWN){
                for(let i = 1; i <= 10; i++){
                    let id = parseInt(messageId) + i;
                    if(id <= this.ROOM[this.CURRENT_ROOM.id].total){
                        if(this.MESSAGE[this.CURRENT_ROOM.id + "_" + id] === undefined){
                            return this.callApiLoadMore(messageId, id, type);
                        }
                        moreIds.push(id.toString());
                    }else{
                        break;
                    }
                }
                roomMessages = [...new Set([...this.ROOM_MESSAGE[this.CURRENT_ROOM.id] ,...moreIds])].slice(-30);
            }

            if(roomMessages !== null){
                this.ROOM_MESSAGE[this.CURRENT_ROOM.id] = roomMessages;
                this.scrollToId(messageId, 'auto', type);
            }
        },
        eventScrollMessage(){
            let box = document.getElementById('chat-time-line');
            this.updateScrollBottom(box);
            if(this.hoverTimeLine === true){
                if(box !== null){
                    if (box.scrollTop <= 0 && !this.load_more_message && this.$store.getters.messages !== null) {
                        let firstMessage = this.$store.getters.messages[0];
                        if(firstMessage !== undefined && firstMessage.message_id > 0){
                            this.addMoreMessages(firstMessage.message_id, LOAD_MORE_MESSAGE_UP);
                        }
                    }
                    let top = (box.scrollHeight - box.clientHeight);
                    if (box.scrollTop >= top && !this.load_more_message && this.$store.getters.messages !== null) {
                        let lastMessage = this.$store.getters.messages.slice(-1)[0];
                        if(lastMessage !== undefined && lastMessage.message_id < this.ROOM[this.CURRENT_ROOM.id].total){
                            this.addMoreMessages(lastMessage.message_id, LOAD_MORE_MESSAGE_DOWN); 
                        }
                    }
                }
            }
        },
        scrollToId(id, behavior='auto', type = LOAD_MORE_MESSAGE_UP) {
            if (id !== 0) {
                this.$nextTick(() => {
                    let box       = document.getElementById('chat-time-line');
                    let element   = document.getElementById('message-item-' + id);
                    let boxOffset = box.getBoundingClientRect();
                    if(element !== null){
                        let position = element.getBoundingClientRect().bottom - boxOffset.top + box.scrollTop;
                        if(type === LOAD_MORE_MESSAGE_DOWN){
                            box.scrollTo({top:position - box.offsetHeight, behavior:behavior})
                        }else{
                            box.scrollTo({top:position - element.offsetHeight, behavior:behavior})
                        }
                    }
                });
            }
        },
        updateScrollBottom(box){
            if(box.scrollTop + box.offsetHeight > box.scrollHeight - 100){
                this.scrollBotton = true;
            }else{
                this.scrollBotton = false;
            }
        }
    },
}
</script>
<style scoped>
    #chat-time-line{
        list-style: none;
        background: #fff;
        height: calc(100% - 287px);
        overflow-y: auto;
        padding: 0;
        position: absolute;
        top: 50px;
        padding-bottom: 0;
        margin-bottom: 0;
    }
    #chat-time-line li{
        background: #fff;
        width: 100%;
        padding-left: 15px;
        border-bottom: 1px #ccc solid;
        padding: 0;
        cursor: pointer;
    }
    #chat-time-line li.unread{
        background-color: #eee;
    }
    #chat-time-line .message-item:last-child{
        margin-bottom: 15px;
    }
    .more{
        display: block;
        text-align: center;
        height: 25px;
        background: #eee;
    }
</style>
