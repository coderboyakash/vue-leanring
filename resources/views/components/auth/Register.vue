<template>
        <el-row :gutter="20">
        <el-col :span="12" :offset="6">
            <el-card>
                <h3>Create New Account</h3>
                <form @submit.prevent="handleRegister">
                    <el-input 
                        class="name-input"
                        type="name"
                        v-model="name"
                    ></el-input>
                    <el-input 
                        class="email-input"
                        type="email"
                        v-model="email"
                    ></el-input>
                    <el-input 
                        class="password-input"
                        type="password"
                        v-model="password"
                    ></el-input>
                    <el-button native-type="submit" type="primary">
                        <span v-if="!loading">Register</span>
                        <span v-else>Please Wait ...</span>
                    </el-button>
                    <el-button native-type="button" @click='pushToLogin' type="primary">Login</el-button>
                </form>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                name : null,
                email : null,
                password : null,
                loading : false
            }
        },
        methods:{
            pushToLogin(){
                this.$router.push({name:'login'})
            },
            handleRegister(){
                this.loading = true
                let data = {
                    name : this.name, 
                    email : this.email, 
                    password : this.password
                }
                axios.post('http://127.0.0.1:8000/api/register', data)
                .then(({data}) => {
                    if(data.code == 201){
                        this.$store.commit('setLoggedData', {
                            'user' : data.result,
                            'token' : data.token,
                            'status' : true
                        })
                        localStorage.setItem('_token', data.token);
                        this.$router.push({name:'home'})
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .name-input{
        margin-bottom:1rem;
    }
    .email-input{
        margin-bottom:1rem;
    }
    .password-input{
        margin-bottom:1rem;
    }
</style>