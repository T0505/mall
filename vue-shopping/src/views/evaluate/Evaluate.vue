<template>
    <div class="area flex">
        <div class="leftF flex column">
            <img :src="$url + 'file/pic/f287662b-3f86-43ac-bf71-df5db2b97b65_source.jpg'" width="250">
            <p>￥20.00</p>
            <span>【纳米抗指纹】*2片</span>
        </div>
        <div class="rightF">
            <div class="title">填写商品评价</div>
            <el-form label-width="120px" label-position="left">
                <el-form-item style="white-space:nowrap" label="商品评分">
                    <el-rate v-model="goodsValue" size="large" />
                </el-form-item>
                <el-form-item label="服务评分">
                    <el-rate v-model="serveValue" size="large" />
                </el-form-item>
                <el-form-item label="评价晒单">
                    <el-input v-model="desc" :rows="8" resize="none" type="textarea" placeholder="请输入您的评语" />
                </el-form-item>
                <el-form-item label="">
                    <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="maxFlie" :on-change="up">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        <template #file="{ file }">
                            <div>
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                <span class="el-upload-list__item-actions">
                                    <span v-if="!disabled" class="el-upload-list__item-delete">
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                    </span>
                                </span>
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <p>共<span class="orange">0</span>张，还可以上传<span class="orange">{{ maxFlie }}</span>张</p>
                </el-form-item>
            </el-form>
            <div class="btn flex">
                <el-button color="#ff7800" class="submitBtn" @click="btn">提交评价</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Evaluate',
    data() {
        return {
            goodsValue: '',
            serveValue: '',
            desc: '',
            disabled: '',
            maxFlie: 5,
            pList: []
        }
    },

    methods: {
        up(flie, flies) {
            this.pList = []
            console.log(flie)
            console.log(flies)
            flies.forEach(element => {
                this.pList.push("/file/" + element.name);
            });
            console.log(this.pList);
        },
        btn() {
            console.log(this.goodsValue)
            console.log(this.serveValue)
            console.log(this.desc)
            const params = {
                comment: this.desc,
                pics: this.pList.join(","), 
                productScore: this.goodsValue,
                serviceScore: this.serveValue,
                // unique: "9a22b8302e124a6c8f2fc665458d5280"
            }
        }
    }
}
</script>

<style scoped>
.title {
    padding: 10px 0px;
    margin: 20px 0;
    border-bottom: 1px dashed #cfcfcf;
    color: black;
}

.btn {
    align-items: center;
}

.submitBtn {
    color: #fff;
    margin: 0 auto;
}

:deep(.el-upload) {
    width: 100px;
    height: 100px;
}

.leftF,
.rightF {
    border: 1px solid black;
}

.leftF {
    flex: 1;
    align-items: center;
    justify-content: space-around;
    padding: 150px 0;
}

.leftF p {
    margin: 20px 0;
}

.rightF {
    flex: 3;
    padding: 10px 30px;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>