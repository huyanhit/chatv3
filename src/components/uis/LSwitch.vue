<template>
    <label
        class="switch"
        :class="[variant ? 'checkbox-' + variant : '']"
        :for="$props.id"
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
        <div class="slider round" />
        <l-error v-if="errors" :errors="errors" />
    </label>
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
.switch {
  display: inline-block;
  width: 36px;
  height: 20px;
  position: relative; }

.switch input {
  display: none; }

.slider {
  position: absolute;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  -webkit-transition: .1s;
  -o-transition: .1s;
  transition: .1s; }

.slider:before {
  content: "";
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  top: 0;
  margin: auto;
  width: 14px;
  height: 14px;
  left: 3px;
  -webkit-transition: .1s;
  -o-transition: .1s;
  transition: .1s; }

input:checked + .slider {
  background-color: rgba(43, 122, 11, 0.1);
  border: 1px solid #2B7A0B; }
  input:checked + .slider:before {
    background-color: #2B7A0B; }
  input:checked + .slider.style2 {
    background-color: rgba(72, 56, 56, 0.1);
    border: 1px solid #483838; }
    input:checked + .slider.style2:before {
      background-color: #483838; }

input:checked + .slider:before {
  -webkit-transform: translateX(-100%);
  -ms-transform: translateX(-100%);
  transform: translateX(-100%);
  left: calc(100% - 3px); }

.slider.round {
  border-radius: 34px; }

.slider.round:before {
  border-radius: 50%; }

</style>