<template>
    <el-row :gutter="20">
        <el-col :span="12" :offset="6">
            <el-card>
                <h3>Login Box</h3>
                <form @submit.prevent="handleLogin">
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
                    <el-button native-type="submit" :loading="loading" type="primary">
                        <span v-if="!loading">Submit</span>
                        <span v-else>Logging In ...</span>
                    </el-button>
                    <el-button native-type="button" @click='pushToNewAccount' type="primary">Create new Account</el-button>
                </form>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
    import { ElButton, ElRow, ElCol, ElInput, ElCard } from 'element-plus'
    import axios from 'axios'
    export default {
        components:{
            ElButton, ElRow, ElCol, ElInput, ElCard
        },
        data(){
            return {
                email : '',
                password : '',
                loading : false
            }
        },
        methods:{
            pushToNewAccount(){
                this.$router.push({name:'register'})
            },
            handleLogin(){
                this.loading = true
                let data = {
                    email : this.email, 
                    password : this.password
                }
                axios.post('http://127.0.0.1:8000/api/login', data)
                .then(({data}) => {
                    if(data.code == 302){
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
    .email-input{
        margin-bottom:1rem;
    }
    .password-input{
        margin-bottom:1rem;
    }
</style>