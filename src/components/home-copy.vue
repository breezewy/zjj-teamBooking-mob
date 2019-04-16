<template>
    <div class="home-copy-container">

      <header class="header">
        <h1>预定中心</h1>
        <!--<i @click="back" class="cubeic-back"></i>-->
      </header>

      <!--这是首页的copy页面-->
      <div class="wrapper">
        <div class="notice">
        <h1 class="title">预定须知</h1>
        <ul class="list">
          <li class="item">1.每位导游每日限购一笔订单</li>
        </ul>
        <div class="handle">
          <span class="btn">立即预定</span>
        </div>
      </div>
        <div class="rule">
          <h1 class="title">开票规则</h1>
          <ul class="list">
            <li class="item">
              1.通过首页开票按钮进入页面输入开票订单号进行开票
            </li>
            <li class="item">
              2.进入订单列表根据游玩日期查询订单信息，点击开发票按钮进行开票
            </li>
          </ul>
          <div class="handle">
            <span class="btn">立即预定</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "home-copy"
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .home-copy-container
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
      height: calc(100% - 40px)
      overflow-x: hidden
      overflow-y: auto
      .notice
        margin: 20px 10px 15px 10px;
        background-color #fff;
        padding :15px;
        border-radius 5px;
        .title
          margin 20px 0;
          line-height 30px;
          color:#000;
          font-size:18px;
        .list
          font-size:15px;
          color:#4e4e4e
        .handle
          margin: 15px 0
          .btn
            display block
            margin 40px auto 20px auto
            width 200px;
            height 40px;
            line-height 40px;
            border-radius 20px
            text-align center
            background linear-gradient(90deg, #67b7e8, #1a9ef0 50%, #67b7e8);
            background:-webkit-linear-gradient(90deg, #67b7e8, #1a9ef0 50%, #67b7e8)
            //background:linear-gradient(top, #1b99e5 0%,#1a9ef0 100%)
            color: #ffffff
            font-size 16px;
            letter-spacing 1px
      .rule
        margin: 20px 10px 15px 10px;
        background-color #fff;
        padding :15px;
        border-radius 5px;
        .title
          margin 20px 0;
          line-height 30px;
          color:#000;
          font-size:18px;
        .list
          font-size:15px;
          color:#4e4e4e
          .item
            line-height: 2
        .handle
          margin: 15px 0
          .btn
            display block
            margin 40px auto 20px auto
            width 200px;
            height 40px;
            line-height 40px;
            border-radius 20px
            text-align center
            background linear-gradient(90deg, #f18b26, #ef7800 50%, #f18b26);
            background:-webkit-linear-gradient(90deg, #f18b26, #ef7800 50%, #f18b26)
            //background:linear-gradient(top, #1b99e5 0%,#1a9ef0 100%)
            color: #ffffff
            font-size 16px;
            letter-spacing 1px

</style>
