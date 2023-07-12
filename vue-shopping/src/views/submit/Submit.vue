<template>
    <div class="area">
        <h3><b class="black">请选择收货地址</b></h3>
        <div class="address">
            <div class="addHead flex between">
                <span class="addUser black">收件人信息</span>
                <span class="pointer" style="color: rgb(67, 67, 163)" @click="insertAddress">新增地址</span>
            </div>
            <div class="addMore">
                <div class="addDetail flex">
                    <span class="detailOne">51</span>
                    <span class="one detailTwo">天津市天津市和平区51</span>
                    <span class="one">18627381056</span>
                    <span class="four"></span>
                </div>
                <span class="more pointer">展开更多</span>
            </div>
        </div>
        <h3><b class="black">请确认订单信息</b></h3>
        <div class="submitGoods flex">
            <div class="four goods">商品</div>
            <span>商品属性</span>
            <span>单价</span>
            <span>数量</span>
            <span>小计</span>
        </div>
        <div class="goodsDetail flex" v-for="item in cartList" :key="item.id">
            <div class="product four flex">
                <img :src="`${$url}${item.productInfo.image}`" width="100">
                <span>{{ item.productInfo.storeName }}</span>
            </div>
            <span>{{ item.productInfo.attrInfo.sku }}</span>
            <span>￥{{ item.productInfo.attrInfo.price }}</span>
            <span>{{ item.cartNum }}</span>
            <span>￥{{ item.cartNum * item.productInfo.attrInfo.price }}</span>
        </div>
        <div class="commit">
            <el-input resize="none" v-model="commit" :rows="3" type="textarea" placeholder="如有其他需求，请备注" />
        </div>

        <h3 class="black">选择支付方式</h3>
        <div class="pay flex">
            <span>钱包支付</span>
        </div>
        <div class="payFooter flex column around">
            <span class="black">运费免运费</span>
            <span class="black">需付款：<b>￥{{ money }}</b></span>
            <span class="bt pointer" @click="commitOrder">提交订单</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderList: [],
            commit: '',
            dialogVisible: false,
            checked: '',
            cartList: [],
            orderObj: {},
            money: 0
        }
    },
    created() {
        this.getOrderList()
    },
    methods: {
        commitOrder() {
            this.$ask({
                url: "/order/create/" + this.orderObj.orderKey,
                method: 'POST',
                data: {
                    key: this.orderObj.orderKey,
                    addressId: this.orderObj.addressInfo.id,
                    couponId: 0,
                    from: "h5",
                    mark: "刘昊测试",
                    useIntegral: 0,
                    payType: "yue",
                    shippingType: 1,
                    pinkId: 0
                }
            }).then(r => {
                if (r.status === 200) {
                    this.$message.success(r.msg)
                } else {
                    this.$message.warning(r.msg);
                }
                this.$router.push({
                    name: 'order'
                })
            })
        },
        getOrderList() {
            const params = {
                url: '/order/confirm',
                method: 'POST',
                data: {
                    cartId: this.$route.query.cartId,
                }
            }
            this.$ask(params).then(res => {
                this.cartList = res.data.cartInfo
                this.orderObj = res.data
                console.log(this.orderObj)
                if (res.status === 200) {
                    const paramsMoney = {
                        url: "/order/computed/" + this.orderObj.orderKey,
                        method: "POST",
                        data: {
                            addressId: this.orderObj.addressInfo.id,
                            couponId: null,
                            payType: "yue",
                            shipping_type: 1,
                            key: this.orderObj.orderKey
                        }
                    }
                    this.$ask(paramsMoney).then(r => {  
                        console.log(r)
                        this.money = r.data.result.payPrice;
                    })

                }
            })

        },
        insertAddress() {
            this.dialogVisible = true;
        }
    }
}
</script>

<style scoped>
.dialog-footer {
    margin: 0 auto;
}

.addTitle {
    text-align: center;
}

.product {
    align-items: center;
}

.payFooter {
    margin: 30px 0;
    align-items: flex-end;
    padding-right: 40px;
    height: 150px;
    background-color: #f7f7f7;
}

.bt {
    padding: 10px 20px;
    background-color: #ff7800;
    border-radius: 5px;
    color: #fff;
}

.pay {
    padding-left: 40px;
}

.pay span {
    padding: 10px 20px;
    border: 1px solid #ff7800;
    margin: 20px 0;
}

.commit {
    padding: 20px;
    margin: 20px 0;
    background-color: #f7f7f7;
    border-radius: 10px;
}

.goodsDetail>span,
.submitGoods>span {
    flex: 1;
    text-align: center;
}

.goodsDetail {
    padding: 10px 30px;
    padding-left: 50px;
    align-items: center;
}

.submitGoods {
    margin: 30px 0;
    border: 1px solid #e9e9e9;
    background-color: #fcfcfc;
    padding: 10px 30px;
    padding-left: 50px;
}

.detailOne {
    border: 1px solid #ff7800;
    padding: 10px 70px;
}

.addUser {
    font-size: 16px;
}

.detailTwo {
    margin-left: 30px;
}

.more {
    margin-left: 100px;
}

.addDetail {
    margin-left: 100px;
    margin-bottom: 15px;
    align-items: center;
}

.black {
    color: #000;
}

.address {
    border: 1px solid #f5f5f5;
    margin: 20px 0;
    padding: 20px 0;
}

.addHead {
    padding: 10px 20px;
}

.one {
    flex: 1;
    align-items: center;
}

.two {
    flex: 2;
}

.three {
    flex: 3;
}

.four {
    flex: 4;
}

.five {
    flex: 5;
}

.six {
    flex: 6;
}
</style>