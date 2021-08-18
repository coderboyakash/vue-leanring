<template>
    <top-header />
    <el-row :gutter="20">
        <el-col :span="12">
            <div class="name">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium esse alias facere eveniet aspernatur cumque debitis
                similique architecto reprehenderit blanditiis!
            </div>
        </el-col>
        <el-col :span="12">
            <div class="name">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium esse alias facere eveniet aspernatur cumque debitis
                similique architecto reprehenderit blanditiis!
            </div>
        </el-col>
    </el-row>
</template>
<script>
import TopHeader from './TopHeader.vue'
export default {
    components:{
        TopHeader
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
        
    },
};
</script>

<style scoped>
.name {
    background-color: aqua;
    padding: 0px 10px 0px 10px;
}
.email {
    background-color: rgb(0, 89, 255);
    padding: 0px 10px 0px 10px;
}
.header-row {
    min-height: 3rem;
    background: bisque;
}
.logout-btn {
    margin-right: 0.5rem;
}
</style>