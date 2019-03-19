<template>
  <div class="foot-container" >
    <div class="foot-item" @click='changePage(item)' v-for='item in tabbarDes'>
      <span v-show='item.page!=selected' style="display: block">
         <i class="foot-icon" :class="item.selfFont" ></i>
          <span class="text" v-text='item.txt'></span>
      </span>
      <span v-show='item.page==selected' style="display: block">
        <i style="color:#fc9153" class="foot-icon" :class="item.selfFont"></i>
        <span class="text" style="color:#fc9153"  v-text='item.txt' ></span>
      </span>
    </div>
  </div>
</template>
<script type="text/javascript">
  import TabBarItem from './../tabbaritem/tabbaritem'
  export default{
    components:{
      TabBarItem
    },
    props:['selected'],
    methods:{
      changePage(item){
        this.page = item.page
        //点击跳转对应的页面
        this.$router.push('/'+item.page);
      }
    },
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
            page:'fix',
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
    .foot-item
      flex:1;
      text-align: center
      .foot-icon
        display: block
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
