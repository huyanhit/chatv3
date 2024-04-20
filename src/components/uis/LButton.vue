<template>
    <button
        :id="id"
        class="form-control l-button button"
        :type="type"
        :class="[variant ? 'button-' + variant : '' , $props.class]"
        :disabled="$props.disabled"
        v-on="events"
    >
        <l-icon
            v-if="icon"
            class="btn-icon"
            :icon="icon"
            v-on="iconEvents"
        />
        <l-label> {{ label }} </l-label>
        <slot></slot>
    </button>
</template>

<script>
import { ref } from 'vue'
import inputProps from './common/InputProps';
import transfer   from './common/transferData';
import LLabel from './LLabel.vue';

export default{
    components: { LLabel },
    props:{
        ... inputProps, ...{
            type: {
                type: String,
                default: 'button'
            },
        }
    },
    setup(props , { emit }) {
        const errors = ref('');
        const events = {}
        const iconEvents = {click: 'iconClick'}

        transfer.setupInject('form');
        transfer.setupEvents(events, emit);
        transfer.setupEvents(iconEvents, emit);

        return {errors, events, iconEvents}
    }
}

</script>

<style>
</style>
