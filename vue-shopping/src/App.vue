<template>
  <router-view/>
</template>

<script>
export default {
  name: "App",
  created() {
    window.addEventListener("beforeunload", ()=> {
      localStorage.setItem("state",JSON.stringify(this.$store.state));
    });
    localStorage.getItem("state") &&
    this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("state"))))
  }
}
</script>

<style scoped>
</style>
