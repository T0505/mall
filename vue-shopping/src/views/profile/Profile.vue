<template>
  <left-function :index="0">
    <div class="div-profile-modify">
      <el-form :model="value" label-width="100px" label-position="left">
        <el-form-item label="昵称：">{{ user.nickname }}</el-form-item>
        <el-form-item label="手机号：">{{ user.phone }}
          <span class="span-update-phone orange">修改</span>
        </el-form-item>
        <el-form-item label="账户余额：">¥{{ user.nowMoney }}</el-form-item>
        <el-form-item label="原密码：">
          <el-input v-model="value.origin" clearable :show-password="true" placeholder="请输入原密码"/>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input v-model="value.password" clearable :show-password="true" placeholder="请输入新密码"/>
        </el-form-item>
        <el-form-item label="重复新密码：">
          <el-input v-model="value.re_password" clearable :show-password="true" placeholder="请输入重复新密码"/>
        </el-form-item>
        <el-form-item>
          <el-button color="#ff7800" plain>确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </left-function>
</template>

<script>
import LeftFunction from "@/components/common/Left-function.vue";
import {mapState} from "vuex";
export default {
  name: "Profile",
  components: {
    LeftFunction,
  },
  computed: {
    ...mapState({user:"user"}),
  },
  data() {
    return {
      value: {
        origin: undefined,
        password: undefined,
        re_password: undefined
      },
    };
  },
}
</script>

<style scoped>
.div-profile-modify {
  border: thin solid #cfcfcf;
  padding: 50px 40px;
}
.span-update-phone {
  text-decoration: underline;
  padding-left: 40px;
}
.el-input {
  width: 240px;
}
</style>
