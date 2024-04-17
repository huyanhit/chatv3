
<template>
  <div class="container-fluid">
        <div class="row">
            <div class="full-heigth col-2">
                <Left />
            </div>
            <div class="full-heigth col-8">
                <Center />
            </div>
            <div class="full-heigth col-2">
                <Right />
            </div>
        </div>
  </div>
</template>

<script setup>
    import Center     from  './Center.vue';
    import Left       from  './Left.vue';
    import Right      from  './Right.vue';
    import ApiConst   from '@/constants/ApiContants';
    import EventConst from '@/constants/EventContants';
    import Helper     from '@/common/Helper';
    import { onBeforeMount, onMounted } from "vue";

    const event  = Helper.useEvent();
    const store  = Helper.useStore();
    const api    = Helper.useApi();

    onBeforeMount(()=>{
        api.storeApi(store, {method:'get', url: ApiConst.GET_ALL_USER});
    })
    onMounted(()=>{
        event.emit(EventConst.EV_MOUNT_COMPONENT, {name: 'Main Chat', time:Date.now()});
    })
</script>
<style scoped>
    .full-heigth{
        height: 100vh;
    }
</style>
