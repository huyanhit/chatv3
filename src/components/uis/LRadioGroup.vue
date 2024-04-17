<template>
    <div
        :id="id"
        class="form-group form-radio-group"
        :class="[variant ? 'radio-' + variant :$props.class]"
        @input="$emit('update:modelValue', $event.target.value)"
    >
        <l-label :for="id">
            {{ $props.label }}
        </l-label>
        <slot />
        <l-error v-if="errors" :errors="errors" />
    </div>
</template>

<script>
import { ref } from 'vue';
import inputProps from './common/InputProps';
import transfer   from './common/transferData';

export default{
    props:{ ...inputProps },
    setup(props, {emit}) {
        const errors = ref('');
        const events = {};
        
        transfer.setupInject('form');
        transfer.setupEvents(events, emit);
        
        return {errors, events}
    }
}

</script>

<style>
.form-radio-group  .form-radio {
  display: inline-block;
}

.form-radio-group  .form-radio input{
    border-radius: 50%;
    padding: unset;
    min-height: unset;
}
</style>