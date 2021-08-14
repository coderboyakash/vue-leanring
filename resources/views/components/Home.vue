<template>
    <h1>{{ loggedInUser }}</h1>
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
        }
    }
</script>