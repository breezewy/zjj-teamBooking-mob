<template>
  <transition name="list-fade">
    <!--<div class="playlist" @click="hide" v-show="showFlag">-->
    <div class="playlist" v-show="showFlag">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <!--<i class="icon" :class="iconMode" @click="changeMode"></i>-->
            <span class="text">团队类型</span>
            <!--<span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>-->
          </h1>
        </div>
        <scroll ref="listContent" :data="teamTypeSelect" class="list-content" :refreshDelay="refreshDelay">
          <!--<transition-group ref="list" name="list" tag="ul">-->
          <div style="font-size: 14px;">
            <cube-radio-group v-model="currentValue" :options="teamTypeSelect" />
          </div>

            <!--<li :key="item.id" class="item" v-for="(item,index) in teamTypeSelect"-->
                <!--@click="selectItem(item,index)">-->
              <!--<i class="current" :class="getCurrentIcon(item)"></i>-->
              <!--<span class="text">{{item.name}}</span>-->
              <!--<span @click.stop="toggleFavorite(item)" class="like">-->
                <!--<i :class="getFavoriteIcon(item)"></i>-->
              <!--</span>-->
              <!--<span @click.stop="deleteOne(item)" class="delete">-->
                <!--<i class="icon-delete"></i>-->
              <!--</span>-->
            <!--</li>-->
          <!--</transition-group>-->
        </scroll>

        <div @click="hide" class="list-close">
          <span>确定</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  // import {mapActions} from 'vuex'
  // import {playMode} from 'common/js/config'
  import Scroll from '@/base/scroll/scroll'
  // import Confirm from 'base/confirm/confirm'
  // import AddSong from 'components/add-song/add-song'
  // import {playerMixin} from 'common/js/mixin'

  export default {
    // mixins: [playerMixin],
    data() {
      return {
        showFlag: false,
        refreshDelay: 120,
        currentValue:this.selected,
      }
    },

    watch:{
      currentValue(newVal){
        console.log(newVal)
        for(const value of this.teamTypeSelect){
          if(value.value === newVal){
            this.selectText= value.label
          }
        }

        this.$emit('item' ,newVal,this.selectText)
        // this.$emit('item' ,newVal,this.selectText)
      }
    },
    props:{
      teamTypeSelect:{
          type:Array,
          default:() =>{
            return []
          }
      },
      selected:{
        type:String,
        default: ''
      }
    },

    // computed: {
    //   modeText() {
    //     return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
    //   }
    // },
    methods: {
      /**
       * 获取团队类型信息
       */

      show() {
        this.showFlag = true
        setTimeout(() => {
          this.$refs.listContent.refresh()
          this.$refs.listContent.scrollTo(0, 0)
        }, 20)
      },
      hide() {
        this.showFlag = false
        // if(!this.selected){
        //   return;
        // }
        // for(const value of this.teamTypeSelect){
        //    if(value.value === this.selected){
        //       this.selectText= value.label
        //    }
        // }
        //
        // this.$emit('item' ,this.selected,this.selectText)
      }
    },

    components: {
      Scroll,
    }
  }
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  /*@import "~common/stylus/variable"*/
  /*@import "~common/stylus/mixin"*/

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: rgba(0,0,0,.3)
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: #fff
      .list-header
        background-color #efeff4
        position: relative
        padding:15px 0
        text-align center
        .title
          display: flex
          align-items: center
          .text
            flex: 1
            font-size 18px

      .list-content
        max-height: 260px
        overflow: hidden
        .cube-radio-label{
          position relative
          top:2px
        }
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 40px
        background: #efeff4
        font-size: 14px
        color:#666
</style>
