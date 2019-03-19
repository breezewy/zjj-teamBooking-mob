<template>
  <div class="base-info-container">
    <header class="header">
      <h1>基本信息</h1>
      <i @click="back" class="cubeic-back"></i>
    </header>
    <div class="wrapper">
      <div class="card">
        <div class="card-content">
          <div class="card-content-inner">
            <div class="searchbar">
              <div class="search-input">
                <!--<label for="search" class="icon iconfont icon-cx"></label>-->
                <span class="icon iconfont icon-cx"></span>
                <input type="text" v-model="travelAgency" @focus="focusTravel" class="searchClient" placeholder="输入旅行社名称">
              </div>
            </div>
            <div class="searchbar">
              <div class="search-input">
                <!--<label for="search" class="icon iconfont icon-cx"></label>-->
                <span  class="icon iconfont icon-cx"></span>
                <input type="text" v-model="touristOrigin"  class="searchClient" @focus="focusTourist" placeholder="输入客源地">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="card-content-inner">
            <div class="list-block">
              <ul>
                <li>
                  <div class="item-content-remark">
                    <div class="item-inner clear-fix">
                      <div class="item-title label">备注</div>
                      <div class="item-input">
                        <cube-textarea v-model="remark"></cube-textarea>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <search v-if="isSearchShow" :placeholder="placeholdertype" :searchtype='searchtype'
            @cancelboxmodal="cancelBoxModal" @itemselected="itemSelect"></search>
  </div>
</template>

<script>
  import Search from '@/components/search/search'
  export default {
    name: "base-info",
    components:{
      Search
    },
    data(){
      return {
        travelAgency: '',
        touristOrigin: '',

        isSearchShow:false,    //是否search

        area:{              //客源地
          areaCode:'',
          areaName:'',
        },

        travel:{              //旅行社
          id:'',
          name:''
        },

        remark:''   //备注

      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      /**
       * 当旅行社名称获取焦点的时候
       */
      focusTravel(e){
        this.travelAgency = ''      //清空旅行社名称
        this.placeholdertype = '输入旅行社名称或拼音缩写'
        this.searchtype = 'travel'
        this.isSearchShow = true;
      },
      /**
       *  当客源地获取焦点的时候
       */
      focusTourist(e){
        this.touristOrigin  =''     //清空客源地名称
        this.placeholdertype = '输入客源地'
        this.searchtype = 'origin'
        this.isSearchShow = true;
      },
      /**
       * 选中的suggest列表中的某一项
       */
      itemSelect(item){
        this.isSearchShow =false
        if(item.areaName){
          this.touristOrigin = item.areaName
          this.area =  item
        }else{
          this.travelAgency = item.name
          this.travel =  item
        }
      },
      /**
       * 点击搜索框的取消按钮
       */
      cancelBoxModal(){
        this.isSearchShow = false
      },
    }
  };
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  .base-info-container
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
        color: #fc9153;
        font-size: 16px
    .wrapper
      height: calc(100% - 90px)
      overflow-x: hidden
      overflow-y: auto
      .card
        position: relative
        background-color:#fff;
        box-shadow: 0 1px 2px rgba(0,0,0,.3);
        border-radius:2px;
        margin : 8px 0;
        font-size 15px
        .card-content
          position: relative
          .card-content-inner
            padding 5px 15px;
            position:relative
            .list-block
              margin : -15px
              ul
                padding 20px 0
                position relative
                li
                  box-sizing: border-box
                  .item-content
                    box-sizing: border-box
                    padding-left: 20px;
                    height :40px;
                    line-height 40px

                    .item-title
                      float: left
                      width: 30%
                    .item-input
                      position :relative
                      float: left
                      width: 70%
                      .seat
                        height 28px
                        padding-left :5px
                      .date
                        color:red;
                        font-size:16px;
                      .enter
                        position: absolute;
                        top:-1px;
                        right:13px;
                    .cube-select
                      float left
                      width 65%
                      margin-top 3px
                      padding: 6px 20px 6px 10px;
                  .item-content-remark
                    box-sizing: border-box
                    padding-left: 20px;
                    .item-title
                      margin-top:12px
                      float: left
                      width: 30%
                    .item-input
                      float: left
                      width: 70%
                      .seat
                        height 28px
                        padding-left :5px
                    .cube-select
                      float left
                      width 65%
                      margin-top 3px
            .searchbar
              padding: 8px 0;
              overflow: hidden;
              /*height: 44px;*/
              .search-input
                position relative
                display:flex
                border 1px solid #ddd;
                padding:2px;
                .icon
                  font-size: 14px;
                  color: #b4b4b4;
                  padding :3px 8px 3px 2px;
                  position relative
                  top:3px;
                  left:2px;
                .searchClient
                  height: 28px;
                  flex:1


</style>
