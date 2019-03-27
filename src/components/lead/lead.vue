<template>
    <div class="lead-container">
      <span class="guide type" @click="guideHandle()">导游</span>
      <span class="travel type" @click="travelHandle()">旅行社</span>
    </div>
</template>

<script>
  export default {
    name: "lead",
    methods:{
      guideHandle(){
        this.$router.push({path:'/guide/login'})
      },
      travelHandle(){
        this.$router.push({path:'/travel/login'})
      }
    }

  };
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  .lead-container
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #efeff4
    .type
      display: block
      margin 50px auto
      width 75%
      text-align center
      height 80px
      line-height 80px
      background-color:#1c9ae7
      color:#fff;
      font-size 20px
      border-radius :10px
    .guide
      margin-top :100px
    .travel
      margin-top 150px;



</style>
