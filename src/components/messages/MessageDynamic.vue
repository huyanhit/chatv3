<template>
    <v-runtime-template :template="content" />
</template>
<script>

import VRuntimeTemplate from "vue3-runtime-template";
import MessageToIcon from './dynamic-partials/MessageToIcon.vue';
import MessageEmoji  from './dynamic-partials/MessageEmoji.vue';
import MessageImage  from './dynamic-partials/MessageImage.vue';
import MessageFile   from './dynamic-partials/MessageFile.vue';

export default {
    name: 'Dynamic',
    props: {
        content: {
            required: true,
            type: String
        }
    },
    components: {
        VRuntimeTemplate,
        MessageToIcon,
        MessageEmoji,
        MessageImage,
        MessageFile
    }
};
</script>

<style>
    .content-message .toall{
        font-size: 0;
    }
    .content-message .toall::before{
        content: 'TO ALL';
        background: var(--bs-success);
        font-size: 13px;
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