<template >
    <div>
        <el-row>
            <el-table :data="list" @row-click="jumpToArticle">
                <el-table-column prop="read_num" label="阅览数"></el-table-column>
                <el-table-column prop="title" label="文章标题">
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [
                    {
                        read_num: 0,
                        title: "a",
                        articleUuid: "001"
                    }, {
                        read_num: 11,
                        title: "b",
                        articleUuid: "002"
                    }
                ],
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.$axios.get()
                    .then(res => {
                        this.list = res.data.Data
                    })
            },
            jumpToArticle(val) {
                localStorage.setItem("articleUuid",val.articleUuid);
                this.$router.push('/article');
            }
        }
    }
</script>