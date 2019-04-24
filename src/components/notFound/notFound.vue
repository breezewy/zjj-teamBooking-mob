<template>
  <div>
    <h1 class="status-code">404</h1>
    <div class="status-info">抱歉！您访问的页面 <em style="color:#e6a23c">失联</em> 啦...</div>
    <div class="handle">
      <span class="prev-page" @click="prevPage()">上一页</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "notFound",
    // data(){}
    methods:{
      prevPage(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="css">
  .status-code{
    font-size: 32px;
    color:#333;
    text-align: center;
    margin-top: 80px;
  }
  .status-info{
    font-size: 16px;
    text-align: center;
    margin-top: 20px;
  }
  .handle{
    margin-top: 20px;

  }
  .handle .prev-page{
    margin: 0 auto;
    display: block;
    text-align: center;
    width: 80px;
    height: 40px;
    line-height: 40px;
    color:#fff;
    background-color: #03a9f4;
    border-radius: 3px;
    font-size: 14px;
    /*text-align: center;*/
  }
</style>
