<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import {setCookie, getCookie, delCookie} from '../../assets/cookies'

    export default {
        name: 'dashboard',
        data() {
            return {
                // 后期要讲dates和datas做成动态的，即调用后端接口获取数据填写到dates和datas里，也就是从爬虫项目中获取数据，这样前端就可以实现动态数据展示
                dates: ['6月', '7月', '8月', '9月', '10月'],
                datas: [
                    {
                        name: "天猫",
                        data: [74, 118, 200, 235, 90]
                    },
                    {
                        name: "拼多多",
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        name: "京东",
                        data: [164, 178, 150, 135, 160]
                    }
                ],
                options: {
                    type: 'line',
                    title: {
                        text: '同种商品不同电商价格对比图'
                    },
                    labels: this.dates,
                    datasets: [
                        {
                            label: this.name,
                            data: this.data
                        },
                        {
                            label: this.name,
                            data: this.data
                        },
                        {
                            label: this.name,
                            data: this.data
                        }
                    ]
                }
            };
        },
        mounted() { // mounted的作用：每次页面加载都会执行mounted函数中的内容
            this.authorizationValidate();   //校验当前cookie中的token，即用于判断是否可以免登录

            // 只有下面这样写，dates和datas的数据才能真正被赋值到datasets中，然后在前端展示出来
            this.options.labels = this.dates
            for (let i = 0; i < this.options.datasets.length; i++) {
                let dataset = this.options.datasets[i]
                console.log('dataset:', dataset)
                dataset.label = this.datas[i].name
                dataset.data = this.datas[i].data
            }
        },
        components: {
            Schart
        },
        methods: {
            // 校验token
            authorizationValidate() {
                // 获取当前cookie中的token（可能为空）
                var token = getCookie("authToken")
                if (token == "" || token == "null") {
                    // 如果token为空，则重定向到登录界面
                    this.$router.push('/login');
                } else {
                    this.$axios({   // 使用axios调用SSO后端服务接口
                        method: 'get', //请求方式
                        url: '/authorization/validate', //api对应url，要和后端设置的一致
                        params: { //传参
                            authToken: token
                        }
                    }).then(response => { //获取http响应数据（这个是异步的，并非阻塞式响应）
                        var responseInventory = response.data.inventory; //返回错误码
                        var responseSuccess = response.data.code; //返回对象
                        var responseMessage = response.data.message; //返回信息

                        // 如果校验失败，即token已过期
                        if (responseInventory == null || responseInventory.validate == false) {
                            // 从当前cookie中删除token，这一步非常重要，如果不做，就会导致url重定向死循环（这里的重定向不是下面重定向到/login，具体怎么回事讲解的时候再说）
                            delCookie("authToken")
                            // 重定向到登录界面
                            this.$router.push('/login');
                        }
                    }).catch(error => { // 捕获异常
                        this.$message.info("SSO服务无响应：" + error);
                        console.log(error);
                    });
                }
            }
        }
    };
</script>


<style scoped>

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .schart {
        width: 100%;
        height: 700px;
    }
</style>
