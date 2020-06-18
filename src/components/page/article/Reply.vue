<!--子组件代码-->
<template>
    <div class="main" style="margin-top: 10px">
        <div style="height: auto">{{ model.id }}楼    {{ model.name }}<a v-if="model.reply">  回复  {{model.reply}}</a></div>
        <pre class="margin">{{ model.content }}</pre>
        <input type="button" value="回复" @click="postComment">
        <div v-if="isFolder">
            <items style="margin-left:5px" v-for="(item, index) in model.children" :model="item" :key="index"></items>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        // 组件递归必要条件，name属性
        name: 'items',
        props: ['model'],
        data() {
            return {
                // 控制子列表的显示隐藏
                open: false
            }
        },
        computed: {
            // 是否还有子列表需要渲染，作为v-if的判断条件
            isFolder() {
                return this.model.children && this.model.children.length
            }
        },
        methods: {
        }
    }
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
    .margin {
        background-color: #ffffff;
        margin: 5px;
    }
    pre {
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -o-pre-wrap;
        *word-wrap: break-word;
        *white-space : normal ;
    }

</style>
