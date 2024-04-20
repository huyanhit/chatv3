<template>
    <div
        class="l-search" :class="[variant ? 'input-search-' + variant : '']"
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

        const events = {}
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
            data.empty = (refInput.value.value === '');
        }
        transfer.setupInject('form');
        transfer.setupEvents(events, emit);
        transfer.setupEvents(counterEvents, emit);
        transfer.setupEvents(iconEvents, emit);

        return { errors, refInput, fieldevents, counterEvents, iconEvents, data, focus, reset, checkEmpty}
    }
}


</script>