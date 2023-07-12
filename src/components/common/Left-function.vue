<template>
  <div class="div-box-profile area flex between">
    <ul class="relative">
      <li :class="index===i?'orange':''" class="pointer nowrap" v-for="(v,i) of menu" :key="i"
          @click="$router.push(menu[i].uri)">
        {{v.title}}</li>
      <div :style="{top: 14 + index * 48 + 'px'}" class="div-active-menu absolute"/>
    </ul>
    <div class="auto">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      menu: [{title:"个人信息",uri:"profile"},
             {title:"我的订单",uri:"order"},
             {title:"收货地址",uri:"address"},
             {title:"钱包充值",uri:"wallet"},
             {title:"我的收藏",uri:"collect"},
             {title:"浏览足迹",uri:"footprint"}],
    };
  },
  props: {
    index: {
      default: 0,
    }
  }
}
</script>

<style scoped>
.div-box-profile {
  margin-bottom: 60px;
}
.div-box-profile>ul {
  border: thin solid #cfcfcf;
  padding: 0 60px;
  line-height: 48px;
  margin-right: 14px;
  min-height: 452px;
}
.div-active-menu {
  left: 0;
  width: 3px;
  height: 18px;
  background-color: #ff7800;
  top: 0;
  transition: top .3s ease;
}
</style>
