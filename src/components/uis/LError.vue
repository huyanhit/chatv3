<template>
    <span
        :id="id"
        class="l-error"
        :class="[variant ? 'error-' + variant : '']"
        v-on="events"
    >
        <span
            v-if="errors.length > 0"
            :class="$props.class"
        >{{ errors }}</span>
    </span>
</template>

<script>
import uiProps from './common/uiProps';
import transfer from './common/transferData';

export default{
    props:{ ... uiProps , errors:{type: String, default: ''}},
    setup(props, { emit }) {
        const events = { }
        transfer.setupEvents(events, emit);

        return {events}
    }
}

</script>
<style scoped>
    .l-error{
        font-size: 12px;
        color: red;
        display: block;
        text-align: right;
        margin-bottom: 10px;
        position: absolute;
        bottom: -28px;
        right: 5px;
    }
</style>