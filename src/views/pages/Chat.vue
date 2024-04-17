
<template>
    <component :is="Main"></component>
</template>

<script setup>
    import { onMounted } from 'vue';
    import Main       from '@/views/content/chat/Main.vue';
    import EventConst from '@/constants/EventContants';
    import Helper     from '@/common/Helper';

    const event = Helper.useEvent();
    
    onMounted(() =>{
        event.emit(EventConst.EV_MOUNT_COMPONENT, {name: 'Page Chat', time:Date.now()});
    })
</script>
