<template>
    <span
        :id="id"
        class="l-chip"
        :class="[variant ? 'chip-' + variant : '']"
        :style="{background: background, color: color, 'border-color': bcolor, height: size + 'px', 'line-height': size-2 + 'px'}"
        v-on="events"
    >
        <span
            :class="$props.class"
        ><slot /></span>
    </span>
</template>

<script>
import uiProps from './common/uiProps';
import transfer   from './common/transferData';

export default {
    props:{ ...uiProps , ...{
        background:{
            type: String,
            default: '#fff'
        },
        color:{
            type: String,
            default: '#777'
        },
        bcolor:{
            type: String,
            default: '#fff'
        },
        size:{
            type: String,
            default: '20'
        }
    }},
    setup(props, emit) {
        const events = { click: 'click' }
        transfer.setupEvents(events, emit);

        return {events}
    }
}
</script>

<style>
.l-chip{
    display: inline-block;
    font-size: 11px;
    border-radius: 4px;
    border: 1px solid #777777;
    color: #777777;
    padding: 0 11px;
    cursor: pointer;
}
.chip-primary {
    border: 1px solid #00A3FF;
    color: #00A3FF; }
.chip-success {
    border: 1px solid #0C7238;
    color: #0C7238; }
.chip-warning {
    border: 1px solid #c2b200;
    color: #c2b200; }
.chip-danger {
    border: 1px solid #CC4B4C;
    color: #CC4B4C; }

.chip-primary:hover {
    background-color: #00A3FF;
    color: #fff; }
.chip-success:hover {
    background-color: #0C7238;
    color: #fff; }
.chip-warning:hover {
    background-color: #c2b200;
    color: #fff; }
.chip-danger:hover {
    background-color: #CC4B4C;
    color: #fff; }

.rounded {
    border-radius: 10px;
}
</style>