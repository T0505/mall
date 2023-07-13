<template>
  <left-function :index="0">
    <div class="div-profile-modify">
      <el-form :model="value" label-width="100px" label-position="left">
        <el-form-item label="昵称：">{{ user.nickname }}</el-form-item>
        <el-form-item label="手机号：">
          <span  v-show="status" >{{ user.phone }}</span>
          <el-input ref="phone" maxlength="11" clearable v-show="!status" v-model="user.phone"/> 
          <span class="span-update-phone orange pointer" v-if="status" @click="updatePhone(false)">修改</span>
          <span class="span-update-phone orange pointer" v-else @click="updatePhone">保存</span>
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
          <el-button color="#ff7800" plain @click="midify">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </left-function>
</template>

<script>
import LeftFunction from "@/components/common/Left-function.vue";
import {mapMutations, mapState} from "vuex";
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
        origin: "",
        password: "",
        re_password: ""
      },
      status: true,
    };
  },
  created() {
    this.$ask.get("userinfo").then(response => this.$store.commit("setUser",response.data));
  },
  methods: {
    ...mapMutations[{setUser: "setUser"}],
    midify() {
      if(this.value.origin.length < 6 || this.value.origin.length > 18 && this.value.password.length < 6 || this.value.password.length  > 18) {
        this.$message.warning("密码长度必须在 6-18 之间");
      } else if(this.value.password !== this.value.re_password) {
        this.$message.warning("两次密码不一致")
      } else {
        this.$ask({
          url: "/user/password",
          method: "post",
          data: {
            newPassword: this.value.password,
            password: this.origin.password,
          },
        }).then(response => console.log(response.msg));
      }
    },
    updatePhone(bool) {
      if(bool) {
        this.$ask({
          url: "user/edit",
          method: "post",
          data: {
            phone: this.user.phone,
          },
        }).then(response => {
          this.$message.success(response.msg);
          this.status = true;
        });
      } else {
        this.status = false;
        this.$refs.phone.focus();
      }
    }
  }
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
.el-input {
  --el-input-focus-border-color:#ff7800;
}

</style>
