<template>
    <label
        :id="id"
        class="l-label"
        :for="$props.for"
        :class="[variant ? 'label-' + variant : '']"
        v-on="events"
    >
        <span :class="$props.class"> <slot /></span>
    </label>
</template>

<script>
import uiProps from './common/uiProps';
import transfer   from './common/transferData';

export default {
    props:{ ...uiProps , for:{ type: String }},
    setup(props, {emit}) {
        const events = { click: 'click' }
        transfer.setupEvents(events, emit);

        return {events}
    }
    
}
</script>

<style>
.l-label{
  -webkit-box-flex: 0;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  margin-bottom: 6px;
  text-transform: capitalize;
}
</style>