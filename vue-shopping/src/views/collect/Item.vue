<template>
  <ul class="ul-item-layout flex wrap center">
    <li v-for="item of array" :key="item.pid">
      <div><img :src="$url+item.image" alt=""></div>
      <div class="div-descript-product">
        <div class="dot">{{ item.storeName }}</div>
        <div class="orange">￥{{ item.price }}</div>
      </div>
      <div class="flex center div-operate-button">
        <div>取消收藏</div>
        <div>查看详情</div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: "Item",
  props: {
    column: {
      default: 5,
    },
    array: {
      defautl: []
    }
  }
}
</script>
<style scoped>
img {
  vertical-align: middle;
  width: 100%;
  border-bottom: thin solid #cfcfcf;
}
.ul-item-layout {
  padding: 14px;
  line-height: 42px;
}
.ul-item-layout>li {
  width: calc(20% - 12px);
  margin:0 15px 15px 0;
  border: thin solid #cfcfcf;
}
.ul-item-layout>li:nth-of-type(5n + 0) {
  margin-right: 0;
}
.div-descript-product {
  padding: 0 20px;
}
.div-operate-button {
  border-top: thin solid #cfcfcf;
}
.div-operate-button>div {
  flex:auto;
  cursor: pointer;
}
.div-operate-button>div:first-of-type {
  border-right: thin solid #cfcfcf;
}
</style>
