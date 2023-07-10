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
  <div class="area">
    <ul class="flex ul-toggle-menu">
      <li v-for="(item,index) of menu" :key="index" @click="toggle(index)"
          :style="{background: index === select ?'white':'none'}">
        {{item}}
      </li>
    </ul>
    <a id="mao"/>
    <div class="flex div-collect-detail between">
      <div v-if="select" class="flex column auto">
        <ul class="flex ul-comment">
          <li :class="point===index?'active-comment orange':''" v-for="(item,index) of comment" :key="index"
              @click="check(index)">
            {{item}}({{count[index]}})
          </li>
        </ul>
        <ul>
          <li v-for="(item,i) of comments" :key="i" class="flex li-comment-strip">
            <div class="div-header-image center">
              <div><img width="60" src="../../assets/image/img_2.png" alt=""></div>
              <div>{{item.nickname}}</div>
            </div>
            <div class="flex column evenly">
              <div>{{item.comment}}</div>
              <ul class="flex">
                <li v-for="(v,o) of item.picturesArr" :key="o">
                  <img :src="$url.substring(0,$url.length-1) + v" alt="">
                </li>
              </ul>
              <div class="grey">{{item.createTime}}</div>
            </div>
          </li>
        </ul>
        <a ref="a" href="#mao"/>
        <el-pagination
            class="pagination-detail-comment"
            background
            layout="prev, pager, next, jumper"
            :total="count[point] || 1"
            :default-page-size="5"
            @current-change="change"
        />
      </div>
      <div v-else v-html="description"/>
      <div class="div-you-like center auto">
        <div class="flex align content">
          <hr/>
          <div class="div-guess-like bold">猜你喜欢</div>
          <hr/>
        </div>
        <div>Guess you like it</div>
        <div v-for="item of like" :key="item.id" class="div-like-list" @click="$router.push({
          name: 'detail',
          query: {
            id: item.id,
          },
        });">
          <div><img width="200" :src="$url + item.image" alt="" /></div>
          <div class="bold dot">{{ item.keyword }}</div>
        </div>
      </div>
    </div>
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
      select: 0,
      menu: ["宝贝详情","商品评论"],
      like: null,
      count: [],
      point: 0,
      comment: ["全部","好评","中评","差评"],
      page: 1,
      type: 0,
      comments: null,
    };
  },
  created() {
    this.init();
    this.toggle(0);
  },
  methods: {
    elect(o,v) {
      this.array[o] = v;
      const temp = [];
      this.goods.productAttr.forEach((item,index) => temp.push(item.attrValue[this.array[index]].attr));
      this.now = this.goods.productValue[temp.join(",")] || this.goods.productValue[temp.reverse().join(",")];
    },
    init() {
      Promise.all([
        this.$ask.get("/index/like"),
        this.$ask.get("product/detail/"+this.$route.query.id),
      ]).then(response => {
        this.like = response[0].data.slice(0,4);
        this.goods = response[1].data;
        this.array = new Array(this.goods.productAttr.length).fill(0).map(() => 0);
        this.elect(0,0);
        const string = this.goods.storeInfo.description,index = string.search('src="');
        this.description = insertStr(string,index + 5,this.$url.substring(0,this.$url.length-1));
      }).catch(error => console.log(error));
      function insertStr(source, start, string) {
        return source.slice(0, start) + string + source.slice(start)
      }
    },
    toggle(index) {
      this.count = [];
      this.select = index;
      const id = this.$route.query.id;
      if (this.select===1) {
        Promise.all([
          this.$ask.get("reply/config/" + id),
          this.$ask({
            url: "reply/list/" + id,
            params: {
              limit: 5,
              page: this.page,
              type: this.type,
            },
          }),
        ]).then(response => {
          this.count.push(response[0].data.sumCount);
          this.count.push(response[0].data.goodCount);
          this.count.push(response[0].data.inCount);
          this.count.push(response[0].data.poorCount);
          this.comments = response[1].data;
        }).catch(error => console.log(error));
      }
    },
    change(i) {
      this.page = i;
      this.toggle(1);
      this.$refs.a.click();
    },
    check(i) {
      this.type = this.point = i;
      this.toggle(1);
    }
  },
  watch: {
    $route(){
      this.init();
      this.toggle(0);
      console.log(this.count)
    }
  }
}
</script>

<style scoped>
hr {
  width: 50px;
  background-color: #666;
  height: 1px;
}
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
.ul-toggle-menu {
  background-color: #f6f6f6;
  border: thin solid #cfcfcf;
  line-height: 38px;
  margin: 30px 0;
}
.ul-toggle-menu>li {
  padding: 0 20px;
  border-right: thin solid #cfcfcf;
  cursor: pointer;
}
:deep(p>img) {
  width: 800px !important;
  padding: 20px 0;
}
.div-you-like {
  line-height: 36px;
  padding: 20px 60px;
  margin-left: 80px;
  border-left: thin solid #cfcfcf;
  flex: 0;
}
.div-guess-like {
  margin: 0 20px;
  font-size: 18px;
}
.div-like-list {
  margin: 40px 0;
  line-height: 1;
}
.div-collect-detail {
  margin-bottom: 50px;
}
.ul-comment>li {
  padding: 0 40px;
  border-radius: 36px;
  border: thin solid #cfcfcf;
  line-height: 36px;
  margin-right: 20px;
  cursor: pointer;
}
.active-comment {
  border: thin solid #ff7800!important;
}
.div-header-image {
  margin: 20px;
}
.li-comment-strip {
  line-height: 28px;
  border-bottom:thin solid #cfcfcf;
  padding: 20px 0;
}
.pagination-detail-comment {
  justify-content: right;
  margin: 50px 0;
}
:deep(.is-active) {
  background-color: #ff7800!important;
  color: white !important;
}
:deep(.el-pager li):hover {
  color: #ff7800;
}
</style>
