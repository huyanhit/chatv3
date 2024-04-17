
<template>
  <ul id="navigation" class="group-top">
    <li v-for="(item, key) in $store.getters.navigators" class="text-center nav-home" :key="key" >
        <Navigator :data="item" v-if="item.group === 1"></Navigator>
    </li>
  </ul>
  <ul id="navigation" class="group-bot">
    <li v-for="(item, key) in $store.getters.navigators" class="text-center nav-home" :key="key" >
        <Navigator :data="item" v-if="item.group === 2"></Navigator>
    </li>
  </ul>
</template>

<script setup>
    import Navigator  from "@/components/Navigator.vue";
</script>

<style scoped>
#navigation{
  list-style: none;
  padding: 0;
  width: 100%;
}
#navigation li.active .navigation-item{
    background: #fff;
    color: #000;
    border-color: #fff;
}
.group-bot{
    position: absolute;
    bottom: 0;
}
</style>
