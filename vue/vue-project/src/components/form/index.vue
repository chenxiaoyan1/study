<template>
    <div>
        <KForm  :rules="rules" ref="ruleForm" :model = "formData">
            <KFormItem label="名称"  prop="name">
                <KInput v-model="formData.name" placeholder="请输入名称" name="123"></KInput>

            </KFormItem>
            <KFormItem label="密码"  prop="password">
                <KInput type="password" v-model="formData.password" placeholder="请输入名称" name="123"></KInput>
            </KFormItem>
            <KFormItem>
                <button type="button" @click="handleSave">保存</button>
            </KFormItem>
        </KForm>

    </div>

</template>

<script>
    import KForm from "./KForm";
    import KFormItem from "./KFormItem";
    import KInput from "./KInput";

    export default {
        name: "index",
        data:function(){
            return {
                formData:{
                    name:'',
                    password:""
                },

                rules:{
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        components: {
            KForm,
            KFormItem,
            KInput
        },
        methods:{
            handleSave:function () {
                this.$refs["ruleForm"].validate(function(valid){
                    if(valid){
                        alert("submit")
                    }else{
                        alert("error submit")
                        return false;
                    }
                })
            }
        }
    }

</script>

<style scoped>

</style>