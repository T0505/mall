<template>
  <div class="area div-process-box" v-if="detail">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: 'order' }">我的订单</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="flex div-status-process">
      <ul class="flex column center ul-order-status">
        <li class="bold">订单号：{{ $route.query.id }}</li>
        <li class="auto li-title-padding">
          <h2 :class="!type?'green':'orange'">{{ detail.statusDto.title }}</h2>
          <div class="pointer" v-if="!type" @click="unpaid({
            url: 'order/cancel',
            method: 'post',
            data: {
              id: $route.query.id,
            }
          })">取消订单</div>
          <div class="pointer orange" v-if="!type" @click="unpaid({
            url: 'order/pay',
            method: 'post',
            data: {
              from: 'h5',
              paytype:'yue',
              uni: $route.query.id,
            }
          })">付款</div>
        </li>
      </ul>
      <ul class="align center flex auto ul-right-process">
        <li>
          <div :class="type>=0?'green':''"><el-icon><Tickets /></el-icon></div>
          <div class="line">提交订单</div>
          <div class="wrap"> 2022-06-06 10:20:32 </div>
        </li>
        <li class="li-dot-status green">
          ····<span class="bold inline realtive" :class="type?'':'span-middle-dot span-one-content'">{{ type?'·': ''}}</span>····
        </li> 
        <li>
          <div :class="type>=1?'green':''"><el-icon><Select /></el-icon></div>
          <div class="line">付款成功</div>
        </li>
        <li class="li-dot-status" :class="type >= 1?'green':''"> 
          ····<span class="bold inline realtive" :class="type === 1?'span-middle-dot span-two-content':''">{{ type=== 1?'': '·'}}</span>····
        </li> 
        <li>
          <div :class="type>=2?'green':''"><el-icon><ShoppingCart /></el-icon></div>
          <div class="line">等待收货</div>
        </li>
        <li class="li-dot-status" :class="type >= 2?'green':''">
          ····<span class="bold inline realtive" :class="type === 2?'span-middle-dot span-three-content':''">{{ type=== 2?'': '·'}}</span>····
        </li> 
        <li>
          <div :class="type>=3?'green':''"><el-icon><DocumentChecked /></el-icon></div>
          <div class="line">完成</div>
        </li>
      </ul>
    </div>
    <ul class="ul-message-bottom">
      <li class="li-message-goods">
        <div>收货信息</div>
        <div class="flex">
          <div>收货地址：{{ detail.userAddress }}</div>
          <div>收货人：{{ detail.realName }}</div>
          <div>收货电话：{{ detail.userPhone }}</div>
        </div>
      </li>
      <li class="li-message-goods">
        <div>收货信息</div>
        <div class="flex">
          <div>订单号：{{ detail.orderId }}</div>
          <div>创建时间：{{ detail.createTime }}</div>
          <div>备注：{{ detail.mark }}</div>
        </div>
      </li>
      <li class="flex center li-baby-head">
        <div>宝贝</div>
        <div>宝贝属性</div>
        <div>状态</div>
        <div>数量</div>
        <div>单价</div>
      </li>
      <li v-for="v of info" :key="v.id" class="flex center li-goods-show">
        <div class="flex left">
          <div><img width="60" :src="$url+v.productInfo.image" alt=""></div>
          <div>{{ v.productInfo.keyword }}</div>
        </div>
        <div>{{ v.productInfo.attrInfo.sku }}</div>
        <div>{{ detail.statusDto.title }}</div>
        <div>{{ v.cartNum }}</div>
        <div class="orange bold">¥{{ v.productInfo.price }}</div>
      </li>
      <li class="right li-settlement-foot">
        <div>商品总价：<span class="orange bold">¥{{ detail.totalPrice }}</span></div>
        <div>运费：¥{{ detail.payPostage }}</div>
        <div>需付款：<span class="orange bold">¥{{ detail.payPrice }}</span></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Processs",
  data() {
    return {
      detail: undefined,
      info: [],
      type: 0,
    };
  },
  created() {
    this.$ask({
      method: "get",
      url: "order/detail/"+this.$route.query.id,
    }).then(response => {
      this.detail = response.data;
      this.info = this.detail.cartInfo;
      this.type = parseInt(this.detail.statusDto.type);
    });
  },
  methods: {
    unpaid(request) {
      this.$ask(request).then(response => {
        this.$message.success(response.msg);
        this.$router.push("/");
      });
    }
  }
}
</script>

<style scoped>
.div-process-box,.el-breadcrumb,.line {
  line-height: 42px;
}
.div-status-process {
  border: thin solid #cfcfcf;
  padding: 20px;
}
.ul-order-status {
  border-right: thin solid #cfcfcf;
  padding: 20px;
}
.el-icon {
  font-size: 36px;
  width: 80px;
}
.ul-right-process {
  line-height: 1 !important;
  justify-content: center;
}
.li-dot-status {
  line-height: 36px;
  font-weight: 900;
}
.li-title-padding {
  padding: 40px 0;
}
.ul-message-bottom {
  margin: 42px 0;
}
.ul-message-bottom>li {
  border: thin solid #cfcfcf;
  padding: 0 20px;
  border-bottom: none;
}
.ul-message-bottom>li:last-of-type {
  border-bottom: thin solid #cfcfcf;
}
.li-message-goods>div>div {
  width: 30%;
}
.li-message-goods>.flex>div:first-of-type {
  margin-left: 60px;
}
.li-baby-head {
  background-color: #f1f2f5;
}
.li-baby-head>div,.li-goods-show>div {
  flex:1;
}
.li-goods-show {
  line-height: 100px;
}
.li-baby-head>div:first-of-type,
.li-goods-show>div:first-of-type {
  flex: 2;
}
img {
  margin-right: 10px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.li-settlement-foot {
  padding: 0 105px !important;
}
.span-middle-dot {
  width: 6px;
  height: 6px;
  background-color: #ff7800;
  border-radius: 5px;
  margin: 2px;
  position: relative;
  top: 1px;
}
.span-one-content::after,
.span-two-content::after,
.span-three-content::after{
  position: absolute;
  top: -35px;
  white-space: nowrap;
  left: -25px;;
  color: #ff7800;
}
.span-one-content::after {
  content: "等待付款";
}
.span-two-content::after {
  content: "等待发货";
}
.span-three-content::after {
  content: "等待确认";
}
</style>