

<template>
    <div class="navigation-item" :title="(data.title !== undefined)? data.title: ''">
        <router-link :to="'/'+data.name">
            <span class="nav-icon">
                <v-badge class="navg mt-2" :content="data.notify" color="error" v-if="data.notify !== 0">
                    <v-icon :icon="data.icon" ></v-icon>
                </v-badge>
                <v-icon v-else class="mt-2" :icon="data.icon" ></v-icon>
            </span>
        </router-link>
    </div>
</template>
<script setup>
    import EventConst        from '@/constants/EventContants';
    import Helper            from '@/common/Helper';
    import { onMounted }     from "vue";
    const props = defineProps(['data'])
    const event  = Helper.useEvent();
    onMounted(()=>{
        event.emit(EventConst.EV_MOUNT_COMPONENT, {name: 'Navigator', time:Date.now()});
    })
</script>
<style scoped>
    .notify{
        background: red;
        height: 10px;
        width: 10px;
        position: absolute;
        border-radius: 50%;
    }
    .navigation-item a{
        min-height: 65px;
        line-height: 35px;
        margin: 0;
        cursor: pointer;
        display: inline-block;
        width: 100%;
        color: #fff;
        font-size: 20px;
        vertical-align: middle;
    }

    .navigation-item a.router-link-active{
        background-color: #111;
    }
    .navigation-item .nav-icon {
        margin-top: 8px;
        display: inline-block;
    }
</style>
