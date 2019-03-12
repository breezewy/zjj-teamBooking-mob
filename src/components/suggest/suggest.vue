<template>
  <scroll ref="suggest"
          class="suggest"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @scrollToEnd="searchMore"
          @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item border-bottom-1px" v-for="item in result">
        <div class="icon">
          <i class="iconfont icon-chaxun"></i>
        </div>
        <div class="name">
          <p class="text">{{item.name || item.areaName}}</p>
        </div>
      </li>
      <loading v-show="hasMore && !isCreated" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>

</template>

<script type="text/ecmascript-6">
  import Scroll from '@/base/scroll/scroll'
  import Loading from '@/base/loading/loading'
  import NoResult from '@/base/no-result/no-result'
  const TYPE_SINGER = 'singer'
  const perpage = 20

  export default {
    props: {
      searchtype: {
        type: String,
        default: ''
      },
      query: {
        type: String,
        default: ''
      }
    },
    created(){
      this.isCreated = true
    },
    data() {
      return {
        current: 1,
        pullup: true,
        beforeScroll: true,
        hasMore: true,
        result: [],
      }
    },
    methods: {
      refresh() {
        this.$refs.suggest.refresh()
      },
      search() {
        this.current = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        let data= {
          page:{
            current:  this.current,
            size: perpage,
          },
          name: this.query
        };
        this.$http.post(this.searchtype==='travel'?'/wap/travel/name':'/wap/area/name', data).then(({ data: res }) => {
           if(res.code === '200'){
             this.result = res.data.records
             this._checkMore(res.data)
           }
        }).catch(() => {

        })
      },
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.current++
        let data= {
          page:{
            current:  this.current,
            size: perpage,
          },
          name: this.query
        };
        this.$http.post(this.searchtype==='travel'?'/wap/travel/name':'/wap/area/name', data).then(({ data: res }) => {
          if(res.code === '200'){
            // this.result = res.data.records
            this.result = this.result.concat(res.data.records)
            this._checkMore(res.data)
          }
        }).catch(() => {

        })
      },
      listScroll() {
        this.$emit('listScroll')
      },
      selectItem(item) {
        this.$emit('selectitem',item)
      },
      _checkMore(data) {
        const records = data.records
        if (!records.length || (records.length + (data.current -1) * perpage) >= data.total) {
          this.hasMore = false
        }
      },
    },
    watch: {
      query(newQuery) {
        this.isCreated = false
        this.search(newQuery)
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./../../common/stylus/variable"
  @import "./../../common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      /*padding: 0 1em*/
      .suggest-item
        display: flex
        align-items: center
        /*padding-bottom: 1em*/
        //border-bottom: 1px solid rgba(7,17,27,0.1);
        line-height:40px
        padding 0 14px

      .icon
        flex: 0 0 30px
        width: 30px
        .icon-chaxun
          font-size: 20px
          color:#666
          //color: $color-text-d
      .name
        flex: 1
        font-size: 14px;
        color: #000
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
