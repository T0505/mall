<template>
  <div>
    <el-dialog class="center" v-model="visible" :title="title" width="40%">
    <el-form :model="form" ref="form" :rules="rules" label-width="110px" class="form-fill">
      <el-form-item label="所在地区：" prop="region">
        <el-cascader :props="{value:'label',label:'label'}" v-model="form.region" placeholder="请输入所在地区" :options="options"/>
      </el-form-item>
      <el-form-item label="详细地址：" prop="detail">
        <el-input v-model="form.detail" :rows="2" type="textarea" placeholder="请输入详细地址"/>
      </el-form-item>
      <el-form-item label="收货人姓名：" prop="realName">
        <el-input v-model="form.realName" placeholder="请输入收货人姓名"/>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号码"/>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.isDefault" :true-label="1" :false-label="0">设置为默认地址</el-checkbox>
      </el-form-item>
      <el-form-item>
        <span class="dialog-footer">
          <el-button type="primary" color="#ff7800" class="white" @click="insert()">确定</el-button>
          <el-button color="#ff7800" plain @click="visible = false">取消</el-button>
        </span>
      </el-form-item>
    </el-form>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Address-dialog",
  data() {
    return {
      visible: false,
      form: {},
      rules: {
        realName: [
            {required:true,message:"请填写收货人姓名",trigger: "blur"},
            {min:2,max:8,message:"长度在2-8之间",trigger: "blur"},
        ],
        region: [
            {required: true, message:"请选择地址", trigger: "blur"},
        ],
        detail: [
          {required:true,message:"请填写详细地址",trigger: "blur"}
        ],
        phone: [
          {required:true,message: "请输入手机号",trigger:"blur"},
          {min:11,max:11,message:"手机号长度为11",trigger:"blur"},
        ]
      },
      options: [],
      title: undefined,
    };
  },
  created() {
    this.$ask.get("city_list").then(response => this.options = response.data);
  },
  methods: {
    insert() {
      this.$refs.form.validate(valid => {
        if(valid) {
          const data = {
            address: {
              province: this.form.region[0],
              city:this.form.region[1],
              district:this.form.region[2],
            },
            detail: this.form.detail,
            is_default: this.form.isDefault === 1,
            phone:this.form.phone,
            real_name: this.form.realName,
            id: this.form.id,
          };
          this.$ask({
            url: "address/edit",
            method: "post",
            data,
          }).then(response => {
            this.$message.success(response.msg);
            this.$parent.init();
            this.visible = false;
          });
        } else {
          return false;
        }
      });
    },
    edit(o) {
      this.$ask({
        url: "address/edit",
        method: "post",
        data: {
          address: {
            province: o.province,
            city:o.city,
            district:o.district,
          },
          detail: o.detail,
          is_default: o.isDefault === 1,
          phone:o.phone,
          real_name: o.realName,
          id: o.id,
        }
      }).then(response => {
        this.$message.success(response.msg);
        this.$parent.init();
      });
    }
  }
}
</script>

<style scoped>
.form-fill {
  padding: 0 40px;
}
:deep(.el-dialog__body){
  background-color: #f0f0f0 !important;
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
.el-button {
  padding: 0 40px;
}
:deep(.el-cascader) {
  flex:auto !important;
}
</style>