<template>
    <left-function :index="4">
      <div class="div-box">
        <ul class="flex relative ul-status-switch">
            <li :class="index-i?'':'orange'" class="pointer" v-for="(element,i) of status" :key="i"
                @click="index = i">{{element}}</li>
            <li :style="{left: 20 + index * 96 + 'px'}" class="absolute animation li-active-status"/>
            <li class="auto right">
                <!-- <el-button color="#ff7800" class="white">批量修改</el-button> -->
                <ul class="flex ul-function-operate">
                    <li><el-checkbox/>全选</li>
                    <li>取消收藏</li>
                    <li><el-button color="#ff7800" class="white">保存</el-button></li>
                </ul>
            </li>
        </ul>
        <item v-if="array" :array="array"/>
      </div>
    </left-function>
</template>
<script>
import leftFunction from "@/components/common/Left-function.vue";
import item from "./Item.vue";
export default {
    name: "Collect",
    components: {
        leftFunction,
        item,
    },
    data() {
        return {
            status: ["收藏的商品"],
            index: 0,
            array: [],
        };
    },
    created() {
        this.$ask({
            url:"collect/user",
            params: {
                type: "foot",
            },
        }).then(response => this.array = response.data)
    }
}
</script>
<style scoped>
.el-checkbox {
    margin-right: 5px;
}
.div-box {
  height: 100%;
  border: thin solid #cfcfcf;
}
.ul-status-switch {
  line-height: 42px;
  border-bottom: thin solid #cfcfcf;
}
.ul-status-switch>li {
  padding: 0 20px;
}
.li-active-status {
  padding: 0;
  width: 70px;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #ff7800;
}
.ul-function-operate {
  justify-content: right;
}
.ul-function-operate>li {
  margin-left: 40px;
  cursor:pointer;
}
</style>