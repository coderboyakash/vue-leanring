<template>
    <el-row :gutter="20">
        <el-col :span="12" :offset="6">
            <el-alert v-for="error in errors" :key="error.index"
                :title="error"
                type="error"
                center
                show-icon>
            </el-alert>
            <el-alert v-if="message"
                :title="message"
                type="success"
                center
                show-icon>
            </el-alert>
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
    import { ElButton, ElRow, ElCol, ElInput, ElCard, ElAlert } from 'element-plus'
    import axios from 'axios'
    export default {
        components:{
            ElButton, ElRow, ElCol, ElInput, ElCard, ElAlert
        },
        data(){
            return {
                email : '',
                password : '',
                loading : false,
                errors : [],
                message : null
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
                        setTimeout(() => {
                            this.$router.push({name:'home'})
                        }, 1000);
                        this.message = data.message
                    }else{
                        this.loading = false
                        this.errors = data.errors
                        setTimeout(() => {
                            this.errors = []
                        }, 5000);
                    }
                }).catch(()=>{
                    this.errors = ['Something Went Wrong!']
                    setTimeout(() => {
                        this.loading = false
                        this.errors = []
                    }, 2000);
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