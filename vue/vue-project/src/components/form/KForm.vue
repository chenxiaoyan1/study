<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "KForm",
        methods:{
            validate:function (cb) {
                let that = this
                //TODO children也不正确
               var arr =  this.$children.filter(i=> i.$attrs.prop).map(it=>{
                    return it.validate(that.$attrs.model[it.$attrs.prop])
                })
                Promise.all(arr).then((val)=>{
                    cb(val.every((e)=>{
                        return  !e === true
                    }))
                }).catch(()=>{
                    cb(false)
                })
            }
        }
    }
</script>

<style scoped>

</style>