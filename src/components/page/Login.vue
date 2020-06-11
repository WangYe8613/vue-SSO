<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">电商价格对比系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            placeholder="password"
                            v-model="param.password"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="signIn()">登录</el-button>
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="register()">注册</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    var axios = require('axios')
    axios.defaults.baseURL = "http://47.93.44.20:8090"

    export default {
        data: function () {
            return {
                param: {
                    username: 'admin',
                    password: '',
                },
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                },
            };
        },
        mounted() {
            var axios_1 = require('axios')
            axios_1.defaults.baseURL = "http://localhost:8090"
        },
        methods: {
            signIn() {
                axios({
                    method: 'get',                                      //请求方式
                    url: '/identity/signIn',                            //api对应url，要和后端设置的一致
                    params: {                                           //传参
                        userName: this.param.username,
                        password: this.param.password
                    }
                }).then(response => {                                   //获取http响应数据
                    var responseInventory = response.data.inventory;    //response.data对应后端服务返回的json类型数据
                    var responseCode = response.data.code;
                    var responseMessage = response.data.message;
                    var token = null;
                    if (responseInventory !== null) {
                        token = responseInventory.token;
                    }
                    document.cookie = "authToken=" + token;
                    if (token != null) {
                        localStorage.setItem(token, this.param.username)
                        //校验成功，跳转主页
                        this.$router.push({
                            path: '/',
                            redirect: '/dashboard'
                        });
                    } else {
                        //校验失败，提示用户信息有误
                        this.$message.info(responseMessage);
                    }
                }).catch(error => {
                    this.$message.info("SSO服务无响应：" + error);
                    console.log(error);
                });
            },
            register() {
                axios({
                    method: 'get',
                    url: '/identity/register',
                    params: {
                        userName: this.param.username,
                        password: this.param.password,
                    }
                }).then(response => {
                    var responseInventory = response.data.inventory;
                    var responseCode = response.data.code;
                    var responseMessage = response.data.message;
                    if (responseInventory !== null) {
                        //注册成功，跳转登录
                        //校验失败，提示用户信息有误
                        this.$message.info("注册成功！！请登录");
                        this.$router.push({
                            name: 'login',
                        });
                    } else {
                        //校验失败，提示用户信息有误
                        this.$message.info(responseMessage);
                    }
                }).catch(error => {
                    this.$message.info("SSO服务无响应：" + error);
                    console.log(error);
                });
            }
        },
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/volcano.jpg);
        background-size: 110%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>