<template>
    <div
        :id="id"
        class="l-dropdown"
        :class="[variant ? 'dropdown-' + variant : '']"
        :disabled="$props.disabled"
    >
        <l-button
            icon="arrow-down"
            class="button-dropdown"
            :class="$props.class"
            :label="items[data.select]?items[data.select].value:''"
            v-on="events"
            @click.stop="toggle"
        />
        <div
            class="dropdown-content"
            :class="{show:data.show}"
        >
            <span
                v-for="(item, idx) in items"
                :key="idx"
                class="dropdown-option"
                @click.stop="select(idx)"
                v-on="eventOption"
            >{{ item.value }}</span>
        </div>
        <div
            v-if="data.show"
            class="dropdown-layout"
            @click="hide"
        />
    </div>
    <LError v-if="errors" :errors="errors" />
</template>

<script>
import { ref , reactive} from 'vue'
import inputProps from './common/InputProps';
import transfer   from './common/transferData';

export default{
    props:{...inputProps, 
        ...{ 
            items: Object, 
            default: ['Dropdown']
        }
    },
    setup(props , { emit }) {
        const errors      = ref('');
        const inputField  = ref('');
        const events      = {}
        const eventOption = {click:'select'}
       
        const data        = reactive({
            show: false,
            select: props.modelValue?? Object.keys(props.items)[0],
        })
        const select       = function(index){
            data.select    = index;
            data.show      = false;
            emit('update:modelValue', props.items[index].value)
        }
        const show       = function(){
            data.show = true;
        }
        const hide       = function(){
            data.show = false;
        }
        const toggle     = function(){
            data.show = !data.show ;
        }

        transfer.setupInject('form');
        transfer.setupEvents(events, emit);
        transfer.setupEvents(eventOption, emit);

        return {errors, inputField, data, events, eventOption, select, show, hide, toggle }
    }
}


</script>

<style>
    .l-dropdown .button-dropdown {
        position: relative;
        width: 200px;
        flex-direction: row-reverse;
        justify-content: flex-end;
        position: relative;
        background-color: transparent;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        text-align: left;
        font-size: 14px;
        margin-left: 12px;
        padding: 8px 0;
        padding-left: 9px;
        line-height: 1;
    }
    .l-dropdown .button-dropdown label {
        flex: unset;
    }
    .l-dropdown .button-dropdown i {
        margin-left: 3px;
    }
    .l-dropdown .button-dropdown:hover {
        background-color: #fff;
        color: #000;
    }
    .l-dropdown.dropdown-tool .button-dropdown {
        background-color: #fff;
        color: #999;
        font-size: 12px;
        width: 140px;
        padding: 10px 0;
        padding-left: 9px;
    }
    .l-dropdown.dropdown-tool .button-dropdown i {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 7px;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .l-dropdown .dropdown-content{
        position: absolute;
        z-index: 2;
    }
    .l-dropdown button{
        position: relative;
        z-index: 1;
    }

    .l-dropdown .dropdown-layout{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
</style>
