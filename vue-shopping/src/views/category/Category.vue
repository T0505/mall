<template>
  <div class="div-category-background">
    <div class="area">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: 'category' }">全部结果</el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="orange">{{!value?"全部":value.cateName}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <main>
        <div class="div-category-sort">排序：
          <span :class="!active?'orange':''" @click="init(active = 0)">默认</span>
          <span :class="active?'orange':''" :style="active === 1 ? {
            '--top':'#ff7800','--bottom': '#f0f0f0',
            } : active === 2 ? {'--bottom':'#ff7800','--top': '#f0f0f0',
            }:{
            '--top': '#f0f0f0',
            '--bottom': '#f0f0f0',
          }" class="span-price-sort relative" @click="init(active = (active === 1? 2: 1))">价格</span>
        </div>
        <div>
          <h2 v-if="value" class="center">{{value.cateName}}</h2>
        </div>
        <goods :array="content" :column="4"/>
        <el-pagination class="pagination-bottom" background layout="prev, pager, next" :total="total"
                       :default-page-size="limit" @current-change="jump"/>
      </main>
    </div>
  </div>
</template>

<script>
import goods from "@/components/public/Goods.vue";
export default {
  name: "Category",
  data() {
    return {
      active: 0,
      value: this.$route.query.value && JSON.parse(this.$route.query.value),
      limit: 12,
      page: 1,
      total: 1,
      content: [],
    };
  },
  components: {
    goods
  },
  created() {
    this.init();
  },
  methods: {
    init(order) {
      const sort = !order ? undefined : order===1?"asc":"desc", params = {
        limit: this.limit,
        page: this.page,
        priceOrder: sort,
      }
      if(this.value) {
        params.sid = this.value.id;
      }
      this.$ask({
        url: "products",
        method: "get",
        params,
      }).then(response => {
        this.total = response.data.totalElements;
        this.content = response.data.content;
      }).catch(error => console.log(error));
    },
    jump(page) {
      this.page = page;
      this.init(this.active);
    }
  },
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
  .pagination-bottom {
    justify-content: right;
    padding: 40px 0;
  }
  :deep(.is-active) {
    background-color: #ff7800!important;
  }
  :deep(.el-pager li):hover {
    color: #ff7800 !important;
  }
</style>
