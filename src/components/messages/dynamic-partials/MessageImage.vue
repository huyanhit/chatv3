<script setup>
    import {mapState} from "vuex";
    import EventConst from '@/constants/EventContants';
</script>
<template>
    <img v-on:click="showImage(img_id)" class="message-image mr-2" :src="URL+'get-file-thumbnail/' + img_id +'/' + this.CURRENT_USER.token"/>
</template>
<script>
const URL = import.meta.env.VITE_APP_API_DOMAIN;
export default {
    name: 'MessageImage',
    props: ['img_id'],
    computed: {
        ...mapState(['CURRENT_USER']),
    },
    methods: {
        showImage(imgId){
            this.event.emit(EventConst.EV_SHOW_IMAGE, imgId)
        }
    },
};
</script>
<style>
    .message-icon .img-to{
        height: 25px;
        width: 25px;
        border-radius: 50%;
        background: #ccc;
        font-size: 0;
        position: relative;
        top: -1px;
    }
    .message-icon .to{
        background: var(--bs-success);
        padding: 0px 5px;
        margin-right: 3px;
        border-radius: 3px;
        font-weight: 600;
        font-family: system-ui;
        color: #fff;
        line-height: 10px;
        padding-bottom: 2px;
    }
    .message-image{
        height: 100px;
        margin-bottom: 5px;
        display: inline-block;
    }
</style>
