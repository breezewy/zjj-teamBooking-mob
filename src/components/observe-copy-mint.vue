
<template>
  <div>
    <!--<div class="nav">-->
      <!--<mt-button size="small" @click.native.prevent="active = 'tab-container1'">tab 1</mt-button>-->
      <!--<mt-button size="small" @click.native.prevent="active = 'tab-container2'">tab 2</mt-button>-->
      <!--<mt-button size="small" @click.native.prevent="active = 'tab-container3'">tab 3</mt-button>-->
    <!--</div>-->

    <!--<div class="page-tab-container">-->
      <!--<mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>-->
        <!--<mt-tab-container-item id="tab-container1">-->
          <!--&lt;!&ndash; cell组件 &ndash;&gt;-->
          <!--&lt;!&ndash;<mt-cell v-for="n in 100" title="tab-container 1"></mt-cell>&ndash;&gt;-->
          <!--<div>-->
            <!--1-->
            <!--<br>-->
            <!--1<br>-->
            <!--1<br>-->
            <!--1<br>-->
            <!--1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br>-->
            <!--1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br>-->
            <!--1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br> 1<br>-->

          <!--</div>-->
        <!--</mt-tab-container-item>-->
        <!--<mt-tab-container-item id="tab-container2">-->
          <!--&lt;!&ndash; cell组件 &ndash;&gt;-->
          <!--<mt-cell v-for="n in 5" title="tab-container 2"></mt-cell>-->
        <!--</mt-tab-container-item>-->
        <!--<mt-tab-container-item id="tab-container3">-->
          <!--&lt;!&ndash; cell组件 &ndash;&gt;-->
          <!--<mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>-->
        <!--</mt-tab-container-item>-->
      <!--</mt-tab-container>-->
    <!--</div>-->
  </div>
</template>

<script>
  // import { Button } from 'mint-ui';

  // import { Cell, Button,TabContainer, TabContainerItem } from 'mint-ui';
  export default {
    name: 'observe-copy-mint',
    data() {
      return {
        active: 'tab-container1'
      };
    }
  };
</script>

<style lang="css" scoped>
  .item {
    display: inline-block;
  }

  .nav {
    padding: 10px;
  }

  .link {
    color: inherit;
    padding: 20px;
    display: block;
  }
</style>
