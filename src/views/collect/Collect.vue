<template>
    <left-function :index="$route.query.category === 'foot'?5:4">
      <div class="div-box">
        <ul class="flex wrap relative ul-status-switch">
            <li :class="index-i?'':'orange'" class="pointer" v-for="(element,i) of status" :key="i"
                @click="index = i">{{element}}</li>
            <li :style="{left: 20 + index * 96 + 'px'}" class="absolute animation li-active-status"/>
            <li class="auto right">
                <ul v-if="is" class="flex ul-function-operate">
                    <li><el-checkbox v-model="isAll" @change="$refs.item.array.forEach(item => item.selected = isAll)">全选</el-checkbox></li>
                    <li @click="batchRemote">{{ title }}</li>
                    <li><el-button color="#ff7800" class="white" @click="$refs.item.batch = is=false">保存</el-button></li>
                </ul>
                <el-button v-else color="#ff7800" class="white" @click="$refs.item.batch = is=true">批量管理</el-button>
            </li>
        </ul>
        <item v-if="array" :title="title" @isAllSelected="changeIsAll" :array="array" ref="item"/>
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
            status: [],
            index: 0,
            array: [],
            is: false,
            isAll: false,
            title: undefined,
        };
    },
    created() {
       this.init(this.$route.query.category);
    },
    methods: {
      changeIsAll(is) {
        this.isAll = is;
      },
      init(type) {
        this.title =  "删除" + this.$route.query.title;
        this.status = [this.$route.query.title + "商品"];
        this.$ask({
            url:"collect/user",
            params: {
                type,
            },
        }).then(response => this.array = response.data);
      },
      batchRemote() {
       
        const ids = this.$refs.item.array.filter(item => item.selected).map(item => item.pid).join(",");
        const category =  this.$route.query.category;
        this.$ask({
          url: "collect/dels/" + ids,
          method: "post",
          data: {
            category,
          },
        }).then(response => {
          this.$message.success(response.msg);
          this.init(category);
        });
      }
    },
    watch: {
      $route(to) {
        this.init(to.query.category)
      }
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
  width: 56px;
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
:deep(.el-checkbox__input.is-checked+.el-checkbox__label) {
  color: #ff7800;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #ff7800;
  border-color: #ff7800;
}
:deep(.el-checkbox__inner):hover {
  border: thin solid #ff7800;
}
</style>