<template>
  <EventController/>
  <DataController/>
  <header id="header">
      <Header></Header>
  </header>
  <main id="content">
      <router-view />
  </main>
</template>
<script setup>
    import { onMounted }   from 'vue';
    import DataController  from '@/views/includes/DataController.vue';
    import EventController from '@/views/includes/EventController.vue';
    import Header          from '@/views/includes/Header.vue';
    import EventConst      from '@/constants/EventContants';
    import Helper          from '@/common/Helper';

    const event = Helper.useEvent();
    
    onMounted(() =>{
        event.emit(EventConst.EV_MOUNT_COMPONENT, {name: 'Layout Main', time:Date.now()});
    })
</script>

<style scoped>
  #header{
    width: 80px;
    height: 100vh;
    background: #483838;
    float: left;
    color: #fff;
  }
  #content{
    width: calc(100% - 80px);
    height: 100vh;
    background: #ddd;
    float: right;
  }
</style>
