<template>
  <div class="div-footer-box">
    <div class="flex center around area">
      <ul>
        <li>客服电话</li>
        <li><h1 class="bold">400 111 2222</h1></li>
        <li>08:00 - 22:00</li>
      </ul>
      <ul>
        <li>服务与支持</li>
        <li>七天无理由退货</li>
        <li>十五天免费换货</li>
        <li>预约维修服务</li>
      </ul>
      <ul>
        <li>关于我们</li>
        <li>了解我们</li>
        <li>合作咨询</li>
        <li>加入我们</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.div-footer-box {
  line-height: 32px;
  padding: 20px 0;
  background-color: #ccc;
}
 li {
   transition: color .3s ease;
   cursor: pointer;
 }
 li:hover {
   color: #ff7800;
 }
</style>
