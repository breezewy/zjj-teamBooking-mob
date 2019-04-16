<template>
  <div class="order-status-tab-container">
    <div class="tab">
      <cube-tab-bar
        :useTransition=false
        :showSlider=false
        v-model="selectedLabel"
        :data="tabs"
        ref="tabBar"
        class="border-bottom-1px"
      >
        <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="item.label">
          <!-- name为icon的插槽 -->
          <span class="status-cc" >{{item.label}}</span>
        </cube-tab>
      </cube-tab-bar>
      <div class="slide-wrapper">
        <cube-slide
          :loop=false
          :auto-play=false
          :show-dots=false
          :initial-index="index"
          ref="slide"
          :options="slideOptions"
          @scroll="onScroll"
          @change="onChange"
        >
          <!--<cube-slide-item v-for="(tab,index) in tabs" :key="index">-->
            <!--<div style="min-height: 400px;">-->
              <!--asfdsa-->
            <!--</div>-->

            <!--&lt;!&ndash;<component ref="component" :is="tab.component" :data="tab.data"></component>&ndash;&gt;-->
          <!--</cube-slide-item>-->
          <cube-slide-item>
            <cube-scroll ref="scroll" class="ratings" :options="scrollOptions">
              <div class="order-list">
              <div class="order-item">
                <div class="date clear-fix">
                  <span class="day">2019-04-11</span>
                  <span class="hour">场次：15:00-16:00</span>
                </div>
                <div class="name">
                  湖南万达国际旅行社有限公司湘潭分公司
                </div>
                <div class="status">
                 订单状态：预定状态
                </div>
                <div class="know">
                  订单状态：预定状态
                </div>
                <div class="handle">
                  <span class="view hand-item">
                    录入游客信息
                    <!--<span class="text">录入游客信息</span>-->
                  </span>
                  <span class="hand-item enter">
                    <!--<span class="text">-->
                      游客信息列表
                    <!--</span>-->
                  </span>
                </div>
              </div>
              <div class="order-item">
                <div class="date clear-fix">
                  <span class="day">2019-04-11</span>
                  <span class="hour">场次：15:00-16:00</span>
                </div>
                <div class="name">
                  湖南万达国际旅行社有限公司湘潭分公司
                </div>
                <div class="status">
                  订单状态：预定状态
                </div>
                <div class="know">
                  订单状态：预定状态
                </div>
                <div class="handle">
                  <span class="view hand-item" @click="luru">
                    录入游客信息
                    <!--<span class="text">录入游客信息</span>-->
                  </span>
                  <span class="hand-item enter">
                    <!--<span class="text">-->
                      游客信息列表
                    <!--</span>-->
                  </span>
                </div>
              </div>

              <div class="order-item">
                <div class="date clear-fix">
                  <span class="day">2019-04-11</span>
                  <span class="hour">场次：15:00-16:00</span>
                </div>
                <div class="name">
                  湖南万达国际旅行社有限公司湘潭分公司
                </div>
                <div class="status">
                  订单状态：预定状态
                </div>
                <div class="know">
                  订单状态：预定状态
                </div>
                <div class="handle">
                  <span class="view hand-item">
                    录入游客信息
                    <!--<span class="text">录入游客信息</span>-->
                  </span>
                  <span class="hand-item enter">
                    <!--<span class="text">-->
                      游客信息列表
                    <!--</span>-->
                  </span>
                </div>
              </div>
              <div class="order-item">
                <div class="date clear-fix">
                  <span class="day">2019-04-11</span>
                  <span class="hour">场次：15:00-16:00</span>
                </div>
                <div class="name">
                  湖南万达国际旅行社有限公司湘潭分公司
                </div>
                <div class="status">
                  订单状态：预定状态
                </div>
                <div class="know">
                  订单状态：预定状态
                </div>
                <div class="handle">
                  <span class="view hand-item" @click="luru">
                    录入游客信息
                    <!--<span class="text">录入游客信息</span>-->
                  </span>
                  <span class="hand-item enter" @click="chakan">
                    <!--<span class="text">-->
                      游客信息列表
                    <!--</span>-->
                  </span>
                </div>
              </div>



            </div>
            </cube-scroll>
          </cube-slide-item>
          <cube-slide-item>
            <cube-scroll ref="scroll" class="ratings" :options="scrollOptions">
              <div class="ratings-content">

                afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br>
                afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br>
                afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br>
                afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br>
                afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br>
                afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br> afdasfdafdaf<br>
                afdasfdafdaf<br>
              </div>
            </cube-scroll>
          </cube-slide-item>
          <cube-slide-item>
            已销售
          </cube-slide-item>
          <cube-slide-item>
            已撤销
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'tab',
    props: {
      initialIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        scrollOptions: {
          click: false,
          directionLockThreshold: 0,
          bounce:false
        },
        tabs:[
          {
            label: '已审核',
          },
          {
            label: '待定',
          },
          {
            label: '已销售',
          },
         {
           label: '已撤销',
         }
        ],
        index: this.initialIndex,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          directionLockThreshold: 0,
        }
      }
    },
    computed: {
      selectedLabel: {
        get() {
          return this.tabs[this.index].label
        },
        set(newVal) {
          this.index = this.tabs.findIndex((value) => {
            return value.label === newVal
          })
        }
      }
    },
    mounted() {
      this.onChange(this.index)
    },
    methods: {
      onScroll(pos) {
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        const transform = -pos.x / slideWidth * tabBarWidth
        this.$refs.tabBar.setSliderTransform(transform)
      },
      onChange(current) {
        this.index = current
        // const instance = this.$refs.component[current]
        // if (instance && instance.fetch) {
        //   instance.fetch()
        // }
      },
      luru(){
        console.log('asdfasdf')
        this.$router.push({path:'/my'})
      },
      chakan(){
        console.log('chakan')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  /*@import "~common/stylus/variable"*/
  .order-status-tab-container
    width 100%
    height: 100%;
    position: absolute;
    top: 0;
    left:0;
    background-color: #f0eff5
    .tab
      display: flex
      flex-direction: column
      height: 100%
      >>> .cube-tab-bar
          padding 0 10px
          margin 20px 0
      >>> .cube-tab
        padding: 10px 0
        font-size 18px;
      >>> .cube-tab_active
        color: #2f71fb
        .status-cc
          padding-bottom :3px;
          border-bottom:2px solid #2f71fb
          /*color:#7a7a7a*/
          /*font-size 16px;*/
          //&.active
            /*color:#2f71fb*/
            /*border-bottom:2px solid #2f71fb;*/
      .slide-wrapper
        flex: 1
        overflow: hidden
        .ratings
          position: relative;
          //text-align: left;
          //white-space: normal;
          height: 100%;
        .order-list
          padding 0 15px
          .order-item
            margin 0 auto 10px auto
            padding 20px;
            background-color #fff
            font-size: 16px;
            color:#666;
            .date
              line-height 30px;
              .day
                float :left;
              .hour
                float right
            .name
              line-height 30px;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap
            .status
              line-height 30px;
            .know
              line-height 30px;
            .handle
              display flex
              margin-top 5px;
              justify-content :space-around
              .hand-item
                height 35px;
                line-height 35px
                display :inline-block
                padding 0 20px;
                width 48%;
                box-sizing border-box
                margin 0 auto
                text-align center
                /*background-color:#1891da*/
                /*background-color:#1d97e0*/
                //background: -webkit-linear-gradient(top, rgb(19, 184, 85) 0%,#0f9649 100%)
                background: -webkit-linear-gradient(top, rgb(26, 158, 240) 0%,#439dd4 100%)
                letter-spacing 1px;
                color: #ffffff
                border-radius 17px;
                /*box-shadow: 0 1px 6px #207cb4;*/
                box-shadow: 0px 1px 3px rgba(34, 25, 25, 0.2)



</style>
