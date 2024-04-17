<template>
    <div
        class="form-checkbox"
        :class="[variant ? 'checkbox-' + variant : '']"
    >
        <input
            :id="id"
            class="input_checkbox l-checkbox" 
            type="checkbox"
            :class="$props.class"
            :disabled="$props.disabled"
            :checked="modelValue" 
            @input="$emit('update:modelValue', $event.target.checked)"
            v-on="events"
        >
        <l-label
            :for="id"
            class="label_checkbox"
        >
            {{ label }}
        </l-label>
        <l-error v-if="errors" :errors="errors" />
    </div>
</template>

<script>
import { ref } from 'vue'
import inputProps from './common/InputProps';
import transfer   from './common/transferData';

export default{
    props:{ ...inputProps , ...{ modelValue: { type: Boolean }}  },
    setup(props, {emit}) {
        const errors = ref('');
        const events = {}

        transfer.setupInject('form');
        transfer.setupEvents(events, emit);

        return {events, errors}
    }
}


</script>

<style>
.form-checkbox.checkbox-login .input_checkbox{
    background-color: rgba(0, 0, 0, 0.07);
    border: none;
    width: 20px;
    height: 20px;
}
.form-checkbox {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.input_checkbox:checked:after {
    background: url(../public/img/task/icon_check.png);
}
.form-checkbox .l-label {
    cursor: pointer;
    flex: 1;
    padding-left: 5px;
    margin-bottom: 0;
}
.icon-text-field{
    position: absolute;
    bottom: 15px;
    right: 10px;
}
.error{
    position: absolute;
    bottom: -15px;
}
</style>