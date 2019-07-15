<template>
  <div>
    <div class="search-box">
      <i class="iconfont icon-cx icon-search"></i>
      <input ref="query"  v-focus v-model="query" class="box"  :placeholder="placeholder"/>
      <i @click="clear" v-show="query" class="iconfont icon-chahao icon-dismiss"></i>
    </div>
    <span class="cancel" @click="cancel()">取消</span>

  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from '@/common/js/util'
  export default {
    props: {
      placeholder: {
        type: String,
        default: '输入旅行社名称或拼音缩写'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      },
      cancel(){
        // this.$router.push({ name: 'observe', params: { 'cancel': 'right'} })
        this.$emit('cancelsearch')
      },
    },
    created() {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
    }
  }
</script>

<style  lang="stylus" scoped rel="stylesheet/stylus">
  @import "../../common/stylus/base.styl"
  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 10px
    height: 32px;
    background-color: #e5e5e5
    border-radius: 2px;
    .icon-search
      font-size: 14px
      color: #222
    .box
      flex: 1
      margin: 5px;
      padding 5px;
      line-height: 18px;
      background: #e5e5e5
      color: #000
      font-size: 14px;
      &::placeholder
        color:#969696
    .icon-dismiss
      font-size: 20px
      color: #222
  .cancel
    position:absolute
    right: -43px
    top: 1px
    font-size 14px
    padding : 10px 5px;

</style>
