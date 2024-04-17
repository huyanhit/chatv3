<template>
    <i
        :id="$props.id"
        class="l-icon"
        :class="[variant ? 'icon-' + variant : '']"
        v-on="events"
    >
        <component
            :is="icon"
            :class="$props.class"
            :style="[size ? 'width: '+size+'px; height: '+size+'px': '']"
        />
    </i>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import uiProps from './common/uiProps';
import transfer from './common/transferData';

const icons = import.meta.glob('@/assets/svgs/*.vue');

const loadCompornent = function(){
    var components = {};
    for (let path in icons) {
        let fileName = path.match(/.*\/(.*)\.vue$/)[1];
        if (fileName){
            components = Object.assign(components, {[fileName]: defineAsyncComponent(() => import(path)) });
        }
    }
    return components;
}
export default {
    props:{ ...uiProps , icon:{ type: String } , size:{ type: String }},
    components: loadCompornent(),
    setup(props, {emit}) {
        const events = {}
        transfer.setupEvents(events, emit);
        
        return { events }
    }
}
</script>

<style scoped>
/* .l-icon > svg{
    width: 20px; height: 20px;
} */
</style>
