<template>
    <div class="search">
      <div class="search-box-wrapper">
        <search-box ref="searchBox" :placeholder="placeholder" @cancelsearch="cacelbox" @query="onQueryChange"></search-box>
      </div>
      <div class="search-result"  ref="searchResult">
        <suggest @listScroll="blurInput" @selectitem="selectitemresult" ref="suggest" :searchtype='searchtype' :query="query"></suggest>
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
      }
    }
  };
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
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
      top: 64px;
      bottom: 0

</style>
