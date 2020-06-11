<template>
    <div class="sidebar" >
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template >
                <el-menu-item :index="items[0].index" :key="items[0].index">
                    <i :class="items[0].icon"></i>
                    <span slot="title">{{ items[0].title }}</span>
                </el-menu-item>
                <el-menu-item :index="items[1].index" :key="items[1].index">
                    <div @mouseenter="onMouseOver" @mouseout="onMouseOut">
                        <i :class="items[1].icon"></i>
                        <span slot="title" >{{ items[1].title }}</span>
                    </div>
                </el-menu-item>
                <el-menu-item >
                    <img class="img" v-show="seen" src="../../../src/assets/img/wechat.jpeg">
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            seen: false,
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '折线图'
                },
                {
                    icon: 'el-icon-lx-redpacket_fill',
                    index: '/donate',
                    title: '支持作者'
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
    methods: {
    onMouseOver() {
        this.seen=true
    },
    onMouseOut() {
        this.seen=false
    },
}
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
    .img{
        display: block;
        width: 200px;
        height: 260px;

    }
</style>
