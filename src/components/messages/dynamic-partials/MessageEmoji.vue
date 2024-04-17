<script setup>
    import {mapState} from "vuex";
</script>
<template>
    <span class="icon-emoij mr-1">
        <img :src="this.ICON[icon_id].src" :class="scale" /><span class="hide-text">{{ this.ICON[icon_id].altCode}}</span>
    </span>
</template>
<script>
export default {
    name: 'MessageEmoji',
    props: ['icon_id', 'scale'],
    computed: {
        ...mapState(["ICON"]),
    },
}
</script>
<style>
    .icon-emoij img{
        height: 25px;
        width: 25px;
    }
    .hide-text{
       opacity: 0;
       position: absolute;
       left: 0;
       width: 25px;
       height: 25px;
       overflow: hidden;
    }
    .icon-scale-y{
        transform: scaleY(-1);
    }
    .icon-scale-x{
        transform: scaleX(-1);
    }
</style>