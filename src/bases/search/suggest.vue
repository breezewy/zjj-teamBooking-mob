<template>
  <scroll
    ref="suggest"
    class="suggest"
    :pullup="pullup"
    :beforeScroll="beforeScroll"
    @scrollToEnd="searchMore"
    @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li
        @click="selectItem(item)"
        class="suggest-item border-bottom-1px"
        v-for="(item,index) in result"
        :key="index"
      >
        <div class="icon">
          <i class="iconfont icon-chaxun"></i>
        </div>
        <div class="name">
          <p class="text">{{item.name || item.areaName}}</p>
        </div>
      </li>
      <!--<loading v-show="hasMore && !isCreated" title=""></loading>-->
      <loading v-show="hasMore" title></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from "@/bases/scroll/scroll";
import Loading from "@/bases/loading/loading";
import NoResult from "@/bases/no-result/no-result";
const TYPE_SINGER = "singer";
const perpage = 20;

export default {
  props: {
    searchtype: {
      type: String,
      default: ""
    },
    query: {
      type: String,
      default: ""
    }
  },
  created() {
    // this.isCreated = true
    // this.search
    this.$nextTick(() => {
      this.search();
    });
  },
  data() {
    return {
      current: 1,
      pullup: true,
      beforeScroll: true,
      hasMore: true,
      result: []
    };
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh();
    },
    search() {
      this.current = 1;
      this.hasMore = true;
      this.$refs.suggest.scrollTo(0, 0);
      let data = {
        page: {
          current: this.current,
          size: perpage
        },
        name: this.query
      };
      this.$http
        .post(
          this.searchtype === "travel"
            ? "/wap/travel/name"
            : this.searchtype === "origin"
            ? "/wap/area/name"
            : "/wap/guide/name",
          data
        )
        .then(({ data: res }) => {
          if (res.code === "200") {
            this.result = res.data.records;
            this._checkMore(res.data);
          }
        })
        .catch(() => {});
    },
    searchMore() {
      if (!this.hasMore) {
        return;
      }
      this.current++;
      let data = {
        page: {
          current: this.current,
          size: perpage
        },
        name: this.query
      };
      this.$http
        .post(
          this.searchtype === "travel" ? "/wap/travel/name" : "/wap/area/name",
          data
        )
        .then(({ data: res }) => {
          if (res.code === "200") {
            // this.result = res.data.records
            this.result = this.result.concat(res.data.records);
            this._checkMore(res.data);
          }
        })
        .catch(() => {});
    },
    listScroll() {
      this.$emit("listScroll");
    },
    selectItem(item) {
      this.$emit("selectitem", item);
    },
    _checkMore(data) {
      const records = data.records;
      if (
        !records.length ||
        records.length + (data.current - 1) * perpage >= data.total
      ) {
        this.hasMore = false;
      }
    }
  },
  watch: {
    query(newQuery) {
      // this.isCreated = false
      this.search(newQuery);
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import './../../common/stylus/variable';
@import './../../common/stylus/mixin';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    /* padding: 0 1em */
    .suggest-item {
      display: flex;
      align-items: center;
      /* padding-bottom: 1em */
      line-height: 40px;
      padding: 0 14px;
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;

      .icon-chaxun {
        font-size: 20px;
        color: #666;
        // color: $color-text-d
      }
    }

    .name {
      flex: 1;
      font-size: 14px;
      color: #000;
      overflow: hidden;

      .text {
        no-wrap();
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
