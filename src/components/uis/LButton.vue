<template>
    <button
        :id="id"
        class="form-control l-button button"
        :type="type"
        :class="[variant ? 'button-' + variant : '' , $props.class]"
        :disabled="$props.disabled"
        v-on="events"
    >
        <l-icon
            v-if="icon"
            class="btn-icon"
            :icon="icon"
            v-on="iconEvents"
        />
        <l-label> {{ label }} </l-label>
    </button>
</template>

<script>
import { ref } from 'vue'
import inputProps from './common/InputProps';
import transfer   from './common/transferData';
import LLabel from './LLabel.vue';

export default{
    components: { LLabel },
    props:{
        ... inputProps, ...{
            type: {
                type: String,
                default: 'button'
            },
        }
    },
    setup(props , { emit }) {
        const errors = ref('');
        const events = {}
        const iconEvents = {click: 'iconClick'}

        transfer.setupInject('form');
        transfer.setupEvents(events, emit);
        transfer.setupEvents(iconEvents, emit);

        return {errors, events, iconEvents}
    }
}

</script>

<style>
.button:disabled {
    opacity: 0.5 !important;
}
.button {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    appearance: none;
    border: 1px solid #483838;
    border-radius: 4px;
    background: rgba(72, 56, 56, 0.15);
    text-align: center;
    font-size: 12px;
    line-height: 1;
    padding: 9px 19px;
    margin: 0 5px;
    width: auto;
}
.button:hover {
    background-color: #483838;
    color: #fff;
}
.button i svg.svgstroke{
    stroke: #483838;
}
.button:hover i svg.svgstroke{
    stroke: #fff;
}
.button label {
    margin: 0 0 0 4px;
    cursor: pointer;
    flex: 1;
}
/* Variant */
.button.button-sent {
    background-color: #483838;
    border: 1px solid #483838;
    color: #fff;
}
.button.button-sent:hover {
    background-color: #fff;
    color: #483838;
}
.button.button-sent i svg.svgstroke {
    stroke: #fff;
}
.button.button-sent:hover i svg.svgstroke {
    stroke: #483838;
}
.button.button-sent i svg.svgfill {
    fill: #fff;
}
.button.button-sent:hover i svg.svgfill {
    fill: #483838;
}

.button.button-back {
    border: 1px solid rgba(72, 56, 56, 0.1);
}

.button.button-cancel {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.3);
    color: rgba(0, 0, 0, 0.3);
}
.button.button-cancel:hover {
    background-color: #fff;
      border: 1px solid #000;
      color: #000;
}
.button.button-cancel i svg.svgfill{
    fill: rgba(0, 0, 0, 0.3);
}
.button.button-cancel:hover i svg.svgfill{
    fill: #000;
}
.button.button-cancel i svg.svgstroke {
    stroke: rgba(0, 0, 0, 0.3);
}
.button.button-cancel:hover i svg.svgstroke {
    stroke: #000;
}

.button.button-deny {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.3);
    color: rgba(0, 0, 0, 0.5);
}
.button.button-deny:hover{
    border: 1px solid #000;
    color: #000;
}
.button.button-deny i svg.svgstroke {
    stroke: #000;
    opacity: 0.5;
}
.button.button-deny:hover i svg.svgstroke {
    opacity: 1
}

.button.button-add {
    background-color: rgba(43, 122, 11, 0.15);
    border: 1px solid #2B7A0B;
    color: #2B7A0B;
}
.button.button-add:hover {
    background-color: #2B7A0B;
    border: 1px solid #2B7A0B;
    color: #fff;
}
.button.button-add i svg.svgfill {
    fill: #2B7A0B;
}
.button.button-add:hover i svg.svgfill {
    fill: #fff;
}
.button.button-add i svg.svgstroke {
    stroke: #2B7A0B;
}
.button.button-add:hover i svg.svgstroke {
    stroke: #fff;
}

.button.button-active {
    border: 1px solid #2B7A0B;
    background-color: rgba(43, 122, 11, 0.15);
    color: #2B7A0B;
    font-weight: bold;
}
.button.button-active i svg.svgfill {
    fill: #2B7A0B;
}
.button.button-active i svg.svgstroke {
    stroke: #2B7A0B;
}

.button.button-trash {
    background-color: #fff;
    border: 1px solid #AB1212;
    color: #AB1212;
}
.button.button-trash:hover {
    background-color: #AB1212;
    border: 1px solid #AB1212;
    color: #fff;
}
.button.button-trash i svg.svgfill {
    fill: #AB1212;
}
.button.button-trash:hover i svg.svgfill {
    fill: #fff;
}
.button.button-trash i svg.svgstroke {
    stroke: #AB1212;
}
.button.button-trash:hover i svg.svgstroke {
    stroke: #fff;
}

.button.button-addcontact {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.5);
    padding: 4px 5px;
}
.button.button-addcontact:hover {
    color: #000
}
.button.button-addcontact i svg {
    stroke: #000;
    opacity: 0.5
}
.button.button-addcontact:hover i svg{
    stroke: #000;
    opacity: 1;
}

.button.button-tool{
    display: flex;
    justify-content: center;
    align-items: center;
    appearance: none;
    border: none;
    border-radius: 4px;
    background: transparent;
    width: 36px;
    height: 28px;
    padding: 0;
    margin-left: 2px;
}
.button.button-tool:hover{
    background-color: fff;
}
.button.button-tool:hover{
    background-color: #fff;
}
.button.button-tool i{
    flex: 0 0 100%;
}
.button.button-tool label{
    display: none;
}
.button.button-tool i svg{
    stroke: #000;
    opacity: 0.3;
}
.button.button-tool:hover i svg{
    stroke: #000;
    opacity: 1;
}

.button.button-tool-trash{
    display: flex;
    justify-content: center;
    align-items: center;
    appearance: none;
    border: none;
    border-radius: 4px;
    background: transparent;
    width: 36px;
    height: 28px;
    padding: 0;
    margin-left: 2px;
}
.button.button-tool-trash:hover{
    background-color: #fff;
}
.button.button-tool-trash i{
    flex: 0 0 100%;
}
.button.button-tool-trash label{
    display: none;
}
.button.button-tool-trash i svg {
    stroke: #CD0000;
}
.button.button-tool-trash:hover i svg {
    stroke: #CD0000;
}

.button.button-notext {
    width: 30px;
    padding: 5px 0;
    border: none;
}
.button.button-notext i svg{
    margin: 0;
}
</style>
