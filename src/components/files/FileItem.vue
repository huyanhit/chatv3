<script setup>
   import {mapState} from "vuex";
</script>
<template>
    <div>
        <span v-if="file.type === 'file'">
            <i class="bi bi-folder mr-2"></i> <span  class="mr-2">{{ file.name }}.{{ file.ext }}</span><span>{{ filters.datetime(file.created) }}</span>
        </span>
        <span v-if="file.type === 'image'">
            <img :src="URL+'get-file-thumbnail/' + file.file_id +'/' + this.CURRENT_USER.token" class="list-image mr-2"/>
            <span class="mr-2">{{ file.name }}.{{ file.ext }}</span>
            <span>{{ filters.datetime(file.created) }} </span>
        </span>
    </div>
</template>
<script>

const URL = import.meta.env.VITE_APP_API_DOMAIN;
export default {
    name: 'FileItem',
    props: ['file'],
    computed: {
        ...mapState(['CURRENT_USER']),
    }
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
    .list-image{
        height: 40px;
    }
</style>
