> 一篇理解vue响应式原理的文档
> 参考文章链接：
> https://juejin.cn/post/6844903597986037768#heading-1
> https://juejin.cn/post/6844903599202369543

 简易版vue源码
```js
const Observer = function(data) {
  // 循环修改为每个属性添加get set
  for (let key in data) {
    defineReactive(data, key);
  }
}

const defineReactive = function(obj, key) {
  // 局部变量dep，用于get set内部调用
  const dep = new Dep();
  // 获取当前值
  let val = obj[key];
  Object.defineProperty(obj, key, {
    // 设置当前描述属性为可被循环
    enumerable: true,
    // 设置当前描述属性可被修改
    configurable: true,
    get() {
      console.log('in get');
      // 调用依赖收集器中的addSub，用于收集当前属性与Watcher中的依赖关系
      dep.depend();
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      val = newVal;
      // 当值发生变更时，通知依赖收集器，更新每个需要更新的Watcher，
      // 这里每个需要更新通过什么断定？dep.subs
      dep.notify();
    }
  });
}

const observe = function(data) {
  return new Observer(data);
}

const Vue = function(options) {
    //！！！！从这里最开始！！！！
  const self = this;
  // 将data赋值给this._data，源码这部分用的Proxy所以我们用最简单的方式临时实现
  if (options && typeof options.data === 'function') {
    this._data = options.data.apply(this);
  }
  // 挂载函数
  this.mount = function() {
    new Watcher(self, self.render);
  }
  // 渲染函数
  this.render = function() {
    with(self) {
      _data.text;
    }
  }
  // 监听this._data
  observe(this._data);  
}

const Watcher = function(vm, fn) {
  const self = this;
  this.vm = vm;
  // 将当前Dep.target指向自己
  Dep.target = this;
  // 向Dep方法添加当前Wathcer
  this.addDep = function(dep) {
    dep.addSub(self);
  }
  // 更新方法，用于触发vm._render
  this.update = function() {
    console.log('in watcher update');
    fn();
  }
  // 这里会首次调用vm._render，从而触发text的get
  // 从而将当前的Wathcer与Dep关联起来
  this.value = fn();
  // 这里清空了Dep.target，为了防止notify触发时，不停的绑定Watcher与Dep，
  // 造成代码死循环
  Dep.target = null;
}

const Dep = function() {
  const self = this;
  // 收集目标
  this.target = null;
  // 存储收集器中需要通知的Watcher
  this.subs = [];
  // 当有目标时，绑定Dep与Wathcer的关系
  this.depend = function() {
    if (Dep.target) {
      // 这里其实可以直接写self.addSub(Dep.target)，
      // 没有这么写因为想还原源码的过程。
      Dep.target.addDep(self);
    }
  }
  // 为当前收集器添加Watcher
  this.addSub = function(watcher) {
    self.subs.push(watcher);
  }
  // 通知收集器中所的所有Wathcer，调用其update方法
  this.notify = function() {
    for (let i = 0; i < self.subs.length; i += 1) {
      self.subs[i].update();
    }
  }
}

const vue = new Vue({
  data() {
    return {
      text: 'hello world'
    };
  }
})

vue.mount(); // in get
vue._data.text = '123'; // in watcher update /n in get

```



利用画图来表示上面代码：



![avatar](\source\vue响应式原理流程.png)

总结：
先来几个帮助理解的注意点:
- data中每个属性都有一个对象的dep
- data中每个属性都会被添加getter和setter属性
- 每一个组件都有一个和他对应的watcher实例
- 当组件的render函数执行的时候，组件依赖的data的某些属性的getter会被调用，此时vue会记录此组件所依赖的所有data，此过程被称为依赖收集。（只会收集被依赖的data，如果data中某属性没有在组件中使用，他就不会被收集）
- data改动时，setter方法被调用，此时vue会通知所有依赖此data的组件去调用他们的render函数进行更新

真正的总结：
1、new Vue()首先执行初始化，对data进行响应式处理，对data中每个属性利用Object.defineProperty重写get和set方法，为每个属性声明专属的dep（依赖收集器），get方法添加监听，一旦调用get方法就会向dep中添加当前watcher
2、在mount时，实例化一个watcher，设置Dep.target指向当前watcher，之后会重置Dep.target
3、当data发生变化时，触发set，set方法中dep.notify();被触发，遍历该dep中所有watcher来执行watcher.update操作



！！！！！！！！！！！我觉得晚上可以再看一下源码视频！！！！！！！！！！！

