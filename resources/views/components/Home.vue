<template>
  <h1>{{loggedInUser.name}}</h1>
  <h1>{{loggedInUser.email}}</h1>
  <router-link to="" @click="handleLogOut">Logout</router-link>
</template>
<script>
import { ElContainer } from 'element-plus'
export default {
  components:{
    ElContainer
  },
  mounted() {
    // console.log(this.$store.state.loggedInUser)
  },
  data() {
    return {
      loggedInUser: this.$store.state.loggedInUser,
    };
  },
  methods: {
    handleLogOut() {
      this.$store.commit("clearLoggedInData");
      localStorage.removeItem("_token");
      this.$router.push({ name: "login" });
    },
  },
};
</script>