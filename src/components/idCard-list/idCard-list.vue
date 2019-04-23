<template>
    <div class="idCard-list-container">
      <header class="header">
        <h1>旅客中心</h1>
        <i @click="back" class="cubeic-back"></i>
      </header>
      <div class="wrapper">
        <div class="add_btn">
          <div class="card_btn" @click="goAddGuest()">
            <i class="iconfont icon-tianjia"></i>
            <span class="card_txt">继续添加旅客信息</span>
          </div>
          <div class="card_btn" @click="returnToOrder()">
            <i class="iconfont icon-fanhui"></i>
            <span class="card_txt">返回订单列表</span>
          </div>
        </div>
        <div class="number">
            <span class="added item">
              <span class="num">已添加 <span style="font-size: 16px">{{count}}</span> 人</span>
            </span>
            <span class="no-added item">
              <span class="wait">
                未添加 <span style="font-size: 16px">{{noAdd}}</span> 人
              </span>
            </span>
        </div>
        <div class="list" >
            <div class="inner clear-fix" v-for="(item,index) in whiteList">
              <span class="name">{{item.name}}</span>
              <div class="info">
                <span class="mobile">{{item.mobile}}</span>
                <span class="idCard">{{item.idCard}}</span>
              </div>
              <span class="delete" @click="deleteHandle(item)">删除</span>
            </div>

            <!--<div class="inner clear-fix">-->

              <!--<span class="name">张阿狗</span>-->
              <!--<div class="info">-->
                <!--<span class="mobile">15990111999</span>-->
                <!--<span class="idCard">341203199303233419</span>-->
              <!--</div>-->
            <!--</div>-->
        </div>

      </div>
    </div>
</template>

<script>
  import {Toast, MessageBox} from 'mint-ui'
  export default {
    name: "idCard-list",
    data(){
      return {
        whiteList:[],
        total:'',     // 总数
        count:'',    //已添加
        noAdd:''     // 未添加
      }
    },
    created(){
      this.getWapIdCard()
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      getWapIdCard(){
        const orderNo = this.$route.params.id
        this.$http.get(`/wap/idCard/${orderNo}`).then(({ data: res }) => {
          if (res.code !== '200') {
            Toast(res.msg)
            return;
          }
          this.whiteList = res.data.idCards
          this.total = res.data.total
          this.count = res.data.count
          this.noAdd = this.total - this.count
        })
      },
      /**
       * 继续添加身份证信息
       */
      goAddGuest(){
        let id =this.$route.params.id
        this.$router.push({ name: 'idCard-enter', params: { id:  id}})
      },
      returnToOrder(){
        this.$router.push({path:'/order/copy'})
      },
      deleteHandle(item){
        let name = item.name
        let id = item.id
        MessageBox.confirm(`确定删除${name}身份信息?`).then(action => {
          if(action ==='confirm'){
            this.$http.delete(`/wap/cardNo/${id}`).then(({ data: res }) => {
                console.log(id)
              if(res.code !=='200'){
                Toast(res.msg)
                return;
              }
              this.getWapIdCard()
              Toast('删除成功')
            }).catch(() =>{
              Toast('服务器异常，请稍后再试')
            })
          }
          console.log(action)
        });
      }


    }
  };
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  @import "./../../assets/idCard-list.styl"

</style>
