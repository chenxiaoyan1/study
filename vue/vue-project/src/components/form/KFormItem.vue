<template>
    <div>
        <label v-if="label">{{label}}</label>
        <slot></slot>
        <p v-if="error">{{error}}</p>
    </div>

</template>

<script>
    import Schema from 'async-validator';

    export default {
        name: "KFormItem",
        data:function(){
            return {
                error:""
            }
        },
        props:{
            label:String
        },
        methods:{
            validate:function(val){
                //val当前input的值
                //name
                let key = this.$attrs.prop
                //name对应的规则 TODO 这里parent不合适
                // console.log(this.$parent.$attrs.rules[this.$attrs.prop])

                const desc ={[key]:this.$parent.$attrs.rules[key][0]}
                const validator = new Schema(desc)
              var  o =   validator.validate({[key]:val}).then(()=>{
                    //校验成功
                    this.error = ""
                }).catch(({fields})=>{
                    //校验失败
                    this.error = fields[key][0].message
                  return this.error
                })
                return o;
            }
        }
    }
</script>

<style scoped>

</style>