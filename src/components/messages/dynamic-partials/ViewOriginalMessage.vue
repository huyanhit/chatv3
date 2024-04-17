<template>
    <b-popover triggers="click blur" placement="top">
        <div>
            {{ $t('home.view_original_message.view_original') }}
        </div>
    </b-popover>
</template>

<script>
export default {
    name: 'ViewOriginalMessage'
};
</script>
