<template>
  <div class="login-account-container">
    <div style="height: 100%;overflow: auto">
      <div class="type">
        <span
          class="type_item type_account_item"
          :class="{ active: isActive==='account' }"
          @click="changeLoginType('account')"
        >身份证登录</span>
        <span
          class="type_item type_code_item"
          :class="{ active: isActive==='code' }"
          @click="changeLoginType('code')"
        >验证码登录</span>
        <i class="bg_type"></i>
      </div>
      <div class="contain" v-if="isActive==='account'">
        <div class="item">
          <div class="title">
            <span class="icon iconfont icon-shouji"></span>
            <span class="text">身份证</span>
          </div>
          <div class="entry">
            <input type="text" placeholder="请输入身份证" v-model.trim="idCard" class="entry_input" />
          </div>
        </div>

        <div class="item">
          <div class="title">
            <span class="icon iconfont icon-icon-test"></span>
            <span class="text">密码</span>
          </div>
          <div class="entry">
            <input type="password" placeholder="请输入密码" v-model.trim="password" class="entry_input" />
          </div>
        </div>
        <div class="sign_area" @click="signInByIdCard">登录</div>
      </div>

      <div class="contain" v-if="isActive==='code'">
        <div class="item">
          <div class="title">
            <span class="icon iconfont icon-shouji"></span>
            <span class="text">手机号</span>
          </div>
          <div class="entry">
            <input type="number" v-model.trim="mobile" placeholder="请输入手机号" class="entry_input" />
          </div>
        </div>

        <div class="item">
          <div class="title">
            <span class="icon iconfont icon-icon-test"></span>
            <span class="text">验证码</span>
          </div>
          <div class="message clear-fix">
            <input v-model.trim="captcha" placeholder="请输入验证码" class="capture_input" />
            <div class="message-send" @click="sendCode()">{{codeText}}</div>
          </div>
        </div>
        <div class="sign_area" @click="signInByMobile">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import Cookies from "js-cookie";
import { IdentityCodeValid, isMobile } from "../../utils/validation";
export default {
  name: "guidelogincopy",
  data() {
    return {
      isActive: "account",
      idCard: "",
      password: "",

      mobile: "",
      captcha: "",
      codeText: "发送验证码",
      isOvertime: false, //是否超出1分钟
      sendTimer: null //验证码倒计时计时器
    };
  },
  methods: {
    changeLoginType(val) {
      this.isActive = val;
    },
    signInByIdCard() {
      if (!this.idCard) {
        Toast("请输入身份证");
        return;
      }
      if (!IdentityCodeValid(this.idCard)) {
        Toast("身份证格式不正确");
        return;
      }
      if (!this.password) {
        Toast("请输入密码");
        return;
      }
      let data = {
        username: this.idCard,
        password: this.password,
        userType: "guide",
        // loginType:'username'
        loginType: "idCard"
      };
      this.$http
        .post("/auth/login", data)
        .then(({ data: res }) => {
          if (res.code !== "200") {
            Toast(res.msg);
            return;
          }
          Cookies.set("token", res.data.token);

          sessionStorage.setItem("loginType", "guide");
          this.$router.replace({ path: "/guide/home" });
        })
        .catch(() => {
          Toast("服务器异常，请稍后再试");
        });
    },
    signInByMobile() {
      if (!this.mobile) {
        Toast("请输入手机号");
        return;
      }
      if (!isMobile(this.mobile)) {
        Toast("手机格式不正确");
        return;
      }
      if (!this.captcha) {
        Toast("验证码不能为空");
        return;
      }
      let data = {
        username: this.mobile,
        captcha: this.captcha,
        userType: "guide",
        loginType: "mobile"
      };
      this.$http
        .post("/auth/login", data)
        .then(({ data: res }) => {
          if (res.code !== "200") {
            Toast(res.msg);
            return;
          }
          Cookies.set("token", res.data.token);
          sessionStorage.setItem("loginType", "guide");
          this.$router.replace({ path: "/guide/home" });
        })
        .catch(() => {
          Toast("服务器异常，请稍后再试");
        });
    },
    /**
     *  发送验证码
     */
    sendCode() {
      if (!this.mobile) {
        Toast("请填写手机号");
        return;
      }
      if (!isMobile(this.mobile)) {
        Toast("手机号格式不正确");
        return;
      }
      if (this.isOvertime) {
        return;
      }
      this.$http
        .get(`/auth/sendCheckCode/${this.mobile}`)
        .then(({ data: res }) => {
          if (res.code !== "200") {
            Toast(res.msg);
            return;
          }
          let time = 60;
          this.isOvertime = true;
          this.codeText = time + "秒后重发";
          this.sendTimer = setInterval(() => {
            time--;
            this.codeText = time + "秒后重发";
            if (time < 0) {
              this.isOvertime = false;
              clearInterval(this.sendTimer);
              this.codeText = "重新发送";
            }
          }, 1000);
        })
        .catch(() => {
          Toast("服务器异常，请稍后再试");
        });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.login-account-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url('../../common/image/login.jpg') no-repeat #000;
  background-size: 100% auto;

  // background-color :rgba(0,0,0,.3)
  .type {
    display: flex;
    width: 63%;
    margin: 3.425rem auto 0.35rem auto;
    height: 1.8rem;
    text-align: center;
    border-radius: 0.65rem;
    background-color: #595451;
    font-size: 0.7rem;
    color: #fff;

    /* .bg_type */
    .type_item {
      transition: all 0.4s;
      flex: 1;
      border-radius: 0.4rem;
      /* background-color #199beb */
      /* color:#fff */
      height: 1.4rem;
      line-height: 1.4rem;
      text-align: center;

      &.active {
        background-color: #199beb;
        color: #fff;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      }
    }

    .type_account_item {
      margin: 0.2rem 0.2rem 0 0.2rem;
    }

    .type_code_item {
      margin: 0.2rem 0.2rem 0.2rem 0;
    }
  }

  .contain {
    position: relative;
    width: 85%;
    background-color: #fff;
    border-radius: 5px;
    /* height :8.8rem */
    box-sizing: border-box;
    margin: 0.5rem auto;
    padding: 1rem 1rem;

    /* padding .8rem 1rem; */
    .item {
      .title {
        padding: 0.2rem 0;

        span {
          display: inline-block;
        }

        .icon {
          font-weight: bold;
          color: #199beb;
          font-size: 0.9rem;
          vertical-align: middle;
        }

        .text {
          margin-left: 5px;
          /* color:#ababab */
          /* font-size .6rem; */
          font-size: 0.65rem;
          color: #666;
        }
      }

      .entry {
        margin: 3px 5px 20px 5px;
        /* padding :5px 0; */
        padding: 8px 0;
        font-size: 0.65rem;
        /* font-size 16px; */
        /* font-size .75rem; */
        border-bottom: 1px solid #ddd;

        .entry_input {
          width: 100%;
          /* padding-left .4rem */
          outline: none;

          &::placeholder {
            color: #ababab;
            font-size: 0.6rem;
          }
        }
      }

      .message {
        position: relative;
        margin: 3px 5px 20px 5px;
        /* padding: 5px 0; */
        /* font-size .75rem; */
        font-size: 0.65rem;
        padding: 8px 0;
        border-bottom: 1px solid #ddd;

        .capture_input {
          outline: none;
          width: 9.25rem;

          &::placeholder {
            color: #ababab;
            font-size: 0.6rem;
          }
        }

        .message-send {
          position: absolute;
          right: 0;
          top: 0.5rem;
          width: 3.5rem;
          text-align: right;
          font-size: 0.6rem;
          /* color:#ababab */
          color: #26a2ff;
        }
      }
    }

    .sign_area {
      position: absolute;
      bottom: -25px;
      background-color: #26a2ff;
      color: #fff;
      left: 50%;
      width: 80%;
      margin-left: -40%;
      /* height 50px */
      /* line-height 50px */
      height: 2.325rem;
      line-height: 2.325rem;
      text-align: center;
      font-size: 18px;
      letter-spacing: 2px;
      border-radius: 5px;
    }
  }

  .other {
    margin: 50px;
    text-align: center;
    color: #fff;
    font-size: 16px;

    .pass_forget {
      display: inline-block;
      border-bottom: 1px solid #fff;
    }
  }
}
</style>
