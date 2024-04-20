<template>
    <div
        class="l-form"
        :class="[variant ? 'form-' + variant : '']"
    >
        <form
            :id="id"
            :class="$props.class"
            :style="'background:'+ background +';'"
            @input="onInput"
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

        const validate = function(only = false) {
            let errors = [];
            for(let item of items.value){
                let error = validateLib(item);
                if(error && error !== true){
                    errors.push({ name: item.props.name, error: error })
                    item.proxy.errors = error;
                    if(only) break
                }
            }

            return (errors.length > 0)? {errors: errors}: false;
        }
        const reset = function() {
            for(let item of items.value){
                item.props.modelValue = '';
            }
        }
        const onInput = function(e){
            if(props.validate_on === 'auto'){
                for(let item of items.value){
                    if(e.target === item.refs.refInput){
                        item.proxy.errors = validateLib(item);
                    }
                }
            }
        }
        
        transfer.setupProvide('form', items);
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