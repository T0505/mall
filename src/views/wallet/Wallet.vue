<template>
  <left-function :index="3">
    <div class="div-box">
      <ul class="flex relative ul-status-switch">
        <li :class="index-i?'':'orange'" class="pointer" v-for="(element,i) of status" :key="i"
            @click="index = i">{{element}}</li>
        <li :style="{left: 20 + index * 96 + 'px'}" class="absolute animation li-active-status"/>
      </ul>
      <div class="flex wrap div-scheme-charge">
        <ul class="hidden relative" v-for="item of scheme" :key="item.id">
          <li class="absolute li-background"><img src="../../assets/image/img_3.png" alt=""></li>
          <li class="white li-content-style">
            <div>￥ <span class="span-price-recharge">{{item.value.give_price }}</span></div>
            <div class="dot li-condition-use">使用条件：充值￥{{item.value.price }} 赠送￥{{item.value.give_price }}</div>
          </li>
          <li class="absolute li-prompt-recharge">充值</li>
          <li class="pointer center li-event-use" @click="use(item.id)">立刻使用</li>
        </ul>
      </div>
    </div>
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
      status: ["充值方案"],
      index: 0,
      scheme: [],
    };
  },
  created() {
    this.$ask.get("recharge/index").then(response => this.scheme = response.data.rechargePriceWays);
  },
  methods: {
    use(id) {
      this.$ask({
        url:"recharge/test",
        method: "post",
        data: {
          rechar_id: id,
        },
      }).then(response => {
        this.$message.success(response.data)
      })
    }
  }
}
</script>
<style scoped>
.div-box {
  height: 100%;
  border: thin solid #cfcfcf;
}
.ul-status-switch {
  line-height: 42px;
  border-bottom: thin solid #cfcfcf;
}
.ul-status-switch>li {
  padding: 0 20px;
}
.li-active-status {
  padding: 0;
  width: 56px;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #ff7800;
}
.div-scheme-charge {
  border-top: 0;
  padding: 42px;
  line-height: 42px;
}
.div-scheme-charge>ul {
  margin: 0 42px 42px 0;
  background-color: rgb(253,91,91);
  border-radius: 22px;
}
.span-price-recharge {
  font-size: 24px;
}
.li-condition-use {
  font-size: 12px;
}
.li-content-style {
  padding: 20px;
  border-radius: 20px 20px 0 0;
  line-height: 32px;
}
.li-event-use {
  background-color: #f1f2f5;
  border-radius: 0 0 20px 20px;
}
.li-prompt-recharge {
  color: rgb(253,91,91);
  top: 1px;
  right: -36px;
  background-color: white;
  padding: 0 40px;
  transform: rotate(45deg);
  line-height: 32px;
}
.li-background {
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  opacity: .2;
}
</style>
