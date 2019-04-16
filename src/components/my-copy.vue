<template>
    <div class="my-copy-container">
      <header class="header">
        <h1>我的</h1>
        <!--<i @click="back" class="cubeic-back"></i>-->
      </header>
      <div class="wrapper">
        <div class="bg-main"></div>
        <div class="info">
          <div class="phone item clear-fix">
            <span class="text">手机号</span>
            <span class="value">17682331278</span>
          </div>
          <div class="name item clear-fix">
            <span class="text">姓名</span>
            <span class="value">刘玉军</span>
          </div>
          <div class="type item clear-fix">
            <span class="text">证件类型</span>
            <span class="value">身份证</span>
          </div>
          <div class="cerNo item clear-fix">
            <span class="text">证件号</span>
            <span class="value">341203199303233419</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "my-copy"
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .my-copy-container
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #efeff4
    .header
      position: relative;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #edf0f4;
      box-shadow: 0 1px 6px #ccc;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      z-index: 5;
      h1
        font-size: 16px
        font-weight: 700;
      .cubeic-back
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 15px;
        color: #1c9ae7;
        font-size: 16px
    .wrapper
      position: relative;
      height: calc(100% - 40px)
      overflow-x: hidden
      overflow-y: auto
      .bg-main
        width: 100%;
        height 100px;
        background-color #1c9ae7
        z-index :1;
      .info
        margin-top -50px;
        margin-left: auto;
        margin-right: auto;
        padding:10px
        width 85%
        height 400px
        background-color #fff;
        font-size 16px;
        color:#989898
        z-index:2
        .item
          font-size 18px;
          line-height 40px;
          .text
            float left
          .value
            float right




</style>
