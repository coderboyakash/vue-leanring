<template>
    <form @submit.prevent="handleRegister">
        <input type="text" v-model="name" />
        <br/>
        <input type="text" v-model="email" />
        <br/>
        <input type="password" v-model="password" />
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
                name : null,
                email : null,
                password : null
            }
        },
        methods:{
            handleRegister(){
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