<template>
    <div
        class="form-group"
        :class="[variant ? 'textarea-' + variant : '']"
    >
        <l-label v-if="label">
            {{ label }}
        </l-label>
        <textarea
            :id="id"
            ref="refInput"
            class="form-control l-textarea"
            :class="$props.class"
            :disabled="$props.disabled"
            :type="$props.type"
            :value="modelValue"
            :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)"
            v-on="events"
        />
        <l-error v-if="errors" :errors="errors" />
    </div>
</template>

<script>
import {ref} from 'vue'
import inputProps from './common/InputProps';
import transfer from './common/transferData';

export default {
    props: {
        ...inputProps,
    
    },
    setup(props, {emit}) {
        const errors = ref('');
        const refInput = ref('')
        const events = {click: 'click', change: 'change', keypress: 'keypress'}

        const focus = function () {
            refInput.value.focus();
        }
        const reset = function () {
            emit('update:modelValue', '')
        }

        transfer.setupInject('form');
        transfer.setupEvents(events, emit);

        return {errors, events, refInput, focus, reset}
    }
}

</script>

<style>
/*screen_task/task_2/*/
.textarea-task .l-textarea {
    border: 1px solid #2B7A0B;
    border-radius: 6px;
    margin: 15px 0 0px;
    padding: 10px 12px;
    min-height: 140px;
    font-size: 12px;
}

.l-textarea:disabled {
    opacity: 0.5;
    cursor: no-drop;
}
</style>
