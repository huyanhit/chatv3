<script setup>
    import {mapState}   from "vuex";
    import ApiConst   from '@/constants/ApiContants';
    import EventConst   from "@/constants/EventContants";
</script>

<template>
    <div id="contact_center" class="row text-center">
        <div class="col mt-3">
            <v-btn append-icon="mdi-contact" class="bg-success add_contact" v-on:click="addContact"> Add All contact</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name:'Contact Center',
    props: [
        "data"
    ],
    data() {
        return {
            contacts:[
                {user_id:1},
                {user_id:2},
                {user_id:3},
                {user_id:4},
                {user_id:5},
                {user_id:6},
                {user_id:7},
                {user_id:8},
                {user_id:9},
                {user_id:10},
                {user_id:11},
                {user_id:12},
                {user_id:13},
                {user_id:14},
                {user_id:15},
                {user_id:16},
                {user_id:17},
                {user_id:18},
                {user_id:19},
                {user_id:20},
                {user_id:21},
                {user_id:22},
                {user_id:23},
                {user_id:24},
                {user_id:25},
                {user_id:26},
                {user_id:27},
                {user_id:28},
                {user_id:29},
                {user_id:30},
                {user_id:31},
                {user_id:32},
                {user_id:33},
                {user_id:34},
                {user_id:35},
                {user_id:36},
                {user_id:37},
                {user_id:38},
                {user_id:39},
                {user_id:40},
                {user_id:41},
                {user_id:42},
                {user_id:43},
                {user_id:44},
                {user_id:45},
                {user_id:46},
                {user_id:47},
                {user_id:48},
                {user_id:49},
                {user_id:50},
                {user_id:51},
                {user_id:52},
                {user_id:53},
                {user_id:54},
                {user_id:55},
                {user_id:56},
                {user_id:57},
                {user_id:58},
                {user_id:59},
                {user_id:60},
                {user_id:61},
                {user_id:62},
                {user_id:63},
                {user_id:64},
                {user_id:65},
                {user_id:66},
                {user_id:67},
                {user_id:68},
                {user_id:69},
                {user_id:70},
            ],
        };
    },
    computed: {
        ...mapState(["USER"]),
    },
    mounted() {
        this.event.emit(EventConst.EV_MOUNT_COMPONENT, {name: this.$options.name, time:Date.now()});
    },
    destroyed() {
        this.event.off(EventConst.EV_CALL_API_SUCCESS);
        this.event.off(EventConst.EV_CALL_API_ERROR);
    },
    methods: {
        addContact(){
            for(let item of this.contacts){
                if(this.USER[item.user_id] === undefined){
                    this.event.emit(EventConst.EV_CALL_API, {method:'post', url: ApiConst.ADD_USER, param:{user_id: item.user_id}});
                }
            }
        },
    },
}
</script>
<style scoped>
    #chat_center, #contact_center{
        background: #FFFFFF;
        height: 100vh;
    }
    #chat-header {
        height: 50px;
        background-color: #eee;
    }
    #chat-header img{
        height: 45px;
        width: 45px;
        border-radius: 50%;
    }
    .chat-header-name{
        font-size: 18px;
        margin-left: 10px;
    }
    #chat-footer{
        padding-top: 3px;
        border-top: 1px #ccc solid;
        position: absolute;
        bottom: 0;
    }
    #select-contact{
        min-width: 100px;
    }
</style>
