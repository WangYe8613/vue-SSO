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

    var hasToken = false;
    var axios = require('axios')
    axios.defaults.baseURL = "http://47.93.44.20:8090"
    export default {
        name: 'dashboard',
        data() {
            return {
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
        mounted() {
            this.authorizationValidate();
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
            getToken() {
                var token = "";
                var cookieArrary = document.cookie.split('; '); //切割
                for (var i = 0; i < cookieArrary.length; i++) {
                    // indexOf返回某个指定的字符串值在字符串中首次出现的位置，用于判断是否包含子串"authToken"
                    var index = cookieArrary[i].indexOf("authToken");
                    if (index >= 0) {
                        var token = cookieArrary[i].slice(index + "authToken=".length);
                        break;
                    }
                }
                return token;
            },
            authorizationValidate() {
                var token = this.getToken();
                if (token == "") {
                    this.$router.push({
                        name: 'login',
                    });
                } else {
                    axios({
                        method: 'get', //请求方式
                        url: '/authorization/validate', //api对应url，要和后端设置的一致
                        params: { //传参
                            authToken: token
                        }
                    }).then(response => { //获取http响应数据
                        var responseInventory = response.data.inventory; //返回错误码
                        var responseSuccess = response.data.code; //返回对象
                        var responseMessage = response.data.message; //返回信息

                        if (responseInventory == null || responseInventory.validate == false) {
                            this.$router.push('/login');
                        } else {
                            hasToken = true;
                        }
                    }).catch(error => {
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
