<template>
    <div class="search-container">

      <div class="search">
        <header class="header">
          <h1>{{searchTitle}}</h1>
          <i @click="back" class="cubeic-back"></i>
        </header>
        <div class="search-box-wrapper">
          <search-box ref="searchBox" :placeholder="placeholder" @cancelsearch="cacelbox" @query="onQueryChange"></search-box>
        </div>
        <div class="search-result"  ref="searchResult">
          <suggest @listScroll="blurInput" @selectitem="selectitemresult" ref="suggest" :searchtype='searchtype' :query="query"></suggest>
        </div>
      </div>
    </div>

</template>

<script>
  import SearchBox from '@/base/search-box/search-box'
  import Suggest from '@/components/suggest/suggest'

  export default {
    name: "search",
    components:{
      SearchBox,
      Suggest
    },
    props:{
      placeholder:{
        type: String,
        default: ''
      },
      searchtype:{
        type: String,
        default:'输入旅行社名称或拼音缩写'
      },
      searchTitle:{
        type: String,
        default:''
      }
    },
    data(){
      return {
        query: '',
        refreshDelay: 120,
      }
    },
    methods:{
      cacelbox(){
        this.$emit('cancelboxmodal')
      },
      selectitemresult(item){
        this.$emit('itemselected', item)
      },
      onQueryChange(query) {
        this.query = query
      },
      blurInput() {
        this.$refs.searchBox.blur()
      },
      back(){
        this.$emit('searchBack')
      }
    }
  };
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  .search-container
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
    .search
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 10000;
      background-color: #fff
      .search-box-wrapper
        position :relative
        margin: 20px 50px 20px 15px
      .search-result
        position: fixed
        width: 100%
        top: 100px;
        bottom: 0

</style>
