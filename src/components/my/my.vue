<template>
    <div class="my-container">
      <v-top :title="title"></v-top>
      <div class="wrapper">
        <ul class="wrap">
          <li class="card" @click="personInfo()">
            <span class="item">个人信息</span>
            <span class="icon iconfont icon-arrow-right"></span>
          </li>
          <li class="card" @click="scoreDetail()">
            <span class="item">积分明细</span>
            <span class="icon iconfont icon-arrow-right"></span>
          </li>
          <li class="card">
            <span class="item">修改密码</span>
            <span class="icon iconfont icon-arrow-right"></span>
          </li>
          <li class="card" @click="loginOut()">
            <span class="item">退出登录</span>
            <span class="icon iconfont icon-arrow-right"></span>
          </li>
        </ul>
      </div>


      <tab-bar :selected="selectedTabBar"></tab-bar>
    </div>
</template>

<script>
  import TabBar from '@/base/tabbar/tabbar'
  import VTop from '@/base/vtop/vtop'
  import {clearLoginInfo} from "../../utils";
  export default {
    name: "my",
    components:{
      TabBar,
      VTop
    },
    created(){
      // this.personInfo()
    },
    data(){
      return {
        title: '我的',      // head中我的
        selectedTabBar:'my'     //这是底部导航
      }
    },
    methods:{
      personInfo(){
        this.$router.push({ path:'/guideInfo'})
      },
      //积分明细
      scoreDetail(){
        this.$createToast({
          txt: '暂未开放',
          type: 'txt'
        }).show()
      },
      loginOut(){
        this.$http.post('/auth/logout').then(({ data: res }) => {
          if (res.code !== '200') {
            this.$createToast({
              txt: res.msg,
              type: 'txt'
            }).show()
          }
          clearLoginInfo()
          this.$router.replace({ path: '/' })
        }).catch(() => {})
      }
    }
  };
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  .my-container
    position: absolute
    z-index: 10
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #efeff4
    .wrapper
      height: calc(100% - 90px);
      overflow-x: hidden;
      overflow-y: auto;
      padding-bottom 50px;
      .wrap
        margin: 30px 10px
        .card
          position: relative
          margin-bottom:20px;
          padding :0 15px
          height 44px
          line-height:44px
          font-size:20px;
          background-color:#fff;
          box-shadow: 0 1px 2px rgba(0,0,0,.3);
          color:#666
          .item
            font-size 16px;
          .icon
            position: absolute;
            right:10px;
            top: 1px;


</style>
