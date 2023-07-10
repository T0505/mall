<template>
  <div class="flex center evenly wrap">
    <ul
      class="ul-goods-item animation pointer relative top"
      v-for="(item, index) in array"
      :style="{ width: width / column + '%' }"
      :key="index"
      @click="$router.push({
        name: 'detail',
        query: {
          id: item.id,
        },
      })"
    >
      <li><img width="200" :src="$url + item.image" alt="" /></li>
      <li class="bold dot">{{ item.keyword }}</li>
      <li class="li-price flex evenly relative">
        <span class="span-online orange bold">{{ item.price }}</span>
        <s class="grey">{{ item.otPrice }}</s>
      </li>
      <li class="deep-grey">
        {{ item.storeInfo }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Goods",
  props: {
    array: {
      default: [],
      type: Array,
    },
    column: {
      default: 4,
    },
    width: {
      default: 100,
    },
  }
};
</script>

<style scoped>
.ul-goods-item {
  line-height: 28px;
  padding: 20px;
  margin: 10px;
}
.ul-goods-item:hover {
  background-color: white;
  top: -5px;
  box-shadow: 5px 5px 20px #cccccc;
}
.span-online {
  font-size: 18px;
}
.li-price::after {
  content: "";
  width: 130px;
  height: 1px;
  background-color: #cccccc;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}
</style>
