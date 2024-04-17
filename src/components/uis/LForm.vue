<template>
    <div
        class="l-form"
        :class="[variant ? 'form-' + variant : '']"
    >
        <form
            :id="id"
            :class="$props.class"
            :disabled="$props.disabled"
            :style="'background:'+ background +';'"
            @input="onInput($event)"
        >
            <slot />
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import layoutProps from './common/layoutProps';
import transfer    from './common/transferData';
import validateLib from './common/validateLib';

export default {
    props:{ ...layoutProps, ...{
        validate_on: String,
    }},

    setup(props, {emit}) {
        const items  = ref([]);
        const events = {}

        const validate = function() {
            let has = false;
            for(let item of items.value){
                let error = validateLib(item.props.modelValue, item.props.rules);
                if(error){
                    has = true;
                    item.proxy.errors = error;
                }
            }
            return has;
        }
        const reset = function() {
            for(let item of items.value){
                item.props.modelValue = '';
            }
        }
        const onInput = function(e){
            if(props.validate_on === 'auto'){
                for(let item of items.value){
                    if(e.target.__vueParentComponent.uid === item.uid){
                        item.proxy.errors = validateLib(item.props.modelValue, item.props.rules);
                    }
                }
            }
        }
        
        transfer.setupProvide('form',items);
        transfer.setupEvents(events, emit);
        
        return {validate, reset, events, onInput}
    },
}
</script>

<style>
    .l-form .form-group{
        margin-bottom: 15px;
    }
    .l-form .form-input {
        position: relative;
        margin-bottom: 15px;
    }
</style>