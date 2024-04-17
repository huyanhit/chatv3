

<template>
    <v-snackbar v-model="data.showAlert" variant="outlined" width="520" location="top" multi-line>{{ data.apiMessage }}
        <template v-slot:actions>
            <v-btn variant="text" @click="data.showAlert = false"> Close </v-btn>
        </template>
    </v-snackbar>
    <v-sheet 
        :class="model"
        class="mt-8"
        elevation="4"
        id="login-form"
        rounded 
        border >
        <v-form ref='form' v-model="data.form" @submit.prevent="onSubmit">
            <h3 class="text-center mb-5"> <b>LOGIN</b> </h3>
            <v-text-field variant="outlined" 
                type="email" 
                label="Email address" 
                class="form-control" 
                v-model="data.login.email" 
                required
                :rules="[Validate.required, Validate.max(data.login.email, 50), Validate.email]" 
            />
            <v-text-field 
                variant="outlined" 
                type="password" 
                class="form-control" 
                label="Password" 
                required
                v-model="data.login.password"  
                @click:appendInner.stop="data.showPass = !data.showPass"
                :append-inner-icon="data.showPass? 'mdi-eye-off-outline': 'mdi-eye-outline'"
                :rules="[Validate.required]" 
            />
            <v-checkbox label="Remember me" v-model="data.login.remember"/>
            <div class="col text-center">
                <v-btn variant="outlined" type="button" class="mb-4" v-on:click="loginApp">Sign in</v-btn>
            </div>
            <div class="col text-center mb-3">
                <router-link to="/fogot-password">Forgot password?</router-link>
            </div>
            <div class="text-center">
                <p>Not a member? <router-link to="/register">Register</router-link></p>
            </div>
        </v-form>
    </v-sheet>
</template>
<script setup>
    import ApiConst   from '@/constants/ApiContants';
    import Helper     from '@/common/Helper';
    import Validate   from '@/common/Validate';
    import {reactive, ref} from 'vue';
    
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
        if(form.value.validate()){
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
