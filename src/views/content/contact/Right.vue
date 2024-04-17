<script setup>
    import EventConst from '@/constants/EventContants';
</script>
<template></template>

<script>
export default {
    name:'Contact Right',
    mounted() {
        this.event.emit(EventConst.EV_MOUNT_COMPONENT, {name: this.$options.name, time:Date.now()});
    }
}
</script>