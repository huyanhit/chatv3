<template>
    <div
        class="form-group"
        :class="[variant ? 'textfield-' + variant : '']"
    >
        <l-label :for="id">
            {{ $props.label }}
        </l-label>
        <input
            :id="$props.id"
            ref="refInput"
            class="form-control l-textfield"
            :disabled="disabled"
            :class="$props.class"
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            v-on="events" 
            @input="$emit('update:modelValue', $event.target.value)"
        >
        <span
            v-if="icon"
            class="icon-text-field"
        >
            <l-icon
                class="textfield-icon"
                :icon="icon"
                v-on="iconEvents"
            />
        </span>
        <l-error v-if="errors" :errors="errors" />
    </div>
</template>

<script>
import { ref } from 'vue'
import inputProps from './common/InputProps';
import transfer   from './common/transferData';

export default{
    props:{ ...inputProps, 
        ...{ 
            type: String, 
            default: 'text'
        }
    },
    setup(props , { emit }) {
        const errors     = ref('');
        const refInput   = ref('');
        const events     = {}
        const iconEvents = {click: 'iconClick'}

        const focus      = function(){
            refInput.value.focus();
        }
        const reset      = function(){
            emit('update:modelValue', '')
        }

        transfer.setupInject('form');
        transfer.setupEvents(events, emit);
        transfer.setupEvents(iconEvents, emit);
        
        return {refInput, errors, events, iconEvents, focus, reset }
    }
}


</script>

<style>
.icon-text-field{
    position: absolute;
    top: 8px;
    right: 10px;
}
.l-textfield{
  background-color: rgba(0, 0, 0, 0.07);
  border: none;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  padding: 14px 14px;
  max-height: 46px;
  min-height: auto;
}

.l-textfield:disabled{
  opacity: 0.5;
  cursor: no-drop;
}

.textfield-default input{
    background: unset;
}

.textfield-secondary input{
    background: rgba(0, 0, 0, 0.07)
}

.textfield-primary input{
    background: green;
    color: white;
}

/*screen_login/*/
.textfield-login input {
    background-color: rgba(0, 0, 0, 0.07);
    border: none;
    padding: 14px 14px;
    max-height: 46px;
    min-height: auto;
}

.textfield-login input::placeholder {
    color: rgba(0, 0, 0, 0.2);
}

</style>