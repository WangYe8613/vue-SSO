import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 在下面通过path和component设置路由信息
export default new Router({

    routes: [
        {
            path: '/',              // 设置url为/时，重定向到/dashboard
            redirect: '/dashboard'
        },
        {
            path: '/',              // 设置url为/时，对应Home.vue页面
            component: () => import('../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard*',    // 设置url为/dashboard开头时，对应Dashboard.vue页面
                    component: () => import('../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                }
            ]
        },
        {
            path: '/login',         // 设置url为/login时，对应Login.vue页面
            component: () => import('../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',              // 设置url为/*时，对应404页面
            redirect: '/404'
        }
        ,
        {
            path: '/callback*',     // 设置url为/dashboard开头时，不对应任何页面，这里只是提供这么一个url，方便在main.js里做"路由的预判断"
        }
    ]
});
