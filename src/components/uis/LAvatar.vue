<template>
    <div
        :id="id"
        class="l-avatar"
        :class="[variant ? 'avatar-' + variant : '']"
        :style="{width: $props.size + 'px', height: $props.size + 'px'}"
        v-on="events"
    >
        <img
            :src="src"
            :alt="alt"
            :class="$props.class"
        >
    </div>
</template>

<script>
import uiProps from './common/uiProps';
import transfer   from './common/transferData';

export default {
    props:{ ...uiProps , ... { 
        src:{ type: String }, 
        alt:{ type: String }, 
        size:{ type: String, default: '60' }, 
    } 
    },
    setup(props, {emit}) {
        const events = {}
        transfer.setupEvents(events, emit);

        return {events}
    }
}
</script>

<style>
.l-avatar{
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.25);
    overflow: hidden; 
}
</style>