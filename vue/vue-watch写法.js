	watch:{
			todos:{
				function(){
					console.log("1")
				},
				handler(newVal,oldVal){//当监视到todos改变的时候，就自动调用handler方法
					console.log("2")
				},
				deep:true,//深度监视，
				immediate: true
			}
		}

/**
  - handler(newVal,oldVal)（只能是这个方法名称）
  - 监视到todos改变的时候，就自动调用handler方法
  - 在变异 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变异之前值的副本

- deep:
  - 设置为true 深度监视
    引用类型默认只能监听一层，无法见识内部成员的子成员的改变，设置这个deep就可以监视对象的改变了
- immediate
  - 设置为true,无论是否变化，初始的时候就调用一次，是否设置看需求
  */