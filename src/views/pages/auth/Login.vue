

<template>
    <div  class="mt-8" id="login-form">
        <l-form ref='form' v-model="data.form" @submit.prevent="loginApp" validate_on="auto">
            <h3 class="text-center mb-5"> <b>LOGIN</b> </h3>
            <l-text-field variant="outlined"
                type="email"
                label="Email address"
                name="email"
                class="form-control"
                v-model="data.login.email"
                :rules="['required','email']"
            />
            <l-text-field
                variant="outlined"
                type="password"
                name="password"
                class="form-control"
                label="Password"
                v-model="data.login.password"
                :rules="['required']"
            />
            <l-checkbox label="Remember me" v-model="data.login.remember"/>
            <div class="col text-center">
                <l-button type="submit" variant="outlined" class="btn btn-primary text-white">Sign in</l-button>
            </div>
            <div class="col text-center mb-3">
                <router-link to="/fogot-password">Forgot password?</router-link>
            </div>
            <div class="text-center">
                <p>Not a member? <router-link to="/register">Register</router-link></p>
            </div>
        </l-form>
    </div>
</template>
<script setup>
    import ApiConst   from '@/constants/ApiContants';
    import Helper     from '@/common/Helper';
    import Validate   from '@/common/Validate';
    import {reactive, ref} from 'vue';
    import LButton from "@/components/uis/LButton.vue";
    
    const api       = Helper.useApi();
    const cookies   = Helper.useCookies();
    const store     = Helper.useStore();
    const route     = Helper.useRoute();
    const form      = ref([]);

    const data = reactive({
            errors: '',
            form: false,
            showPass: false,
            showAlert: false,
            apiMessage: '',
            login:{
                email: '',
                password: '',
                remember: true,
            },
        }
    )

    const loginApp = async function(){
        data.showAlert = false;
        const validate = form.value.validate(true);
        console.log(validate)
        if(!validate){
            api.callApi({method: "post", url: ApiConst.LOGIN, param:data.login }).then((response) => {
                data.showAlert  = true;
                data.apiMessage = response.message;
                if(response && response.status === 1){
                    store.state.CURRENT_USER = {id: response.data.user.id}
                    cookies.set('access_token', response.data.access_token)
                    setTimeout(() => {
                        route.push('/');
                    }, 1000);
                }
            })
        }
    }
</script>
<style scoped>
    #login-form{
        margin: auto;
        max-width: 500px;
        transform: translateY(20%);
        padding: 30px;
    }
    .login-alert{
        margin: auto;
        max-width: 500px;
    }
    #login-form .form-control{
        border: none;
    }
</style>
