<template>
  <div class="area">
    <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false"
             active-text-color="#ff7800">
      <el-menu-item index="0">欢迎你 {{name}}</el-menu-item>
      <div class="grow"/>
      <el-menu-item index="1">我的订单</el-menu-item>
      <el-sub-menu index="2">
        <template #title>购物车(<span class="orange">{{count}}</span>)</template>
        <el-menu-item index="2-1">商品</el-menu-item>
        <el-menu-item index="2-2">商品</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>我的</template>
        <el-menu-item index="3-1">收藏商品</el-menu-item>
        <el-menu-item index="3-1">账号密码</el-menu-item>
        <el-menu-item index="3-1">钱包充值</el-menu-item>
        <el-menu-item index="3-2">浏览过的</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <div class="div-logo flex between">
      <div class="pointer" @click="$router.push('/')"><img src="../../assets/image/img_1.png" alt=""></div>
      <div class="flex">
        <el-input
            v-model="value"
            size="large"
            placeholder="请输入搜索商品"
            :prefix-icon="Search"
        />
        <button class="button-search-goods white pointer">搜索</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "0",
      value: null,
    };
  },
  props: {
    name: {
      default:"管理员",
      type: String,
    },
    count: {
      default: 0,
    }
  }
}
</script>

<style scoped>
.button-search-goods {
  background-color: #ff7800;
  padding: 0 20px;
  outline: none;
  border: none;
  width: 80px;
  border-radius:0 3px 3px 0;
}
:deep(.el-menu--horizontal) {
  border:none;
}
.div-logo {
  padding: 30px 0;
}
</style>
