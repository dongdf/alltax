<template>
    <div style="text-align: center;padding:50px;">

        <img src="./imgs/nocontent.png" style="width:5rem;" alt="">
        <p style="color:#666;">{{tipText}}</p>
    </div>
</template>

<script>
  export default {
    name: "noresult",
    props:['tipText']
  }
</script>

<style scoped>

</style>