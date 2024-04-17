<script setup>
    import Center from  './Center.vue';
    import Left   from  './Left.vue';
    import Right  from  './Right.vue';
    import EventConst from '@/constants/EventContants';
</script>
<template>
  <div class="container-fluid">
      <div class="row">
          <div class="full-heigth col-2">
              <Left  :data="content"></Left>
          </div>
          <div class="full-heigth col-8">
              <Center :data="content"></Center>
          </div>
          <div class="full-heigth col-2">
              <Right  :data="content"></Right>
          </div>
      </div>
  </div>
</template>
<script>
export default {
    name: 'Home Main',
    props:['content'],
    mounted() {
        this.event.emit(EventConst.EV_MOUNT_COMPONENT, {name: this.$options.name, time:Date.now()});
    }
}
</script>
<style scoped>
  .full-heigth{
    height: 100vh;
  }
</style>
