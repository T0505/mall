<template>
  <div class="div-header-background">
    <div class="flex between area">
      <el-dropdown>
          <span class="el-dropdown-link">
            欢迎你 {{$store.state.user.nickname}}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出</el-dropdown-item>
            <el-dropdown-item>切换账号</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <ul class="flex ul-header-select">
        <li class="pointer">我的订单</li>
        <li>
          <el-dropdown>
          <span class="el-dropdown-link">
            购物车(<span class="orange">{{0}}</span>)
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          </el-dropdown>
        </li>
        <li>
          <el-dropdown>
            <span class="el-dropdown-link">
              我的
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="$router.push('profile')">个人信息</el-dropdown-item>
                <el-dropdown-item>我的订单</el-dropdown-item>
                <el-dropdown-item>收货地址</el-dropdown-item>
                <el-dropdown-item>钱包充值</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
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
            keyword: value
          }
        });">搜索</button>
      </div>
    </div>
  </div>
</template>

<script>
import vuex from "@/vuex";
import {mapState} from "vuex";
export default {
  name: "Header",
  data() {
    return {
      value: undefined,
    };
  },
  computed: {
    ...mapState({user: "user"}),
  },
}
</script>

<style scoped>
.div-header-background {
  line-height: 48px;
  background-color: #f1f2f5;
}
.button-search-goods {
  background-color: #ff7800;
  padding: 0 20px;
  height: 100%;
  right: 0;
  border-radius:0 3px 3px 0;
}
.div-logo {
  padding: 30px 0;
}
.input-search {
  left: -60px;
}
:deep(.el-input__inner) {
  width: 300px;
}
.el-dropdown {
  line-height: 48px;
  cursor: pointer;
}
:focus-visible {
  outline: none;
}
:deep(.el-dropdown-menu__item):hover {
  background-color: rgba(255,120,0,.2);
  color: #ff7800;
}
:deep(.el-dropdown-menu__item) {
  line-height: 28px;
}
.ul-header-select>li {
  margin-left: 30px;
}
</style>
