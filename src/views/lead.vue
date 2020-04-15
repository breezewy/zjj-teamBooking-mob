<template>
  <div class="lead-container">
    <div class="logo-container">
      <img class="login" src="../common/image/logo.png" alt />
    </div>
    <div class="name">团队预订系统</div>

    <span class="guide type" @click="guideHandle()">导游</span>
    <span class="travel type" @click="travelHandle()">旅行社</span>
  </div>
</template>

<script>
export default {
  name: "lead",
  data() {
    return {
      // showMiniProgram: false
    };
  },
  methods: {
    addEventBack() {
      pushHistory();
      window.addEventListener("popstate", this.addBackKey, false);
      function pushHistory() {
        var state = {
          title: "title",
          url: "#"
        };
        window.history.pushState(state, "title", "#jjjj");
      }
    },
    addBackKey() {
      wx.miniProgram.reLaunch({ url: "/pages/home/home" });
    },
    ready() {
      if (this.$route.params.isOut) {
        this.returnMiniProgram();
        return;
      }
    },
    guideHandle() {
      this.$router.push({ path: "/guide/login" });
    },
    travelHandle() {
      this.$router.push({ path: "/travel/login" });
    },
    returnMiniProgram() {
      wx.miniProgram.reLaunch({ url: "/pages/home/home" });
    }
  }
};
</script>

<style lang="stylus"  rel="stylesheet/stylus">
.lead-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: #efeff4 */
  background: url('../common/image/lead.jpg') no-repeat #000;
  background-size: 100% auto;

  .logo-container {
    /* width 80px; */
    width: 3.77rem;
    /* height 80px */
    height: 3.4rem;
    margin: 2.05rem auto 0.6rem auto;

    .login {
      // width 80px;
      // height 80px;
      width: 3.77rem;
      height: 3.4rem;
      background-size: 100% auto;
    }
  }

  .name {
    margin-bottom: 1.95rem;
    text-align: center;
    font-size: 20px;
    letter-spacing: 2px;
    color: #fff;
  }

  .type {
    display: block;
    margin: 0 auto 1.4rem auto;
    width: 75%;
    text-align: center;
    height: 3.34rem;
    line-height: 3.34rem;
    background-color: #1c9ae7;
    color: #fff;
    font-size: 20px;
    border-radius: 15px;
  }

  .travel {
    background-color: #f07800;
  }

  .mini-program {
    display: block;
    color: #ffffff;
    font-size: 16px;
    text-align: center;

    .program {
      /* display inline-block */
      /* margin 0 auto */
      border-bottom: 1px solid #ffffff;
      padding-bottom: 1px;
    }
  }
}
</style>
