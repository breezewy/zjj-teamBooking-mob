<template>
    <div class="idCard-enter-container">
      <header class="header">
        <h1>完善旅客信息</h1>
        <i @click="back" class="cubeic-back"></i>
      </header>
      <div class="wrapper">
        <div class="upload-mask" v-show="mask" @click="maskClick">
        </div>

        <!--<cube-upload-->
          <!--ref="upload"-->
          <!--v-model="files"-->
          <!--:action="action"-->
          <!--@files-added="addedHandler"-->
          <!--@file-error="errHandler">-->
          <!--<div class="clear-fix">-->
            <!--<cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>-->
            <!--<cube-upload-btn :multiple="false">-->
              <!--<div>-->
                <!--<i>＋</i>-->
                <!--<p>拍照识别身份信息</p>-->
              <!--</div>-->
            <!--</cube-upload-btn>-->
          <!--</div>-->
        <!--</cube-upload>-->





        <!--<div class="add_btn">-->
          <!--<div class="card_btn" @click="goAddGuest()">-->
            <!--<i class="iconfont icon-zhaoxiangji" style="font-size: 34px;vertical-align: middle"></i>-->
            <!--<span class="card_txt">拍照识别证件信息</span>-->
          <!--</div>-->
        <!--</div>-->

        <!--@files-added="filesAdded"-->
        <cube-upload
          ref="upload"
          v-model="files"
          :action="action"
          :simultaneous-uploads="1"
          :multiple="false"
          @file-success="fileSuccess"
        :process-file="processFile"
        @file-submitted="fileSubmitted"
          @file-error="errHandler">
          <div class="clear-fix">
            <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
            <cube-upload-btn :multiple="false">
              <!--<div>-->
                <!--<i>＋</i>-->
                <!--<p>Please click to upload ID card</p>-->
              <!--</div>-->
              <div class="add_btn">
                <div class="card_btn" @click="goAddGuest()">
                  <span class="iconfont icon-zhaoxiangji" style="font-size: 34px;vertical-align: middle"></span>
                  <span class="card_txt">拍照识别证件信息</span>
                </div>
              </div>
            </cube-upload-btn>
          </div>
        </cube-upload>
        <ul class="edit_list">
          <li class="edit_item">
            <label for="">联系人</label>
            <input class="list_in" type="text" v-model="order.name" placeholder="请填写姓名">
            <!--<i class="iconfont icon-add-date"></i>-->
          </li>
          <li class="edit_item">
            <label for="">手机号</label>
            <input class="list_in" type="text" v-model="order.mobile" placeholder="请填写手机号">
            <!--<i class="iconfont icon-add-date"></i>-->
          </li>
          <li class="edit_item">
            <label for="">证件类型</label>
            <select class="list_in select-cerType"  v-model="order.type" @change="changeFile">
              <option :value="0">身份证</option>
              <option :value="1">护照</option>
              <option :value="2">港澳通行证</option>
              <option :value="3">军官证</option>
              <option :value="4">学生证</option>
            </select>
            <!--<i class="iconfont icon-add-date"></i>-->
            <div class="triangle_border_right">
            </div>

          </li>
          <li class="edit_item">
            <label for="">{{fileText}}</label>
            <input class="list_in" type="text" v-model="order.cardNo" :placeholder="placeText">
            <i class="iconfont icon-add-date"></i>
          </li>
        </ul>
        <div class="edit_btn">
          <div class="order_btn" @click="addGuest">
            <i class="iconfont icon-tianjia"></i>
            <span class="on_add">添加旅客</span>
          </div>
          <div class="order_btn" @click="completeGuest()">
            <i class="iconfont icon-wancheng"></i>
            <span class="on_complete">查看旅客列表</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { Toast,Indicator } from 'mint-ui'
  import compress from '@/utils/compress'
  // import
  import {isMobile,IdentityCodeValid,isPassport,HongKongAndMacaoPass,CertificateOfOfficers} from "../../utils/validation";
  export default {
    name: "idCard-enter",
    data(){
      return {
        action:{
          target: process.env.API_ROOT+'/wap/upload',
          prop: 'base64Value'
        },
        files: [],
        order:{
          name:'',
          mobile:'',
          type: 0,
          cardNo:''
        },
        fileText:'身份证',             //证件文本
        placeText:'请填写身份证',         //证件文本的placeholder
        headerUpload:{},
        // mask:false,              //遮罩层
        // getUploadData:{
        //   idCard:'',
        //   name:'',
        // }
        //测试图片上传
        imgList:[],


      }
    },
    computed:{
      mask(){
        if(this.order.type != 0){
          return true
        }
        return false
      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      maskClick(){
        if(this.mask){
          Toast('只有身份证件可进行拍照录入')
        }
      },
      processFile(file, next) {
        compress(file, {
          compress: {
            width: 200,
            height: 200,
            quality: 0.5
          }
        }, next)
      },
      fileSubmitted(file) {
        file.base64Value = file.file.base64
        // console.log(file)
      },

      addedHandler() {
        // Indicator.open({
        //   text: '录入中...',
        //   spinnerType: 'snake'
        // });
        const file = this.files[0]
        file && this.$refs.upload.removeFile(file)
      },
      filesAdded(files) {
        let hasIgnore = false;
        const limitSize = 1 * 1024;
        // 最大5M
        const maxSize = 5 * 1024 * 1024;
        for (let i = 0; i< files.length; i++) {
          const file = files[i];
          // 如果选择的图片大小最大限制（这里为5M）则弹出提示
          if(file.size > maxSize){
            file.ignore = true;
            hasIgnore = true;
            break;
          }
          // 如果选择的图片大小大于1M则进行图片压缩处理（Base64）
          if(file.size > limitSize){
            this.compressPic(file);
          }else{
            let reads= new FileReader();
            reads.readAsDataURL(file);
            let that = this;
            reads.onload = function(e) {
              var bdata = this.result;
              that.imgList.push(bdata)
            }
          }
        }
        hasIgnore && this.$createToast({
          type: 'warn',
          time: 1000,
          txt: '图片最大支持5M'
        }).show()
      },
      compressPic(file){
        let reads= new FileReader();
        reads.readAsDataURL(file)
        // 注意这里this作用域的问题
        let that = this;
        reads.onload = function(e) {
          var bdata = this.result;
          // 这里quality的范围是（0-1）
          var quality = 0.1;
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          var img = new Image();
          img.src = bdata;
          img.onload =function() {
            var width = img.width;
            canvas.width = width;
            canvas.height = width * (img.height / img.width);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            let data = canvas.toDataURL("image/jpeg",quality);
            that.imgList.push(data)
            console.log(that.imgList)
          }
        };
      },



      fileSuccess(file){
        Indicator.close();
        if(file.response.code !== '200'){
          this.order.name = ''
          this.order.cardNo = ''
          this.$createToast({
            type: 'error',
            txt: file.response.msg,
          }).show()
          return
        }
        let data = file.response.data
        this.order.name = data.name
        this.order.cardNo = data.idCard
      },
      errHandler(file) {
        Indicator.close();
        this.order.name = ''
        this.order.cardNo = ''
        // const msg = file.response.message
        this.$createToast({
          type: 'warn',
          txt: '上传失败',
          time: 1000
        }).show()
      },
      /**
       * 类型转换
       */
      changeFile(e){

        let value= e.target.value
        if(value == 0) {
          this.fileText ='身份证'
          this.placeText = '请填写身份证'
        }else if(value==1){
          this.fileText ='护照'
          this.placeText = '请填写护照'
        }else if(value ==2){
          this.fileText ='港澳通行证'
          this.placeText = '请填写港澳通行证'
        }else if(value==3){
          this.fileText ='军官证'
          this.placeText = '请填写军官证'
        }else if(value==4){
          this.fileText ='学生证'
          this.placeText = '请填写学生证'
        }
        this.order.cardNo = ''
      },

      /**
       * 添加旅客完成
       */
      completeGuest(){
        let id = this.$route.params.id
        this.$router.push({ name: 'idCard-list', params: { id:  id}})
      },
      addGuest(){
        // console.log(this.order.type)
        // console.log(typeof (this.order.type))
        if(!this.order.name){
          Toast('请输入姓名')
          return
        }
        if(this.order.mobile!==''&& !isMobile(this.order.mobile) ){
          Toast('手机号格式不正确')
          return
        }
        if(this.order.type===0){
          if(!IdentityCodeValid(this.order.cardNo)){
            Toast('身份证格式不正确')
            return
          }
        }else if(this.order.type===1){
          if(!isPassport(this.order.cardNo)){
            Toast('护照格式不正确')
            return
          }
        }else if(this.order.type===2){
          if(!HongKongAndMacaoPass(this.order.cardNo)){
            Toast('港澳通行证格式不正确')
            return
          }
        }else if(this.order.type ===3){
          if(!CertificateOfOfficers(this.order.cardNo)){
            Toast('军官证格式不正确')
            return
          }
        }

        let id = this.$route.params.id
        let data={
          id:id,
          // cardRequestList:{
          name:this.order.name,
          mobile:this.order.mobile,
          type:this.order.type,
          cardNo: this.order.cardNo
          // }
        };
        this.$http.post('/wap/addIdCard',data).then(({ data: res }) => {
          if(res.code !== '200'){
            Toast(res.msg)
            return;
          }
          Toast(res.data+'录入成功');
          this.order.name='';
          this.order.mobile=''
          this.order.cardNo=''

        }).catch(() => {

        })
      }
    }
  };
</script>


<style lang="stylus"  rel="stylesheet/stylus">
  @import "./../../assets/idCard-enter.styl"
  .idCard-enter-container
    .cube-upload
      position relative
      z-index:5
      top: 0
      left:0
      margin 30px 10px;
      .cube-upload-file, .cube-upload-btn
        margin: 0
        height: 50px
      .cube-upload-file
        display none;
        margin: 0
        + .cube-upload-btn
          //margin-top: -200px
          opacity: 1
          ///*display none*/
      .cube-upload-file-def
        //width: 120px
        //height: 80px
        width: 100%
        height: 100%
        background-size:100% auto
      .cube-upload-btn
        display: flex
        align-items: center
        justify-content: center
        > div
          text-align: center
        i
          display: inline-flex
          align-items: center
          justify-content: center
          width: 50px
          height: 50px
          margin-bottom: 20px
          font-size: 32px
          line-height: 1
          font-style: normal
          color: #fff
          background-color: #333
          border-radius: 50%



</style>
