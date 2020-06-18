<template >
    <div style="margin: 10px">
        <div >
            <div class="word-v-middle">{{articleTitle}}</div>
        </div>
        <div class="main" style="margin-top: 10px">
            <pre class="content">{{articleContent}}</pre>
        </div>

        <div style="margin-top: 10px">
            <textarea class="comments"></textarea>
        </div>

        <div style="margin-top: 10px">
            <input type="button" value="发表评论" @click="postComment" >
        </div>

        <!--    递归加载评论    -->
        <div style="margin-top: 10px">
            <ul >
                <items v-for="(model, index) in replys" :model="model" :key="index"></items>
            </ul>

        </div>
    </div>


</template>

<script>
    import Items from './Reply'
    export default {
        components: { Items },
        data() {
            return {
                articleUuid:"001",
                articleTitle:"《文章标题》",
                articleContent: "文章内容",
                replys:[
                    {
                        articleUuid:"001",
                        id:"1",
                        name:"王也",
                        content:"aaa"
                    },{
                        articleUuid:"001",
                        id:"2",
                        name:"小鬼",
                        content:"bbb",
                        children:[{
                            articleUuid:"001",
                            id:"2.1",
                            name:"大哥",
                            reply:"小鬼",
                            content:"ccc",
                            children:[{
                                articleUuid:"001",
                                id:"2.1.1",
                                name:"小弟",
                                reply:"大哥",
                                content:"ddd",
                            }]
                        },{
                            articleUuid:"001",
                            id:"2.2",
                            name:"爸爸",
                            reply:"小鬼",
                            content:"eee",
                            children:[{
                                articleUuid:"001",
                                id:"2.2.1",
                                name:"妈妈",
                                reply:"爸爸",
                                content:"fff",
                            }]
                        }
                        ]

                    }
                ]
            }

        },
        created() {

            // this.loadComments();
            this.articleContent = "提示条款\n" +
                "        您的信任对我们非常重要，一直以来，平台都致力于为每位用户提供更安全的互联网环境。我们深知个人信息安全的重要性，我们将按照法律法规要求，采取安全保护措施，保护您的个人信息安全可控。鉴此，平台（或简称“我们”）制定本《法律声明与隐私政策》（以下或简称“声明和政策”）并提醒您：\n" +
                "   本政策适用于平台的产品或服务。如关联公司（范围详见定义部分）的产品或服务中使用了平台提供的产品或服务（例如直接使用平台账户登录）但未设独立法律声明与隐私政策的，则本政策同样适用于该部分产品或服务。\n" +
                "   请您注意，本政策和声明不适用于以下情况：\n" +
                "        1）通过我们的服务而接入的第三方服务（包括任何第三方网站）收集的信息；\n" +
                "        2）通过在我们服务中进行广告服务的其他公司或机构所收集的信息。\n" +
                "   在使用的各项服务前，请您务必仔细阅读并透彻理解本《法律声明与隐私政策》，在确认充分理解并同意后方使用相关产品和服务。一旦您开始使用平台服务，将被视为对本声明和政策内容的接受和认可。\n" +
                "   法律声明";
        },
        methods: {
            loadComments() { // 从本地的 localStorage 中，加载评论列表
                var list = JSON.parse(localStorage.getItem('cmts') || '[]')
                this.list = list
            }
        }
    };
</script>

<style type="text/css">
    .main {
        background-color: rgba(248, 248, 255 0.44);
        /*边框*/
        border: solid 1px rgba(248, 248, 255 0.68);
        /*边角弧度*/
        border-radius: 10px;
        /*阴影*/
        -moz-box-shadow: 2px 2px 5px #333333;
        -webkit-box-shadow: 2px 2px 5px #333333;

    }
    .comments {
        width:100%;/*自动适应父布局宽度*/
        overflow:auto;
        word-break:break-all;
        /*在ie中解决断行问题(防止自动变为在一行显示，主要解决ie兼容问题，ie8中当设宽度为100%时，文本域类容超过一行时，
        当我们双击文本内容就会自动变为一行显示，所以只能用ie的专有断行属性“word-break或word-wrap”控制其断行)*/
    }
    .word-v-middle {
        margin-bottom: 0;
        font-size: 50px;
        min-height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 31px;
        margin-top: 5px;
        color: #000000;
        white-space: normal;
    }
    pre {
    white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -o-pre-wrap;
        *word-wrap: break-word;
        *white-space : normal ;
    }

</style>
