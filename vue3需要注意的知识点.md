1. vue2 的书写风格是选项式（Options API）风格，vue3 增加了组合式（Composition API）风格
2. vue 响应式系统
3. app.mount("#app")和 app.use()等函数返回值不一样，mount 返回值是根组件实例，而其他函数返回值则是 app 应用实例本身，由此可知 app.use().use()可以这样链式调用，但是一旦 app.mount()后就无法进行链式调用了。
