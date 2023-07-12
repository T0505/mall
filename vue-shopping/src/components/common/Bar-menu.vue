<template>
  <div v-for="item in array" :key="item.pid">
    <div>{{item.cateName}}</div>
<!--    <bar-menu v-else :array="item.children"/>-->
    <ul class="ul-child-menu grey flex" v-if="item.children">
      <li v-for="i in item.children" :key="i.pid" @click="$router.push({
        name: 'category',
        query: {
          value: JSON.stringify(i),
        },
      })">
        {{i.cateName}}
        <bar-menu v-if="i.children.length" :array="i.children"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Bar-menu",
  props: {
    array: {
      default: [],
    },
  },
}
</script>

<style scoped>
.ul-child-menu {
  flex-wrap: wrap;
}
.ul-child-menu>li {
  width:50%;
  text-align: center;
  cursor: pointer;
  transition: color .3s ease;
}
.ul-child-menu>li:hover {
  color: #ff7800;
}
</style>
