<template>
    <ul class="ul-item-layout flex wrap center">
        <li class="relative" v-for="item of array" :key="item.pid" @click="checked(item)">
            <div><img :src="$url+item.image" alt=""></div>
            <div class="div-descript-product">
                <div class="dot">{{ item.storeName }}</div>
                <div class="orange">￥{{ item.price }}</div>
            </div>
            <div class="flex center div-operate-button">
                <div @click="cancel(item)">{{ title }}</div>
                <div @click="$router.push({
                    name:'detail',
                    query: {
                        id: item.pid,
                    }
                })">查看详情</div>
            </div>
            <div class="absolute div-item-select" v-if="batch" :style="{backgroundColor:item.selected ? '#ff7800':'#cfcfcf'}"/>
        </li>
    </ul>
</template>
<script>
export default {
    name: "Item",
    data() {
        return {
            batch: false,
        }
    },
    props: {
        column: {
            default: 5,
        },
        array: {
            defautl: []
        },
        title: {
            default: undefined,
        },
    },
    methods: {
        checked(item) {
            item.selected = !item.selected;
            this.$emit("isAllSelected",this.array.filter(v => v.selected).length === this.array.length)
        },
        cancel(item) {
            this.$ask({
                method: "post",
                url: "/collect/del",
                data: {
                    category: item.category,
                    id: item.pid,
                },
            }).then(response => {
                this.$parent.$parent.init(item.category);
                this.$message.success(response.msg);
            });
        }
    },
}
</script>
<style scoped>
img {
    vertical-align: middle;
    width: 100%;
    border-bottom: thin solid #cfcfcf;
}
.ul-item-layout {
    padding: 14px;
    line-height: 42px;
}
.ul-item-layout>li {
    width: calc(20% - 12px);
    margin:0 15px 15px 0;
    border: thin solid #cfcfcf;
}
.ul-item-layout>li:nth-of-type(5n + 0) {
    margin-right: 0;
}
.div-descript-product {
    padding: 0 20px;
}
.div-operate-button {
    border-top: thin solid #cfcfcf;
}
.div-operate-button>div {
    flex:auto;
    cursor: pointer;
}
.div-operate-button>div:first-of-type {
    border-right: thin solid #cfcfcf;
}
.div-item-select {
    right: 0;
    top: 0;
    width: 48px;
    height: 48px;
    background: #cfcfcf;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
}
.div-item-select::after {
    position: absolute;
    content: "\2713";
    color: white;
    font-size: 28px;
    top: -5px;
}
</style>