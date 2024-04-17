<script setup>
    import {mapState} from "vuex";
    import ApiConst   from '@/constants/ApiContants';
    import EventConst from "@/constants/EventContants";
</script>

<template>
    <v-textarea ref="message_input" v-if="!checkSend" :disabled="CURRENT_ROOM.id === undefined" label="Enter your message here (Press Shift + Enter for send)" variant="outlined" class="chat_box" v-model="content" tabindex="1"
        v-on:keydown.enter.shift.exact.prevent="sendMessage"
        v-on:keydown.enter.ctrl.exact.prevent="sendMessage"
    ></v-textarea>
    <v-textarea ref="message_input" v-else :disabled="CURRENT_ROOM.id === undefined" label="Enter your message here (Press Shift + Enter for line break)" variant="outlined" class="chat_box" v-model="content" tabindex="1"
        v-on:keydown.enter.exact.prevent="sendMessage"
    ></v-textarea>
</template>

<script>
export default {
    name:'Message Input',
    props:[
        'checkSend'
    ],
    data() {
        return {
            content: '',
            edit: null,
        }
    },
    computed: {
        ...mapState(["CURRENT_ROOM", "CURRENT_USER", "ROOM_MESSAGE", "ROOM"]),
        currentRoom() {
            return this.ROOM[this.CURRENT_ROOM.id];
        },
        lastMessage() {
            if(this.ROOM_MESSAGE[this.CURRENT_ROOM.id] !== undefined 
                && this.ROOM_MESSAGE[this.CURRENT_ROOM.id].length > 0){
                return this.ROOM_MESSAGE[this.CURRENT_ROOM.id].slice(-1)[0];
            }

            return 0;
        },
    },
    created() {
        this.event.on(EventConst.EV_EDIT_MESSAGE, item =>{
            this.edit = item;
            this.content = item.content;
        });
        this.event.on(EventConst.EV_SEND_MESSAGE, () =>{
            this.sendMessage();
        });
    },
    mounted() {
        this.event.emit(EventConst.EV_MOUNT_COMPONENT, {name: this.$options.name, time:Date.now()});
        this.event.on(EventConst.EV_CALL_API_SUCCESS, data => {
            if (data.param.url === ApiConst.UPDATE_MESSAGE || data.param.url === ApiConst.ADD_MESSAGE) {
                this.$emit('sendMessage', false);
            }
        });
        this.event.on(EventConst.EV_CALL_API_ERROR, data => {
            if (data.param.url === ApiConst.UPDATE_MESSAGE || data.param.url === ApiConst.ADD_MESSAGE) {
                this.$emit('sendMessage', false);
            }
        });
        this.event.on(EventConst.EV_APPEND_CONTENT, data => {
            this.appendContent(data);
        });
    },
    destroyed() {
        this.event.off(EventConst.EV_CALL_API_SUCCESS);
        this.event.off(EventConst.EV_CALL_API_ERROR);
        this.event.off(EventConst.EV_EDIT_MESSAGE);
        this.event.off(EventConst.EV_SEND_MESSAGE);
        this.event.off(EventConst.EV_APPEND_CONTENT);
    },
    methods: {
        sendMessage() {
            if (this.content.trim() !== "" && !this.sending) {
                this.$emit('sendMessage', true);
                if (this.edit !== null) {
                    let data = { room_id: this.CURRENT_ROOM.id, message_id: this.edit.id, content: this.content };
                    this.event.emit(EventConst.EV_CALL_API, { method: "put", url: ApiConst.UPDATE_MESSAGE, param: data });
                } else {
                    let data = { room_id: this.CURRENT_ROOM.id, content: this.content };
                    this.event.emit(EventConst.EV_CALL_API, { method: "post", url: ApiConst.ADD_MESSAGE, param: data });

                    let messageIdAdd = parseInt(this.lastMessage) + 1;
                    let key = this.CURRENT_ROOM.id + '_' + messageIdAdd;
                    this.event.emit(EventConst.EV_PUSH_LIST, {
                        ROOM_MESSAGE:{[this.CURRENT_ROOM.id]:[messageIdAdd.toString()]}
                    })
                    this.event.emit(EventConst.EV_SYNC_DATA, { 
                        MESSAGE:{[key]:{auth:this.CURRENT_USER.id, content: this.content,  status: 1, thread: 0, created:Date.now()/1000 }}
                    });
                    this.event.emit(EventConst.EV_GO_TO_BOTTOM); 
                }

                this.content = null;
                this.edit    = null;
            }
        },
        appendContent(data){ 
            if(this.$refs.message_input !== null){
                let position = this.$refs.message_input.selectionStart;
                if(data.break !== undefined && data.break === true){
                    data.content = data.content + '\n';
                }
                if(this.content !== null && data.content.length > 0){
                    let start    = this.content.substring(0, position);
                    let end      = this.content.substring(position, this.content.length);
                    this.content = start + data.content + end;
                }else{
                    this.content = data.content;
                }
                this.$nextTick(() => {
                    position += data.content.length;
                    this.$refs.message_input.setSelectionRange(position, position);
                    this.$refs.message_input.focus();
                })
            }
        }
    },
}
</script>
<style scoped>
    .chat_box{
        width: 100%;
        padding: 10px;
        padding-top: 0;
    }
</style>
