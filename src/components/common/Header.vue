<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">电商价格对比系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>

                <!-- 用户头像 -->
                <div class="user-avator">
                    <!-- 这里的图片路径设置的是相对路径 -->
                    <img src="../../assets/img/wy.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="signOut">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import bus from '../common/bus';
import {setCookie, getCookie, delCookie} from '../../assets/cookies'

export default {
    data() {
        return {
            collapse: false,
            fullscreen: false,
            defaultName: '王也',  // 默认名
        };
    },
    computed: {
        username() {
            // 根据当前cookie中的token获取缓存中的用户名
            var token = getCookie("authToken");
            let username = localStorage.getItem(token);
            // 如果缓存中没有该token对应的用户名，则使用默认名
            return username ? username : this.defaultName;
        }
    },
    methods: {
        // 退出登录响应事件
        signOut(command) {
            if (command == 'loginout') {
                var token = getCookie("authToken")

                this.$axios({   //使用axios调用SSO后端服务接口
                    method: 'get', //请求方式
                    url: '/identity/signOut', //api对应url，要和后端设置的一致
                    params: { //传参
                        authToken: token
                    }
                }).then(response => { //获取http响应数据
                    var responseInventory = response.data.inventory; //返回错误码
                    var responseCode = response.status; //返回对象
                    var responseMessage = response.data.message; //返回信息
                    if (responseCode == 200) {  // 后端退出登录成功成功
                        // 从当前cookie中删除token，这一步非常重要，如果不做，就会导致url重定向死循环（这里的重定向不是下面重定向到/login，具体怎么回事讲解的时候再说）
                        delCookie("authToken")
                        // 从缓存中删除当前用户名
                        localStorage.removeItem(token);
                        //退出成功，重定向到登录页面
                        this.$router.push('/login');
                    } else {
                        //校验失败，提示用户信息有误
                        this.$message.info(responseMessage);
                    }
                }).catch(error => { // 捕获异常
                    this.$message.info("SSO服务无响应：" + error);
                    console.log(error);
                });
            }

        },
        // 侧边栏折叠，无需关心
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件，无需关心
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
</style>
