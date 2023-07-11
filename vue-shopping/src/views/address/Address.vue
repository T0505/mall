<template>
  <left-function :index="2">
    <div class="div-address-construct">
      <div><el-button color="#ff7800" plain>新增收货地址</el-button></div>
      <div class="flex wrap between">
        <ul class="relative ul-element-frame" v-for="element of group" :key="element.id">
          <li class="right">
            设置为默认地址
            <el-switch v-model="element.isDefault" active-color="#ff7800" :inactive-value="0" :active-value="1"/>
          </li>
          <li>收货人：{{element.realName}}</li>
          <li>所在地区：{{element.district}}{{element.province}}{{element.city}}</li>
          <li>详细地址：{{element.detail}}</li>
          <li>手机号：{{element.phone}}</li>
          <li class="li-active-address"></li>
          <li class="flex center">
            <div class="auto pointer">
              <el-icon><Delete /></el-icon>删除
            </div>
            <div class="orange auto pointer  div-modify-icon">
              <el-icon><Edit /></el-icon>修改
            </div>
          </li>
        </ul>
      </div>
    </div>
  </left-function>
</template>

<script>
import leftFunction from "@/components/common/Left-function.vue";
export default {
  name: "Address",
  components: {
    leftFunction,
  },
  data() {
    return {
      group: [],
    }
  },
  methods: {
    init() {
      this.$ask.get("address/list").then(response => {
        this.group = response.data;
        console.log(this.group);
      });
    },
  },
  created() {
    this.init();
  }
}
</script>

<style scoped>
.el-icon {
  margin-right: 5px;
  position: relative;
  top: 3px;
}
.div-address-construct {
  border: thin solid #cfcfcf;
  padding: 14px;
}
.ul-element-frame {
  border: thin solid #cfcfcf;
  line-height: 48px;
  margin-top: 14px;
  width: calc(50% - 14px / 2);
}
.ul-element-frame>li {
  padding: 0 14px;
}
.ul-element-frame>li:last-of-type {
  padding: 0;
  border-top: thin solid #cfcfcf;
}
.div-modify-icon {
  border-left: thin solid #cfcfcf;
}
.li-active-address {
  width: 100px;
  height: 100px;
  position: absolute;
  background-color: #ff7800;
}
</style>
