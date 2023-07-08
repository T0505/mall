<template>
  <box-header></box-header>
  <router-view/>
  <box-footer></box-footer>
</template>

<script>
import boxFooter from "@/views/footer/Box-footer.vue";
import boxHeader from "@/views/header/Box-header.vue";
export default {
  name: "layout",
  components: {
    boxFooter,
    boxHeader,
  },
}
</script>

<style scoped>
</style>
