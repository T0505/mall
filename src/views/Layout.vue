<template>
    <box-header/>
    <router-view/>
    <box-footer/>
</template>

<script>
import boxFooter from "@/components/public/Box-footer.vue";
import boxHeader from "@/components/public/Box-header.vue";
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
