<template>
  <div class="cube-upload-btn">
    <slot>
      <div class="cube-upload-btn-def"><i></i></div>
    </slot>
    <input class="cube-upload-inputrr" type="file" @change="changeHandler" multiple accept="image/*">
  </div>
</template>
<script type="text/ecmascript-6">

  const COMPONENT_NAME = 'my-cube-btn'

  export default {
    name: COMPONENT_NAME,
    methods: {
      changeHandler(e) {
        const fileEle = e.currentTarget
        const files = fileEle.files
        if (files) {
          this.$parent.addFiles(files)
          fileEle.value = null
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../node_modules/cube-ui/src/common/stylus/variable.styl"
  @import "../../node_modules/cube-ui/src/common/stylus/mixin.styl"
  /*@require "../../common/stylus/variable.styl"*/
  /*@require "../../common/stylus/mixin.styl"*/
  .cube-upload-btn
    position: relative
    overflow: hidden
    &:active
      .cube-upload-btn-def
        background-color: $upload-btn-active-bgc
  .cube-upload-inputrr
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    width: 100%
    font-size: 0
    opacity: 0
  .cube-upload-btn-def
    position: relative
    width: 80px
    height: 80px
    box-sizing: border-box
    background-color: $upload-btn-bgc
    box-shadow: $upload-btn-box-shadow
    border-radius: 2px
    border-1px($upload-btn-border-color, 2px)
    > i
      &::before, &::after
        content: ""
        position: absolute
        top: 50%
        left: 50%
        width: 20px
        height: 2px
        transform: translate(-50%, -50%)
        background-color: $upload-btn-color
      &::after
        transform: translate(-50%, -50%) rotate(90deg)
</style>
