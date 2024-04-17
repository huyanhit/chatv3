<template>
    <component :is="Main"></component>
</template>

<script setup>
    import Main       from '@/views/content/home/Main.vue';
    import EventConst from '@/constants/EventContants';
    import Helper     from '@/common/Helper';
    import { onMounted } from 'vue';

    const event = Helper.useEvent();

    onMounted(() =>{
        event.emit(EventConst.EV_MOUNT_COMPONENT, {name: 'Page Contact', time:Date.now()});
    })
</script>