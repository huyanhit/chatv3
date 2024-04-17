<script setup>
    import {mapState} from "vuex";
</script>
<template>
    <span class="message-icon" :set="user = getUser(user_id)">
        <span class="to">TO</span>
        <span class="auth mr-2" v-if="(user !== undefined)">
            <img class="img-to" :src="user.icon_img"/>
        </span>
    </span>
</template>

<script>
export default {
    name: 'MessageToIcon',
    props: ['user_id'],
    computed: {
        ...mapState(["CURRENT_USER", "USER"]),
    },
    methods: {
        getUser(user_id) {
            return this.USER[user_id];
        },
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
</style>
