
<template>
    <form id="logout-form">
        <div class="row mb-4">
            <div class="col d-flex justify-content-center">
                <button type="button" class="btn btn-primary btn-block mb-4 text-center" v-on:click="logoutApp">Logout</button>
            </div>
        </div>
    </form>
</template>
<script setup>
    import ApiConst   from '@/constants/ApiContants';
    import Helper     from '@/common/Helper';
    
    const cookies   = Helper.useCookies();
    const route     = Helper.useRoute();
    const api       = Helper.useApi();
    const logoutApp = function(){
        api.callApi({method: "get", url: ApiConst.LOGOUT});
        cookies.remove('access_token');
        route.push("/login");
    }
</script>
<style scoped>
    #logout-form{
        margin: auto;
        max-width: 400px;
        transform: translateY(30%);
    }
</style>
