<script setup>
    import {mapState} from "vuex";
</script>
<template>
    <div class="file-message" >
        <i class="bi bi-folder mr-2"></i><span class="file-name" v-if="FILE[file_id] !== undefined">{{ FILE[file_id].name }}</span>
    </div>
</template>
<script>
export default {
    name: 'MessageFile',
    props: ['file_id'],
    computed: {
        ...mapState(['CURRENT_USER', 'FILE']),
    }
}
</script>
<style>
.file-message i{
    font-size: 30px;
}
.file-message .file-name{
    position: relative;
    top: -5px;
}
</style>
