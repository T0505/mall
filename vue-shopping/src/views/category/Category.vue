<template>
  <div class="div-category-background">
    <div class="area">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: 'category' }">全部结果</el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="orange">{{$route.query.value}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
}
</script>

<style scoped>
  .div-category-background {
    background-color: #f0f0f0;
    padding-bottom: 40px;
    line-height: 36px;
  }
  :deep(.is-link):hover {
    color: #ff7800;
  }
  .el-breadcrumb {
    line-height: 52px;
  }
</style>
