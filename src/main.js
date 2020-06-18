import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import {messages} from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

import {setCookie, getCookie, delCookie} from './assets/cookies'

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

// 使用钩子函数对路由进行权限跳转，看这里之前，一定要先看懂src/router/index.js里设置的路由信息
// 顾名思义，beforeEach的作用就是在路由映射之前做一些预判断操作
router.beforeEach((to, from, next) => {

    // 先获取一下当前的cookies中的authToken（可能为空），用于判断当前是否已经是登录过的状态
    var token = getCookie('authToken');

    // 开始判断路由信息
    if (to.path.startsWith('/dashboard') && token == "") {  // 如果url是以/dashboard开头，并且token为空，说明未登录
        // 判断url中是否有"="（这个"="只会在'重定向url的回调时'被添加上，比如下面代码中window.location.href处）
        var index = to.path.indexOf("=")
        if (index >= 0) {   // 如果有"="，则说明这是回调url，不是用户直接访问http://ip:port/#/dashboard
            // 拆解回调url带回来的参数
            var back_params = to.path.slice(index + 1, to.path.length)
            if (back_params == "/" || back_params == null) {
                // 如果参数只有/，说明token和用户名为空，即另外一个vue-SSO系统中也是未登录状态
                next('/login')
            } else {
                // 如果参数不为空，拆解获取token和用户名
                var index_params = back_params.indexOf("/")
                var back_token = back_params.slice(0, index_params)
                var name = back_params.slice(index_params + 1, back_params.length)
                // 缓存用户名，方便Header.vue中显示用户名
                localStorage.setItem(back_token, name)
                // 在cookies设置token，方便后续直接获取，免登录
                setCookie("authToken", back_token)
                // 重定向到http://ip:port/#/dashboard
                next('/dashboard')
            }
        } else {    // 如果没有"="，则说明这是用户直接访问http://ip:port/#/dashboard，不是回调url
            // 但是由于当前的cookies中的authToken为空，即未登录状态，所以重定向到另一个vue-SSO项目的http://ip:port/#/callback路由，看另一个vue-SSO系统中是否已经登录
            // 第一个ip:port要写另外一个vus-SSO部署的ip:port
            // 第二个ip:port要写当前vus-SSO部署的ip:port
            window.location.href = 'http://localhost:8070/#/callback/=http://172.24.32.33:8090/=/dashboard';
        }
    } else if (to.path == '/login') {
        // 如果用户访问的是http://ip:port/#/login，则直接进入登录界面
        next()
    } else if (to.path == '/dashboard' && token != "") {
        // 如果用户访问的是http://ip:port/#/dashboard，并且当前token不为空，则直接进入Dashboard页面（Dashboard页面加载的时候会对该token进行校验，如果未过期则正常加载页面）
        next()
    } else if (to.path.startsWith('/callback')) {   // 如果有用户访问http://ip:port/#/callback（一般是由另一个vue-SSO做的远程访问，这里呼应上面的window.location.href），则根据回调url返回token
        // 对window.location.href设置url进行拆解
        var index = to.path.indexOf("=")
        var url_from = to.path.slice(index + 1, to.path.length)
        index = url_from.indexOf("=")
        var ip = url_from.slice(0, index)
        var router = url_from.slice(index + 1, url_from.length)
        var name = localStorage.getItem(token)
        if (name == "null" || name == null) {
            name = ""
        }
        // 根据回调url，重定向回另一个vue-SSO，带上token和用户名（token和用户名可能为空，即当前vue-SSO系统中也没有登录）
        var url_back = ip + "#" + router + "/=" + token + "/" + name;
        window.location.href = url_back;
    } else if (to.path == '/article') {    // 富文本编辑器页面
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});


new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');

// 设置全局变量axios，其他地方只要import就可以使用
var axios = require('axios')
axios.defaults.baseURL = "http://47.93.44.20:8080"  // 设置为SSO服务的ip:port，这里是用来调用后端SSO服务接口的
Vue.prototype.$axios = axios