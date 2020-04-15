<template>
  <div class="idCard-list-container">
    <header class="header">
      <h1>游客列表</h1>
      <i @click="back" class="cubeic-back"></i>
    </header>
    <div class="wrapper">
      <div class="add_btn">
        <!-- <div class="card_btn" @click="goAddGuest()">
          <i class="iconfont icon-tianjia"></i>
          <span class="card_txt">继续添加旅客信息</span>
        </div> -->
        <div class="card_btn" @click="returnToOrder()">
          <i class="iconfont icon-fanhui"></i>
          <span class="card_txt">返回订单列表</span>
        </div>
      </div>
      <div class="number">
        <span class="added item">
          <span class="num">
            游客数量
            <span style="font-size: 16px">{{count}}</span> 人
          </span>
        </span>
        <!-- <span class="no-added item">
          <span class="wait">
            未添加
            <span style="font-size: 16px">{{noAdd}}</span> 人
          </span>
        </span> -->
      </div>
      <!-- <div class="list">
        <div class="inner clear-fix" v-for="(item,index) in whiteList" :key="index">
          <span class="name">{{item.name}}</span>
          <div class="info">
            <span class="mobile">{{item.mobile}}</span>
            <span class="idCard">{{item.idCard}}</span>
          </div>
           <span class="delete" @click="deleteHandle(item)">删除</span>
        </div>
      </div> -->
      <van-checkbox-group v-model="result" @change="change">
        <van-cell-group>
          <van-cell
            v-for="(item,index) in whiteList"
            clickable
            :key="item.id"
            :title="item.name"
            :value="item.idCard"
            @click="toggle(index)"
          >
            <van-checkbox slot="right-icon"  :name="item.id" ref="checkboxes" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <van-button type="primary" size="large" @click="handlePut">提交</van-button>
    </div>
  </div>
</template>

<script>
import { Toast, MessageBox } from "mint-ui";
import Checkbox from 'vant/lib/checkbox';
import CheckboxGroup from 'vant/lib/checkbox-group';
import Cell from 'vant/lib/cell';
import CellGroup from 'vant/lib/cell-group';
import Button from 'vant/lib/button';

import 'vant/lib/button/style';
import 'vant/lib/checkbox/style';
import 'vant/lib/checkbox-group/style';
import 'vant/lib/cell/style';
import 'vant/lib/cell-group/style';

export default {
  name: "idCard-list",
  components:{
    [Checkbox.name]:Checkbox,
    [CheckboxGroup.name]:CheckboxGroup,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
    [Button.name]:Button
  },
  data() {
    return {
      whiteList: [],
      result:[],
      total: "", // 总数
      count: "", //已添加
      noAdd: "" // 未添加
    };
  },
  created() {
    this.getWapIdCard();
    this.getUserInfo();
  },
  methods: {
    handlePut(){
      if(this.result.length === 0){
        Toast('请选择提交项');
        return 
      }
      this.$http.put('/wap/confirmTourists',this.result).then(({data:res}) => {
        if (res.code !== "200") {
          Toast(res.msg);
          return;
        }
        Toast('提交成功');
        console.log(this.type)
        if(this.type == 1){
          this.$router.push(`/guide/order-detail/${this.$route.params.id}`)
        }else if(this.type == 2){
          this.$router.push(`/travel/order-detail/${this.$route.params.id}`)
        }
      })
    },
    //复选框选中切换
    toggle(index){
      this.$refs.checkboxes[index].toggle();
    },
    //监听复选框变化，获取到选中的选项id
    change(res){
      this.result = res
    },
    back() {
      this.$router.go(-1);
    },
    getWapIdCard() {
      const orderNo = this.$route.params.id;
      this.$http.get(`/wap/idCard/${orderNo}`).then(({ data: res }) => {
        if (res.code !== "200") {
          Toast(res.msg);
          return;
        }
        this.whiteList= res.data.idCards;
        this.total = res.data.total;
        this.count = res.data.count;
        this.noAdd = this.total - this.count;
        this.whiteList.forEach(item =>{
          if(item.guideCheck){
            this.result.push(item.id)
          }
        })
      });
    },
    /**
     * 继续添加身份证信息
     */
    goAddGuest() {
      let id = this.$route.params.id;
      this.$router.push({ name: "guide-id-enter", params: { id: id } });
    },
    // 返回订单列表
    returnToOrder() {
      this.$router.go(-1)
    },
    getUserInfo(){
      this.$http.get('/wap/user/info').then(({ data: res })=>{
         if(res.code != '200'){
            Toast(res.msg);
            return;
         }
         this.type = res.data.type
      })
    }
    // deleteHandle(item) {
    //   let name = item.name;
    //   let id = item.id;
    //   MessageBox.confirm(`确定删除${name}身份信息?`).then(action => {
    //     if (action === "confirm") {
    //       this.$http
    //         .delete(`/wap/cardNo/${id}`)
    //         .then(({ data: res }) => {
    //           console.log(id);
    //           if (res.code !== "200") {
    //             Toast(res.msg);
    //             return;
    //           }
    //           this.getWapIdCard();
    //           Toast("删除成功");
    //         })
    //         .catch(() => {
    //           Toast("服务器异常，请稍后再试");
    //         });
    //     }
    //     console.log(action);
    //   });
    // }
  }
};
</script>

<style lang="stylus"  rel="stylesheet/stylus">
@import '../../../assets/idCard-list.styl';
.van-cell__title{
  flex:0.4;
}
.van-cell__value{
  text-align:left;
}
.checkbox{
  margin-left:20px;
}
</style>
