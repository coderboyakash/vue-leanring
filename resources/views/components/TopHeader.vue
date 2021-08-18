<template>
    <el-row class="header-row" align="middle" justify="center" tag="section">
        <el-col align="right" >
            <el-button class="logout-btn" type="danger" @click="handleLogOut">Logout</el-button>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        methods:{
            handleLogOut() {
                this.$store.commit("clearLoggedInData");
                localStorage.removeItem("_token");
                this.$router.push({ name: "login" });
            }
        }   
    }
</script>