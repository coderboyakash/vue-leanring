<template>
    <form @submit.prevent="handleLogin">
        <input type="text" v-model="email" name="email">
        <br/>
        <input type="password" v-model="password" name="email">
        <br/>
        <input type="submit" value="Submit">
        <br/>
    </form>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                email : '',
                password : ''
            }
        },
        methods:{
            handleLogin(){
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