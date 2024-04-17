<template>
  <transition>
    <div ref="toaster" 
      :class="[variant ? 'toaster-' + variant : ' ' ]" 
      v-show="data.isActive">
      <div class="title" v-if="message">
        <span class="icon-header"><l-icon :icon="iconHeader"></l-icon></span>{{ message }}
        <span class="icon-close" @click="close(data.element)"><l-icon icon="close"></l-icon></span>
      </div>
      <ul class="content" v-if="messages">
        <li v-for="(item, index) in messages" :key="index">
          {{ item }} 
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>

import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import LIcon from './LIcon.vue';
export default {
  components: { LIcon },
  props: {
    variant: {
      type: String,
      default: 'default'
    },
    message: {
      type: String,
      required: true
    },
    messages: {
      type: Object,
      required: true
    },
    iconHeader:{
      type: String,
      default: 'guide'
    },
    duration: {
      type: [Number, Boolean],
      default: 5000
    },
    position: {
      type: String,
      default: 'bottom-right'
    },
    class: {
      type: Boolean,
      default: true
    },
    
  },
  setup(props){
    const data = reactive({
      isActive: false,
      parent: null,
      count: 1,
      element: '',
    });
    const toaster = ref(null);

    const createParents = function() {
      data.parent = document.querySelector('.toast-container')
      if (!data.parent) {
        data.parent = document.createElement('div')
        data.parent.className = 'toast-container ' + props.position
      }
    }
    const setupContainer = function(){
      document.body.appendChild(data.parent)
    }
    const showNotice = function() {
      data.isActive = true;
      toaster.value.setAttribute('id', 'toaster-' + (++data.count));
      data.parent.insertAdjacentElement('afterbegin', toaster.value)
      data.element  = 'toaster-' + data.count;
      setTimeout(() => {
        document.getElementById('toaster-' + (data.count)).remove()
      }, props.duration)
    }
    const close = function(element) {
      document.getElementById(element).remove();
    }

    const closeAll = function() {
      data.isActive = false;
      data.parent.remove()
    }

    onBeforeMount(()=>{
      createParents()
      setupContainer()
    })

    onMounted(()=>{
      showNotice();
    })

    return {data, close, toaster, closeAll}
  },
}
</script>

<style>
.toast-container{
  position: absolute;
}
.toast-container ul{
  margin: 0;
}
.toast-container .toaster-error{
  top: 10px;
  left: calc(50% - 200px);
  background: rgb(236, 99, 99);
  width: 400px;
  padding: 10px;
  border-radius: 5px;
  color: #fff;
  margin-bottom: 10px;
}

.toast-container .toaster-success{
  top: 10px;
  left: calc(50% - 200px);
  background: green;
  width: 400px;
  padding: 10px;
  border-radius: 5px;
  color: #fff;
  margin-bottom: 10px;
}

.toast-container.top-center{
  right: unset;
  bottom: 10px;
  top: unset;
  left: calc(50% - 200px);
}

.toast-container.bottom-center{
  right: unset;
  bottom: unset;
  top: 10px;
  left: calc(50% - 200px);
}

.toast-container.middle{
  right: unset;
  bottom: unset;
  left: calc(50% - 200px);
  top: calc(50% - 100px);
}

.toast-container.top-right{
  right: 10px;
  bottom: unset;
  left: unset;
  top: 10px;
}

.toast-container.top-left{
  right: unset;
  bottom: unset;
  left: 10px;
  top: 10px;
}

.toast-container.bottom-right{
  right: 10px;
  bottom: 10px;
  left: unset;
  top: unset;
}

.toast-container.bottom-left{
  right: unset;
  bottom: 10px;
  left: 10px;
  top: unset;
}

.toast-container .title{
  font-weight: 600;
}
.icon-header{
  padding: 0 5px;
  width: 20px;
  position: relative;
  top: -3px
}
.icon-header svg{
  stroke: #fff;
}
.toast-container .content{
  padding-top: 10px;
  border-top: 1px #eee solid;
  margin-top: 7px;
}

.icon-close{
  padding: 0 5px;
  width: 20px;
  position: absolute;
  right: 10px;
}
.icon-close svg{
  position: absolute;
  top: 3px;
}

.icon-close svg path{
  stroke: #fff;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>