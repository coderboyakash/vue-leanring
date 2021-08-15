<template>
    <h1>Welcome {{ loggedInUser.name }}</h1>
    <router-link to='' @click='handleLogOut'>Logout</router-link>
</template>
<script>
    export default {
        mounted(){
            // console.log(this.$store.state.loggedInUser)
        },
        data() {
            return {
                loggedInUser: this.$store.state.loggedInUser
            }
        },
        methods:{
            handleLogOut(){
                this.$store.commit('clearLoggedInData')
                localStorage.removeItem('_token');
                this.$router.push({name:'login'})
            }
        }
    }
</script>