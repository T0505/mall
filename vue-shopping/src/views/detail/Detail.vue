<template>
  <div class="area flex between center">
    <ul v-if="goods">
      <li class="li-click-scroll white pointer" @click="active && active++">
        <el-icon><ArrowUpBold /></el-icon>
      </li>
      <li class="scroll-small hidden">
        <ul class="ul-small-scroll relative animation" :style="{top: active * 120 + 120 + 'px'}">
          <li v-for="(item,index) of goods.storeInfo.sliderImageArr" :key="index">
            <img style="margin: 10px 0;" :style="{border: Math.abs(active)-index?'none':'thin solid #ff7800'}"
                 width="100" :src="$url+item" alt="">
          </li>
        </ul>
      </li>
      <li class="li-click-scroll white pointer" @click="active+this.goods.storeInfo.sliderImageArr.length-1 && active--">
        <el-icon><ArrowDownBold /></el-icon>
      </li>
    </ul>
    <ul v-if="goods" class="hidden scroll-big ul-big-scroll">
      <li class="li-big-scroll relative animation flex" :style="{left: active * 360 + 'px'}">
        <div v-for="(item,index) of goods.storeInfo.sliderImageArr" :key="index">
          <img width="360" :src="$url+item" alt="">
        </div>
      </li>
    </ul>
    <ul v-if="goods && now" class="ul-goods-text left auto">
      <li><h2>{{goods.storeInfo.keyword}}</h2></li>
      <li class="grey">{{goods.storeInfo.storeInfo}}</li>
      <li class="li-price">价格：
        <span class="orange span-old-price">¥{{now.price}}</span>
        <s class="grey">¥{{now.otPrice}}</s>
      </li>
      <li v-for="(item,i) of goods.productAttr" :key="item.id">
        <div>{{item.attrName}}</div>
        <ul class="flex ul-attr-list">
          <li v-for="(v,index) of item.attrValue" :key="index" @click="elect(i,index)"
              :class="index === array[i] ? 'is-active white': ''" >
            {{v.attr}}</li>
        </ul>
      </li>
      <li>数量</li>
      <li>
        <el-input-number v-model="number" :min="1" :max="now.stock || 1" /> 库存
        <span class="orange">{{now.stock}}</span> 件
      </li>
      <li class="li-bottom-function flex">
        <el-button color="#ff7800" plain>加入购物车</el-button>
        <el-button color="#ff7800">购物</el-button>
        <div class="div-collect center" :style="goods.storeInfo.userCollect?{
            backgroundColor: '#ff7800',
            border: 'none',
            color: 'white',
          }:{}">
          <div><el-icon style="font-size: 14px;"><Star /></el-icon></div>
          <div>收藏</div>
        </div>
      </li>
    </ul>
  </div>
  <div v-html="description">

  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      goods: null,
      active: 0,
      number: 0,
      array: [],
      now: null,
      description: null,
    };
  },
  created() {
    this.$ask.get("product/detail/"+this.$route.query.id).then(response => {
      this.goods = response.data;
      this.array = new Array(this.goods.productAttr.length).fill(0).map(() => 0);
      this.elect(0,0);
      const string = this.goods.storeInfo.description,index = string.search('src="');
      this.description = insertStr(string,index + 5,this.$url.substring(0,this.$url.length-1));

    }).catch(error => console.log(error));
    function insertStr(source, start, string) {
      return source.slice(0, start) + string + source.slice(start)
    }
  },
  methods: {
    elect(o,v) {
      this.array[o] = v;
      const temp = [];
      this.goods.productAttr.forEach((item,index) => temp.push(item.attrValue[this.array[index]].attr));
      this.now = this.goods.productValue[temp.join(",")] || this.goods.productValue[temp.reverse().join(",")];
    }
  }
}
</script>

<style scoped>
.li-click-scroll {
  line-height: 30px;
  display:inline-block;
  padding: 0 10px;
  background-color: gray;
}
.scroll-small {
  height: 360px;
}
.scroll-big {
  width: 360px;
}
.ul-big-scroll {
  margin: auto 140px;
}
.ul-small-scroll {
  top: 0;
}
.li-big-scroll {
  left: 0
}
.ul-goods-text {
  line-height: 48px;
}
.li-price {
  background-color: #fef9f3;
  padding: 0 20px;
}
.span-old-price {
  font-size: 24px;
  margin-right: 5px;
}
.ul-attr-list>li{
  line-height: 28px;
  margin-right: 10px;
  background-color: #f0f0f0;
  padding: 0 10px;
  cursor: pointer;
}
.li-bottom-function {
  margin: 20px 0;
}
.li-bottom-function>.el-button:nth-of-type(2) {
  color: white !important;
}
.li-bottom-function>.el-button {
  border-radius: 0;
}
.div-collect {
  line-height: 1;
  border: thin solid #f0f0f0;
  padding: 0 5px;
  margin-left: 12px;
  cursor: pointer;
  font-size: 8px;
}
.is-active {
  background-color: #ff7800 !important;
}
</style>
