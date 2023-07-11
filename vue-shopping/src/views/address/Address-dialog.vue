<template>
  <div>
    <el-dialog class="center" v-model="visible" :title="title" width="40%">

    <el-form :model="form" label-width="100px" class="form-fill">
      <el-form-item label="所在地区：">
        <el-input/>
      </el-form-item>
      <el-form-item label="详细地址：">
        <el-input :rows="2" type="textarea"/>
      </el-form-item>
      <el-form-item label="收货人姓名：">
        <el-input/>
      </el-form-item>
      <el-form-item label="手机号码：">
        <el-input/>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox>设置为默认地址</el-checkbox>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" color="#ff7800" class="white" @click="visible = false">确定</el-button>
        <el-button color="#ff7800" plain @click="visible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Address-dialog",
  data() {
    return {
      visible: true,
      form: {}
    };
  },
  props: {
    title: {
      default: undefined,
    }
  }
}
</script>

<style scoped>
.form-fill {
  padding: 0 40px;
}
:deep(.el-dialog__body),:deep(.el-dialog__footer){
  background-color: #f0f0f0 !important;
}
:deep(.el-checkbox__input.is-checked+.el-checkbox__label) {
  color: #ff7800;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #ff7800;
  border-color: #ff7800;
}
</style>
