# 效果图
![q](../source\cron组件效果图.png)

# 如何使用
1、调用的地方

```vue
<template>
 <cron v-model="cochainCycle" :cron="cochainCycle" @change="handleChangeCron"></cron>
</template>
<script>
import cron from "cron"
export default {
  name: 'App',
    data:function(){
      return {
          cochainCycle:""
      }
    },
    methods:{
        handleChangeCron(cron){
            this.cochainCycle = cron
        }
    },
  components: {
      cron
  }
}
</script>
```
2、组件源码
见cron.vue