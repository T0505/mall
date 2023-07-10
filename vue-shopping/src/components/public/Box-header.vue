<template>
  <div class="div-header-background">
    <div class="area">
      <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false"
               active-text-color="#ff7800">
        <el-sub-menu index="0">
          <template #title>欢迎你 {{name}}</template>
          <el-menu-item index="4-1">退出</el-menu-item>
          <el-menu-item index="4-2">我的</el-menu-item>
        </el-sub-menu>
        <div class="grow"/>
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">我的订单</el-menu-item>
        <el-sub-menu index="3">
          <template #title>购物车(<span class="orange">{{count}}</span>)</template>
          <el-menu-item index="3-1">商品</el-menu-item>
          <el-menu-item index="3-2">商品</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>我的</template>
          <el-menu-item index="4-1">收藏商品</el-menu-item>
          <el-menu-item index="4-2">账号密码</el-menu-item>
          <el-menu-item index="4-3">钱包充值</el-menu-item>
          <el-menu-item index="4-4">浏览过的</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
  <div class="area">
    <div class="div-logo flex between">
      <div class="pointer" @click="$router.push('/');"><img src="../../assets/image/img_1.png" alt=""></div>
      <div class="flex relative">
        <el-input class="input-search absolute"
            v-model="value"
            size="large"
            placeholder="请输入搜索商品"
            prefix-icon="Search"
        />
        <button class="button-search-goods white pointer absolute" @click="$router.push({
          name: 'category',
          query: {
            keyword: value,
          },
        });">搜索</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "1",
      value: undefined,
    };
  },
  props: {
    name: {
      default:"管理员",
      type: String,
    },
    count: {
      default: 0,
    },
  },
}
</script>

<style scoped>
.el-menu--horizontal,.div-header-background {
  background-color: #f1f2f5;
}
.button-search-goods {
  background-color: #ff7800;
  padding: 0 20px;
  height: 100%;
  right: 0;
  border-radius:0 3px 3px 0;
}
:deep(.el-menu--horizontal) {
  border:none;
}
.div-logo {
  padding: 30px 0;
}
.el-menu--horizontal>.el-menu-item:hover,
:deep(.el-menu--horizontal>.el-sub-menu .el-sub-menu__title):hover {
  background-color: rgba(255,120,0,.1);
  color: #ff7800;
}
:deep(.el-input__wrapper) {
  box-shadow: none;
  border: thin solid #ff7800;
  border-right: none;
}
.input-search {
  left: -60px;
}
:deep(.el-input__inner) {
  width: 280px;
}
</style>
