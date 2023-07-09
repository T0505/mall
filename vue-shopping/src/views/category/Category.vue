<template>
  <div class="div-category-background">
    <div class="area">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: 'category' }">全部结果</el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="orange">{{$route.query.value}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <main>
        <div class="div-category-sort">排序：
          <span :class="!active?'orange':''">默认</span>
          <span :style="active === 2 ? {'--top':'#ff7800'} : active === 3 ? {'-bottom':'#ff7800'}:{
            '--top': '#f0f0f0',
            '--bottom': '#f0f0f0',
          }" class="span-price-sort relative">价格</span>
        </div>
        <div>
          <h2 v-if="$route.query.value" class="center">{{$route.query.value}}</h2>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      active: 0,
    }
  }
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
  .el-breadcrumb,.div-category-sort {
    line-height: 52px;
  }
  main {
    background-color: white;
    padding: 0 20px;
  }
  .div-category-sort>span {
    padding: 0 10px;
    cursor: pointer;
  }
  .span-price-sort::after,
  .span-price-sort::before {
    content: "";
    position: absolute;
    right: -6px;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    transform: translateY(-50%);
  }
  .span-price-sort::after {
    border-bottom: 6px solid var(--top);
    top: 6px;
  }
  .span-price-sort::before {
    border-top: 6px solid var(--bottom);
    top: 16px;
  }
  h2 {
    line-height: 80px;
  }
</style>
