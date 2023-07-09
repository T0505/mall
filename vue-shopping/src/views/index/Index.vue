<template>
  <div class="flex">
    <div class="div-menu-category white" v-if="category">
      <bar-menu :array="category"/>
    </div>
    <div>
      <el-carousel class="carousel-width" height="428px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img width="1030" src="../../assets/image/img.png" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
  <h2 class="bold">精品推荐</h2>
  <goods :width="80" :array="bast"/>
  <h2 class="bold">猜你喜欢</h2>
  <goods :width="80" :array="like"/>
</template>

<script>
import BarMenu from "@/components/common/Bar-menu.vue";
import goods from "@/components/public/Goods.vue";
export default {
  name: "Index",
  data() {
    return {
      category: null,
      like: null,
      bast: null,
    };
  },
  created() {
    Promise.all([
      this.$ask.get("/category"),
      this.$ask.get("/index/like"),
      this.$ask.get("/index/bastList"),
    ]).then(item => {
      this.category = item[0].data;
      this.like = item[1].data.slice(0,4);
      this.bast = item[2].data.slice(0,4);
    }).catch(error => console.log(error))

  },
  components: {
    BarMenu,
    goods,
  }
}
</script>

<style scoped>
.div-menu-category {
  background-color: #343434;
  padding: 20px;
  line-height: 32px;
}
.carousel-width {
  width: 1030px;
}
h2 {
  line-height: 48px;
}
</style>
