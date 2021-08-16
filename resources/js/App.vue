<template>
    <el-config-provider :locale="locale">
        <router-view/>
    </el-config-provider>
</template>
<script>
    import { ElConfigProvider } from 'element-plus'
    import en from 'element-plus/lib/locale/lang/en'
    export default {
        mounted(){
            console.log('App Component Mounted!!')
        },
        components: {
            [ElConfigProvider.name]: ElConfigProvider,
        },
        data() {
            return {
            locale: en,
            }
        },
    }
</script>