<template>
  <div class="foot-item" @click="changePage">
    <a v-show="!bol" href="javascript:;" style="display: block">
      <slot name="normalFont"></slot>
    </a>

    <a v-show="bol" href="javascript:;">
      <slot name="activeFont"></slot>
    </a>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    txt: {
      type: String
    },
    page: {
      type: String
    },
    sel: {
      type: String
    }
  },
  computed: {
    bol: function() {
      if (this.sel == this.page) {
        return true;
      }
      return false;
    }
  },
  methods: {
    changePage: function() {
      //点击跳转对应的页面
      this.$router.push("/" + this.page);
    }
  }
};
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
.foot-item {
  flex: 1;
  text-align: center;
}
</style>
