<template>
    <div
        class="input-search"
        :class="[variant ? 'input-search-' + variant : '']"
    >
        <input
            ref="refInput"
            type="text"
            :value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :class="$props.class"
            @keyup.stop="checkEmpty"
            @keyup.enter="$emit('search', $event)"
            @input="$emit('update:modelValue', $event.target.value)"
            v-on="fieldevents"
        >
        <span
            v-if="showCounter && !data.empty"
            class="input-search-counter"
            v-on="counterEvents"
        > {{ counter }}
        </span>
        <span
            v-if="icon"
            class="input-search-button"
        >
            <l-icon
                v-if="!data.empty"
                class="textfield-icon"
                :icon="iconHas"
                @click="reset"
                v-on="iconEvents"
            />
            <l-icon
                v-else
                class="textfield-icon"
                :icon="icon"
                v-on="iconEvents"
            />
        </span> 
        <l-error v-if="errors" :errors="errors" />
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import inputProps from './common/InputProps';
import transfer   from './common/transferData';

export default{
    props:{ ...inputProps , ... { 
        icon:{
            type: String,
            default: 'search'
        },
        iconHas:{
            type: String,
            default: 'close'
        },
        counter:{
            type: String,
            default: '0'
        },
        showCounter:{
            type: Boolean,
            default: false
        }
    }
    },
    setup(props , { emit }) {
        const errors   = ref('');
        const refInput = ref('');
        const data     = reactive({
            empty: ( refInput.value.value === '')
        })

        const fieldevents = {}
        const counterEvents = {}
        const iconEvents = {click: 'iconClick'}

        const focus      = function(){
            refInput.value.focus();
        }
        const reset      = function(){
            data.empty     = true;
            emit('update:modelValue', '')
        }
        const checkEmpty = function(){
            data.empty = ( refInput.value.value === '');
        }
        transfer.setupInject('form');
        transfer.setupEvents(fieldevents,  emit);
        transfer.setupEvents(counterEvents,  emit);
        transfer.setupEvents(iconEvents, emit);

        return { errors, refInput, fieldevents, counterEvents, iconEvents, data, focus, reset, checkEmpty}
    }
}


</script>

<style>
  .input-search{
    position: relative;
    display: inline-block;
  }
  .input-search input[type='text']{
    height: 40px;
    border: 1px #ccc solid;
    padding-left: 10px;
    padding-right: 50px;
  }
  .input-search .l-icon{
    position: absolute;
    right: 10px;
    top: calc(50% - 10px);
    cursor: pointer;
  }

  .input-search  .input-search-counter{
    position: absolute;
    right: 27px;
    top: calc(50% - 8px);
    border: 1px #ccc solid;
    border-radius: 10px;
    padding: 0 2px;
    font-size: 11px;
  }
  .input-search .input-search-button:hover{
    background: unset;
  }
  .input-search .l-button{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: none;
    background-color: transparent;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: auto;
  }
  .input-search .l-button label{
    display: none;
  }
  .input-search-allcontact input[type='text']{
    background-color: rgba(0, 0, 0, 0.05);
  }
</style>