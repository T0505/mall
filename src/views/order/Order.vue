<template>
  <left-function :index="1">
    <ul class="flex relative ul-status-switch">
      <li :class="index-i?'':'orange'" class="pointer" v-for="(element,i) of status" :key="i"
          @click="status_switch(i)">{{element}}</li>
      <li :style="{left: 20 + index * 82 + 'px'}" class="absolute animation li-active-status"/>
    </ul>
    <ul class="flex center ul-title-nav">
      <li>宝贝</li>
      <li>单价</li>
      <li>数量</li>
      <li>收货人</li>
      <li>实付款</li>
      <li>状态</li>
      <li>操作</li>
    </ul>
    <ul>
      <li v-for="item of content" :key="item.id" class="li-item-show">
        <div>创建时间：{{item.createTime}} <span class="span-order-id">订单号：{{item.orderId}}</span></div>
        <div class="flex center div-content-format">
          <div class="div-goods-img">
            <ul v-for="i of item.cartInfo" :key="i.id" class="flex ul-goods-content">
              <li class="flex">
                <div><img width="86" :src="$url+i.productInfo.image" alt=""></div>
                <div class="flex column between left">
                  <div>{{i.productInfo.storeName}}</div>
                  <div class="grey">{{i.productInfo.attrInfo.sku}}</div>
                </div>
              </li>
              <li>{{i.productInfo.attrInfo.price}}</li>
              <li>{{i.cartNum}}</li>
            </ul>
          </div>
          <div>{{item.realName}}</div>
          <div>
            <div>¥{{item.totalPrice}}</div>
            <div>免邮费</div>
          </div>
          <div>
            <div class="orange">{{status[item.statusDto.type]}}</div>
            <div class="pointer" @click="$router.push({
              name: 'process',
              query: {
                id: item.orderId,
              },
            })">订单详情</div>
          </div>
          <div>
            <template v-for="(v,i) of events" :key="i">
              <el-button v-if="v.main && i===index" color="#ff7800" plain @click="v.main.method ? v.main.method() : method(v.main.data,item.orderId,v.main.uri)">{{v.main.topic}}</el-button>
              <div v-if="v.minor && i===index" class="underline pointer" @click="v.minor.method ? v.minor.method(item.cartInfo): method(v.minor.data,item.orderId,v.minor.uri)">{{ v.minor.topic }}</div>
            </template>
          </div>
        </div>
      </li>
    </ul>
  </left-function>
</template>

<script>
import leftFunction from "@/components/common/Left-function.vue";
export default {
  name: "Order",
  components: {
    leftFunction,
  },
  data() {
    return {
      status: ["待付款","待发货","待收货","待评价","已完成"],
      events: [
        {
          main: {
            topic: "立刻支付",
            data: {
              from: "h5",
              paytype:"yue",
            },
            uri: "pay"
          },
          minor: {
            topic:"取消订单",
            uri: "cancel",
          },
        },
        {
          main: {
            topic: "提醒发货",
            method: () =>  this.$message.success("已经提醒卖家发货"),
          },
        },
        {
          main: {
            topic: "确认收货",
            uri: "take",
          },
        },
        {
          minor: {
            topic: "评论",
            method:info => this.$router.push({
                name: "evaluate",
                query: {
                  info: JSON.stringify(info),
                },
              }),
          },
        },
        {
          minor: {
            topic: "删除订单",
            uri: "del",
          },
        },
      ],
      index: 0,
      page: 1,
      total: 1,
      content: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$ask({
        method: "get",
        url: "order/list",
        params: {
          limit: 5,
          type: this.index,
          page: this.page,
        },
      }).then(response => {
        this.content = response.data.content;
        this.total = response.data.totalElements;
      }).catch(error => console.log(error));
    },
    status_switch(i) {
      this.index = i;
      this.init();
    },
    method(value,id,uri,title) {
      const data = value || {};
      data.id = data.uni = id;
      this.$confirm(title||"该操作无法恢复，继续操作吗？", "提示",{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$ask({
          method: "post",
          url: "order/" + uri,
          data,
        }).then(response => {
          const is = response.status === 200;
          this.$message[is ? "success":"error"](response.msg);  
          is && this.init();
        });
      }).catch(() => this.$message.info("暂未操作"));
    }
  }
}
</script>

<style scoped>
img {
  margin: 0 10px;
}
.ul-status-switch {
  line-height: 42px;
  border: thin solid #cfcfcf;
}
.ul-status-switch>li {
  padding: 0 20px;
}
.li-active-status {
  padding: 0;
  width: 20px;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #ff7800;
}
.ul-title-nav {
  background-color: #f1f2f5;
  line-height: 42px;
  margin: 14px 0;
}
.ul-title-nav>li:first-of-type {
  flex:28%;
}
.ul-title-nav>li,.div-content-format>div{
  flex: 12%;
  align-self:center;
}
.ul-goods-content>li {
  flex: 18%;
  align-self:center;
}
.ul-goods-content>li:first-of-type {
  flex: 45%;
}
.ul-goods-content {
  padding: 15px 0;
  border-bottom: thin solid #cfcfcf;
}
.ul-goods-content:last-of-type {
  border: none;
}
.span-order-id {
  margin-left: 40px;
}
.li-item-show {
  border: thin solid #cfcfcf;
  margin-bottom: 14px;
}
.li-item-show:last-of-type {
  margin: 0;
}
.li-item-show>div:first-of-type {
  line-height: 42px;
  background-color: #f3f3f3;
  padding: 0 20px;
}
.div-content-format {
  padding: 5px 0;
}
.div-goods-img{
  flex: 54% !important;
}
</style>