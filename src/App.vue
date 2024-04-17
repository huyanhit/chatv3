<template>
    <router-view/>
</template>

<script>
export default {
    created() {
        this.event.on('change-language', (laguage)=>{
            this.$i18n.locale = laguage;
        });
    }
}
</script>
