<template>
    <div class="home-copy-container">

      <!--<header class="header">-->
        <!--<h1>预定中心</h1>-->
        <!--&lt;!&ndash;<i @click="back" class="cubeic-back"></i>&ndash;&gt;-->
      <!--</header>-->

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
          <img src="./../common/image/notice_float_copy.png" class="notice-float" alt="">
          <img src="./../common/image/notice_bottom_copy.png" class="notice-bottom" alt="">
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
            <span class="btn">立即开票</span>
          </div>
          <img src="./../common/image/rule_float_copy.png" class="rule-float" alt="">
          <img src="./../common/image/rule_bottom_copy.png" class="rule-bottom" alt="">
        </div>
        <div class="today">
          <h1 class="title">当日订单</h1>
          <!--<ul class="list">-->
            <!--<li class="item">-->
              <!--1.通过首页开票按钮进入页面输入开票订单号进行开票-->
            <!--</li>-->
            <!--<li class="item">-->
              <!--2.进入订单列表根据游玩日期查询订单信息，点击开发票按钮进行开票-->
            <!--</li>-->
          <!--</ul>-->
          <div class="info">
            <div class="item">
              <span class="text">编号：</span>
              <span class="value">13444589624</span>
            </div>
            <div class="item">
              <span class="text">订单状态：</span>
              <span class="value">未审核</span>
            </div>
            <div class="item">
              <span class="text" style="margin-right: 3px;">2019-04-15</span>
              <span class="value">15:00-16:00</span>
            </div>
            <div class="item">
              <span class="text">湖南万达国际旅行社</span>

            </div>
            <div class="item">
              <span class="text">倒计时：</span>
              <span class="value">[ <span style="color:#e40000">2时3分12秒</span> ]</span>
              <span class="value" style="margin-left: 5px;">请及时核团</span>
            </div>
            <div class="item">
              <span class="text">截止时间：</span>
              <span class="value">2019-04-15</span>
              <span class="value">12:00</span>
            </div>
          </div>
          <div class="handle">
            <span class="btn">立即核团</span>
          </div>
          <img src="./../common/image/today_float_copy.png" class="today-float" alt="">
          <img src="./../common/image/today_bottom_copy.png" class="today-bottom" alt="">
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
      //height: calc(100% - 40px)
      height: calc(100%)
      overflow-x: hidden
      overflow-y: auto
      .notice
        position relative
        /*margin: 1.25rem .4rem 1.25rem .4rem;*/
        margin: .65rem .4rem .65rem .4rem;
        background-color #fff;
        padding :.875rem  .85rem .875rem .85rem;
        border-radius 8px;
        box-shadow: 0 1px 6px #ddd;
        .title
          padding: .55rem 0 1.1rem 0;
          color:#4f4f4f;
          letter-spacing :1px
          font-weight bold
          font-size:.75rem;
          /*border-bottom 1px solid #ddd;*/
        .list
          margin-right: 1.6rem;
          font-size:15px;
          color:#4e4e4e
          .item
            line-height 2;
            span
              display :inline-block
        .handle
          margin: 15px 0
          .btn
            display block
            margin 25px auto 15px auto
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
        .notice-float
          position absolute
          right: -.5rem;
          top:-.15rem;
          width 3.75rem
          height 3.275rem;
        .notice-bottom
          position absolute
          width calc(100%+1.15rem);
          bottom:-.9rem;
          left:-.6rem;
          height 2rem;
      .rule
        position relative
        /*margin: 1.25rem .4rem 1.25rem .4rem;*/
        margin: .65rem .4rem .65rem .4rem;
        background-color #fff;
        padding :.875rem  .85rem .875rem .85rem;
        border-radius 8px;
        box-shadow: 0 1px 6px #ddd;
        .title
          padding: .55rem 0 1.1rem 0;

          color:#4f4f4f;
          letter-spacing :1px
          font-weight bold
          font-size:.75rem;
        .list
          margin-right: 1.6rem;
          font-size:15px;
          color:#4e4e4e
          .item
            line-height: 2
        .handle
          margin: 15px 0
          .btn
            display block
            margin 25px auto 15px auto
            width 7.8rem;
            height 1.6rem;
            line-height 1.6rem;
            border-radius 20px
            text-align center
            background linear-gradient(90deg, #f18b26, #ef7800 50%, #f18b26);
            background:-webkit-linear-gradient(90deg, #f18b26, #ef7800 50%, #f18b26)
            //background:linear-gradient(top, #1b99e5 0%,#1a9ef0 100%)
            color: #ffffff
            font-size 16px;
            letter-spacing 1px
        .rule-float
          position absolute
          right: -.5rem;
          top:-.15rem;
          width 3.75rem
          height 3.275rem;
        .rule-bottom
         // position absolute
         // width 100%
          //bottom:-18px;
          //left:0;
          //height 40px;
          position absolute
          width calc(100%+1.15rem);
          bottom:-.9rem;
          left:-.6rem;
          height 2rem;

      .today
        position relative
        /*margin: 1.25rem .4rem 1.25rem .4rem;*/
        margin: .65rem .4rem .65rem .4rem;
        background-color #fff;
        padding :.875rem  .85rem .875rem .85rem;
        border-radius 8px;
        box-shadow: 0 1px 6px #ddd;
        .title
          padding: .55rem 0 1.1rem 0;
          color:#4f4f4f;
          letter-spacing :1px
          font-weight bold
          font-size:.75rem;
        /*border-bottom 1px solid #ddd;*/
        .info
          color:#4e4e4e
          font-size 16px;
          .item
            line-height 2

        .list
          margin-right: 2rem;
          font-size:15px;
          color:#4e4e4e
          .item
            line-height 2;
        .handle
          margin: 15px 0
          .btn
            display block
            margin 25px auto 15px auto
            width 200px;
            height 40px;
            line-height 40px;
            border-radius 20px
            text-align center
            background linear-gradient(90deg, #64d2c5, #00ac96 50%, #64d2c5);
            background:-webkit-linear-gradient(90deg, #64d2c5, #00ac96 50%, #64d2c5)
            //background:linear-gradient(top, #1b99e5 0%,#1a9ef0 100%)
            color: #ffffff
            font-size 16px;
            letter-spacing 1px
        .today-float
          position absolute
          right: -.5rem;
          top:-.15rem;
          width 3.75rem
          height 3.275rem;
        .today-bottom
          position absolute
          width calc(100%+1.15rem);
          bottom:-.9rem;
          left:-.6rem;
          height 2rem;
</style>
