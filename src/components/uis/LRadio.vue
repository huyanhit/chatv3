<template>
    <div
        class="form-radio"
        :class="[variant ? 'radio-' + variant : '']"
    >
        <input
            :id="id"
            class="input_radio l-radio"
            type="radio"
            :class="$props.class"
            :disabled="$props.disabled"
            :name="name"
            :value="value"
            :checked="checked"
            @input="$emit('update:modelValue', $event.target.checked)"
            v-on="events"
        >
        <l-label
            :for="id"
            class="label_radio"
        >
            {{ label }}
        </l-label>
        <l-error v-if="errors" :errors="errors" />
    </div>
</template>

<script>
import { ref, inject } from 'vue'
import inputProps from './common/InputProps';
import transfer   from './common/transferData';

export default{
    props:{ ...inputProps , ...{ checked: { type: Boolean , default: false}, name: {type: String }, value: {type: String} } },
    setup(props, {emit}) {
        const errors = ref('');
        const events = {}
       
        transfer.setupEvents(events, emit, );

        return {errors, events}
    }
}

</script>

<style>
.form-radio {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.input_radio {
    cursor: pointer;
    vertical-align: middle;
    -webkit-appearance: none;
    position: relative;
    color: #000;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.3);
    outline: none;
    min-height: auto;
    padding: 0;
}
.input_radio:checked {
    background-color: rgba(43, 122, 11, 0.1);
}
.input_radio:before {
    position: absolute;
    content: '';
    width: 20px;
    height: 20px;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 12;
}
.input_radio:checked:after {
    position: absolute;
    content: '';
    background: #2B7A0B;
    background-size: contain;
    outline: none;
    width: 10px;
    height: 10px;
    border-radius: 5000px;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 12;
}
.form-radio .l-label{
    flex: 1;
    margin: 0;
    padding-left: 6px;
}
.label_radio{
    cursor: pointer;
    flex: 1;
    margin-left: 5px;
    position: relative;
    top: 3px;
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


/*screen_manage_all_files/all__files_5/*/
.form-radio.radio-filetool .input_radio {
    width: 16px;
    height: 16px;
    flex: 0 0 16px;
}

.form-radio.radio-filetool .input_radio:before {
    width: 16px;
    height: 16px;
}

.form-radio.radio-filetool .input_radio:checked {
    border: 1px solid #000;
}

.form-radio.radio-filetool .input_radio:checked:after {
    width: 8px;
    height: 8px;
    background: #000;
}
</style>