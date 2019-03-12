<template>
  <div class="foot-container" >
    <tab-bar-item :txt='item.txt' :page='item.page'  :key="item.txt" v-for='item in tabbarDes':sel='selected'>
      <!--<i class="foot-icon" :class="item.selfFont" slot='normalFont'></i>-->
      <!--<i style="color:#fc9153" class="foot-icon" :class="item.selfFont" slot='activeFont'></i>-->
      <!--<span class="text" v-text='item.txt' slot='normalFont'></span>-->
      <!--<span class="text" style="color:#fc9153"  v-text='item.txt' slot='activeFont'></span>-->
      <i class="" slot='normalFont' style="font-size: 14px;">afasdf</i>
    </tab-bar-item>
  </div>
</template>
<script type="text/javascript">
  import TabBarItem from './../tabbaritem/tabbaritem'
  export default{
    components:{
      TabBarItem
    },
    props:['selected'],
    data(){
      return{
        tabbarDes:[
          {
            txt:'首页',
            page:'home',
            selfFont:'iconfont icon-home',
          },
          {
            txt:'预定',
            page:'observe',
            selfFont:'iconfont icon-yudingzhongxin1'
          },
          {
            txt:'积分',
            page:'score',
            selfFont:'iconfont icon-jifen1'
          },
          {
            txt:'订单',
            page:'order',
            selfFont:'iconfont icon-icon'
          },
          {
            txt:'我的',
            page:'my',
            selfFont:'iconfont icon-wode1',
          },
        ]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .foot-container
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    background-color:#fff
    .foot-icon
      position relative
      top:6px;
      font-size :18px;
      padding-bottom 3px;
      color:#000
    .text
      font-size 14px
      display block
      margin-top 8px
</style>
