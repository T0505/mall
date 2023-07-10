<template>
  <div class="bg">
    <div class="box flex center absolute column">
      <div class="til flex">
        <div class="leftLo"></div>
        {{ type ? "注册" : "登录" }}
        <div class="rightLo"></div>
      </div>

      <div class="in flex column" v-if="!type">
        <p class="left">用户名</p>
        <input type="text" v-model="username" />
      </div>

      <div class="in flex column" v-if="!type">
        <p class="left">密码</p>
        <input type="password" v-model="loginPassword" />
      </div>

      <div class="in flex column" v-if="type">
        <p class="left">手机号码</p>
        <input type="text" v-model="phone" />
      </div>

      <div class="in flex column relative" v-if="type">
        <p class="left">验证码</p>
        <input type="text" v-model="temp" />
        <el-button
          class="absolute yan pointer"
          @click="code"
          color="#eeeeed"
          size="large"
        >
          {{ codeName }}
        </el-button>
      </div>

      <div class="in flex column" v-if="type">
        <p class="left">昵称</p>
        <input type="text" v-model="names" />
      </div>

      <div class="in flex column" v-if="type">
        <p class="left">密码</p>
        <input type="text" v-model="password" />
      </div>

      <div class="in flex column" v-if="type">
        <p class="left">确认密码</p>
        <input type="password" v-model="isPassword" />
      </div>

      <div class="right">
        <a href="#" class="change" @click="type = !type">{{
          type ? "登录" : "注册"
        }}</a>
      </div>

      <div class="btn pointer" @click="loginRe">
        {{ type ? "注册" : "登录" }}
      </div>
      <div class="left flex" v-if="!type">
        <el-checkbox v-model="qiCheck" size="large" id="lo" fill="#000000" />
        <label for="lo">七天免登录</label>
      </div>

      <div class="left flex" v-if="type">
        <!-- <input type="checkbox" id="xie" v-model="xieCheck" /> -->
        <el-checkbox v-model="xieCheck" size="large" id="xie" fill="#000000" />
        <label for="xie">阅读并同意</label>
        <span class="pointer orange" @click="dialogVisible = true"
          >《用户协议》</span
        >
      </div>
    </div>
    <el-dialog v-model="dialogVisible" title="用户协议" width="30%">
      <span>这是用户协议</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="xieCheck = dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="xieCheck = !(dialogVisible = false)"
          >
            同意
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
export default {
  name: "Login",
  data() {
    return {
      checked: "",
      type: false,
      dialogVisible: false,
      username: "",
      loginPassword: "",
      phone: "",
      temp: "",
      names: "",
      password: "",
      isPassword: "",
      xieCheck: false,
      qiCheck: false,
      codeName: "获取验证码",
    };
  },
  methods: {
    code() {
      // console.log(111);
      let reg = /^1[13456789]\d{9}$/;
      if (!reg.test(this.phone)) {
        this.$message.error("手机号格式错误");
        return;
      }
      const params = {
        url: "/register/verify",
        data: {
          phone: this.phone,
        },
        method: "post",
      };
      this.$ask(params).then((res) => {
        if (res.status === 200) {
          this.codeName = res.data;
        } else if (res.status === 500) {
          this.$message.warning(res.msg);
          this.codeName = res.msg.substring(res.msg.length - 6);
        }
      });
    },
    loginRe() {
      // 注册
      if (this.type) {
        let reg = /^1[13456789]\d{9}$/;
        if (!this.xieCheck) {
          return this.$message.warning("请阅读并同意用户协议");
        }
        if (this.password === "") {
          return this.$message.warning("密码不能为空");
        }
        if (this.password !== this.isPassword) {
          return this.$message.warning("两次输入的密码不一致");
        }
        if (this.codeName !== this.temp) {
          return this.$message.warning("验证码错误");
        }
        if (this.names === "") {
          return this.$message.warning("请输入完整信息");
        }
        if (!reg.test(this.phone)) {
          return this.$message.warning("手机号格式有误");
        }
        const params = {
          url: "/register",
          data: {
            account: this.phone,
            nickname: this.names,
            captcha: this.temp,
            password: this.password,
          },
          method: "post",
        };
        this.$ask(params).then((res) => {
          if (res.status === 200) {
            this.$message.warning(res.msg);
            this.type = false;
          } else if (res.status === 500) {
            this.$message.warning(res.msg);
          }
        });
      }
      //  登录
      else {
        if (this.username === "" || this.loginPassword === "") {
          return this.$message.warning("账号和密码必填");
        }
        const params = {
          url: "login",
          data: {
            username: this.username,
            password: this.loginPassword,
          },
          method: "post",
        };
        this.$ask(params).then((res) => {
          if (res.status !== 200) {
            this.$message.warning(res.msg);
          } else {
            document.cookie = "token=" + res.data.token;
            if (this.qiCheck) {
              document.cookie = "expires=" + 7;
            } else {
              document.cookie = "expires=" + 1;
            }
            this.$ask.get("userinfo").then(response => {
              this.$store.commit("setUser",response.data);
              this.$message.success(res.msg);
              this.$router.push({ path: "/" });
            })
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.el-checkbox {
  height: 14px;
  margin-right: 8px;
}

.bg {
  background: url("@/assets/loginBg.jpg") no-repeat;
  height: 100vh;
}

.yan {
  padding: 0 10px;
  height: 45px;
  bottom: 30px;
  right: 0;
}

.in {
  justify-content: start;
}

.box {
  padding: 20px 60px;
  margin: 0 auto;
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.leftLo {
  margin-right: 20px;
  width: 120px;
  height: 5px;
  background: linear-gradient(to right, #fff, #ff7800);
}

.rightLo {
  margin-left: 20px;
  width: 120px;
  height: 5px;
  background: linear-gradient(to left, #fff, #ff7800);
}

.til {
  font-size: 32px;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
}

input[type="checkbox"] {
  width: 23px;
  margin-right: 10px;
  margin-bottom: 20px;
  /* background: orange; */
}

input[type="text"],
input[type="password"] {
  outline: none;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #cfcfcf;
  width: 450px;
  height: 30px;
}
p {
  font-size: 16px;
}

.change {
  border-bottom: 1px solid #666;
}

.btn {
  margin-top: 30px;
  margin-bottom: 50px;
  padding: 14px 0;
  width: 450px;
  background-color: #ff7800;
  color: #fff;
  font-size: 28px;
}
</style>
