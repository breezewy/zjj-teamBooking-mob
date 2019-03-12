<template>
  <div class="cube-page my-upload-team-order upload-view-def" >

    <header class="header">
      <h1>Upload</h1>
      <i @click="back" class="cubeic-back"></i>
    </header>
    <div class="wrapper">
      <!--<section v-show="desc" class="desc"><slot name="desc">{{desc}}</slot></section>-->
      <main class="content">
        <!--<slot name="content">{{content}}</slot>-->
        <!--<p>Normal upload(File max size 1MB): </p>-->
        <!--:action="baseUrl+'/wap/upload/'+orderNo"-->
        <p style="margin: 20px 0;">身份证上传(最 大 2MB) </p>
        <div>
          <cube-upload ref="upload"
                       v-model="files"
                       :action="action"
                       :simultaneous-uploads="20"
                       @files-added="filesAdded"
                       :auto="false"
                       @file-success="filesSuccess"
                       @file-error="filesError"
                       @file-removed="filesRemove"

          >
            <div class="cube-upload-def clear-fix">
              <my-cube-file v-for="(file, i) in files" :file="file" :key="i"></my-cube-file>
              <cube-upload-btn></cube-upload-btn>
            </div>
          </cube-upload>
          <cube-button @click="btnUpload">上传</cube-button>
          <cube-button @click="removeUpload">全部清除</cube-button>
        </div>
      </main>
      <p style="margin: 50px 0 20px 0;font-size: 20px;" v-if="whiteList.length">上传成功身份证</p>
      <div class="white-list-container">
        <ul class="white-list clearfix">
          <!--<li style="width: 50%">刘友友</li>-->
          <!--<li>刘玉军</li>-->
          <li v-for="(item,index) in whiteList">
            <span style="display: inline-block">{{index+1}}</span>
            <span style="display: inline-block;margin-left: 25px;margin-right: 25px;">{{item}}</span>
            <i class="cubeic-right" style="color:green"></i>
          </li>
        </ul>
        <!--<div class="loading-container" >-->
          <!--&lt;!&ndash;<loading></loading>&ndash;&gt;-->
          <!--<cube-loading :size="28"></cube-loading>-->
        <!--</div>-->
      </div>


    </div>
  </div>

</template>

<script>
  import myCubeFile from '@/base/my-cube-file'


  export default {
    name: "upload",
    components:{
      myCubeFile,
      // myCubeBtn
    },
    data(){
      return {
        msg: 'Welcome to Your Vue.js App',
        toastTxt: 'cube toast content',
        orderNo:'444666',
        baseUrl:process.env.API_ROOT,
        files:[],
        isFirstError: true,
        errorArray:[],
        str:'',
        action:{
          target: process.env.API_ROOT+'/wap/upload/'+this.$route.params.orderNo,
        },
        counter:0,

        whiteList:[],
        isFirstRequest: true
      }
    },
    created(){
      this.getWapIdCard()
    },
    methods:{

      getWapIdCard(){
        const orderNo = this.$route.params.orderNo
        this.$http.get(`/wap/idCard/${orderNo}`).then(({ data: res }) => {
          console.log(res)
          if (res.code !== '200') {
            return;
          }
          this.whiteList = res.data
        })
      },
      removeUpload(){
        // this.$refs.upload.removeFile()
        this.files = []
      },
      btnUpload() {
          this.$refs.upload.retry()
      },
      filesError(file){




        this.errorArray = [];

        if(this.files.length){
          // for(const value of this.files){
          //   if(value.status ==='error'){
          //     this.errorArray.push(JSON.parse(value._xhr.response))
          //   }
          // }
          for(var j=0;j<this.files.length;j++){
            if(this.files[j].status ==='error'){
              this.errorArray.push(JSON.parse(this.files[j]._xhr.response))
            }
          }
         if(j==this.files.length){
           this.str= ''
           for(var i =0;i<this.errorArray.length;i++){
             this.str += this.errorArray[i].data +''+ this.errorArray[i].msg+ "<br/>";
           }

           // console.log(this.errorCounter/2 + this.correctCounter)
           // console.log(this.files.length)
           if(i==this.errorArray.length){
                this.$createDialog({
                  type: 'alert',
                  title: '',
                  content: this.str,
                  icon: 'cubeic-alert'
                }).show()




           }
         }

        }

      },
      filesRemove(files){
        // let deleteFiles = this.files.splice(this.files.indexOf(files),1);
        // console.log(deleteFiles)
        // this.errorArray = [];
        // if(this.files.length){
        //   for(const value of this.files){
        //     if(value.status ==='error'){
        //       this.errorArray.push(JSON.parse(value._xhr.response))
        //     }
        //   }
        //   this.str= ''
        //   for(let i =0;i<this.errorArray.length;i++){
        //     this.str += this.errorArray[i].data +''+ this.errorArray[i].msg+ "<br/>";
        //   }
        //
        // }else{
        //   this.str =''
        // }
      },
      filesSuccess(files){
        this.getWapIdCard()
        // this.$refs.upload.pause()

        // if(files.response.code!=='200'){
        //   this.$refs.upload.removeFile(files)
        // }
      },
      showToast () {
        this.$createToast({
          txt: this.toastTxt
        }).show()
      },
      filesAdded(files) {

        let hasIgnore = false
        const maxSize = 2 * 1024 * 1024 // 1M
        for (let k in files) {
          const file = files[k]
          if (file.size > maxSize) {
            file.ignore = true
            hasIgnore = true
          }
        }
        hasIgnore && this.$createToast({
          type: 'warn',
          time: 1000,
          txt: 'You selected >2M files'
        }).show()
        this.$refs.upload.pause()
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../node_modules/cube-ui/src/common/stylus/variable.styl"
  .cube-page
    position: absolute
    z-index: 10
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #efeff4
    .header
      position: relative
      height: 44px
      line-height: 44px
      text-align: center
      background-color: #edf0f4
      box-shadow: 0 1px 6px #ccc
      -webkit-backface-visibility: hidden
      backface-visibility: hidden
      z-index: 5
      h1
        font-size: 16px
        font-weight: 700
      .cubeic-back
        position: absolute
        top: 0
        left: 0
        padding: 0 15px
        color: #fc9153
    >.wrapper
      height: calc(100% - 44px)
      overflow-x: hidden
      overflow-y: auto
      // -webkit-overflow-scrolling: touch
      .desc
        padding: 10px
        margin: 10px 0
        line-height: 20px
        font-size: 14px
      .content
        margin: 10px
    &.option-demo
      .wrapper
        background-color: $color-white
      .title
        font-size: $fontsize-large
        font-weight: 500
        color: $color-dark-grey
        padding: 15px
        border-bottom: 1px solid rgba(0, 0, 0, .1)
        margin-bottom: 15px
      .options
        margin-bottom: 15px
      .option-list
        .group
          margin-bottom: 15px
          border: 1px solid rgba(0, 0, 0, .1)
          border-radius: $radius-size-medium
        .item
          height: 52px
          border-bottom: 1px solid rgba(0, 0, 0, .1)
          &.sub
            font-size: $fontsize-medium
            background-color: $color-light-grey-opacity
            &.first
              box-shadow: 0 1px 1px 1px #eee inset
            &.last
              border-bottom: none
      .demo
        margin-bottom: 15px
      .methods
        .method-list
          .group
            margin-bottom: 15px
            border: 1px solid rgba(0, 0, 0, .1)
            border-radius: $radius-size-medium
          .item
          button
            height: 40px
            font-size: $fontsize-large
          .item
            background-color: $color-active-light-gray
            border-bottom: 1px solid rgba(0, 0, 0, .1)
          button
            width: 100%
            border-bottom-left-radius: $radius-size-medium
            border-bottom-right-radius: $radius-size-medium
            background-color: $color-orange
            box-shadow: 0 0 0 1px $color-orange
            border: none
            outline: none
            color: $color-white
  .upload-view-def
    .content
      >
      p, div
        margin: 20px 0
      div
        .cube-btn, .cube-upload
          margin: 10px 0
  .white-list
    margin: 10px
    li
      line-height:1.2

  /*float:left*/
      /*width 50%*/
  .clearfix
    zoom:1
  .clearfix:after
    visibility:hidden
    display:block
    font-size:0
    content: ' '
    clear:both
    height:0

</style>
<style lang="stylus" rel="stylesheet/stylus">
  .my-upload-team-order
    .cube-loading-spinners
      margin 0 auto

  .cube-dialog-main
    .cube-dialog-content-def
      p
        word-break:break-all
</style>



