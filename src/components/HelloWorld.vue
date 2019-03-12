<template>
  <div class="hello">
    <!--<h1>{{ msg }}</h1>-->
    <!--<h2>Essential Links</h2>-->
    <!--<ul>-->
      <!--<li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>-->
      <!--<li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>-->
      <!--<li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>-->
      <!--<li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>-->
      <!--<br>-->
      <!--<li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>-->
    <!--</ul>-->
    <!--<h2>Ecosystem</h2>-->
    <!--<ul>-->
      <!--<li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>-->
      <!--<li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>-->
      <!--<li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>-->
      <!--<li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>-->
    <!--</ul>-->
    <cube-button @click="showToast">show toast</cube-button>
    <br/>
    <br/>
    <br/>
    <br/>


    <cube-upload ref="upload"
                 v-model="files"
      :action="baseUrl+'/wap/upload/'+orderNo"
      :simultaneous-uploads="20"
      @files-added="filesAdded"
      :auto="false"
      @file-success="filesSuccess"
      @file-error="filesError"
      @file-removed="filesRemove"
       :data="fileData"
    >
      <div class="cube-upload-def clear-fix">
        <my-cube-file v-for="(file, i) in files" :file="file" :key="i"></my-cube-file>
        <cube-upload-btn></cube-upload-btn>
      </div>


    </cube-upload>
    <br>
    <div class="btn" @click="btnUpload()">上传</div>
  </div>
</template>

<script>
  import { STATUS_SUCCESS, STATUS_ERROR } from '@/utils/constant'
  import myCubeFile from '@/base/my-cube-file'
  // const COMPONENT_NAME = 'cube-upload-file'
  const STATUS_CLASS_MAP = {
    success: 'cubeic-right',
    error: 'cubeic-warn'
  }
  const EVENT_CLICK = 'click'
export default {
  name: 'HelloWorld',
  components:{
    myCubeFile
  },
// /wap/upload/{id}
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      toastTxt: 'cube toast content',
      orderNo:'444666',
      baseUrl:process.env.API_ROOT,
      fileList:[],
      fileData:{
        imgName:''
      },
      imgName:'',
      fileArray:[],
      files:[]
    }
  },
  computed:{
    fileStatusCls() {
      const file = this.file
      const status = file.status
      if (file.progress >= 0.01 || status === STATUS_SUCCESS || status === STATUS_ERROR) {
        return 'cube-upload-file_stat'
      }
    },
    fileStyle() {
      const url = this.file.url || this.file.base64
      if (!url) {
        return
      }
      return {
        'background-image': `url("${url}")`
      }
    },
    statusCls() {
      const status = this.file.status
      return STATUS_CLASS_MAP[status]
    },
    fileProgress() {
      if (this.statusCls) {
        return '100%'
      }
      const p = Math.min(Math.floor(this.file.progress * 100), 99)
      return `${p}%`
    }
  },

  methods: {
    //内置需求


   btnUpload() {
     // console.log(this.$refs.upload.files)
      this.$refs.upload.start()
    },
    filesError(file){
     let response = JSON.parse(file._xhr.response)
        console.log(response)
        console.log(response.data)
    },
    filesRemove(files){

    },
    filesSuccess(files){
      // this.$refs.upload.pause()
     console.log(files)
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

      console.log(files)
      let hasIgnore = false
      const maxSize = 1 * 1024 * 1024 // 1M
      for (let k in files) {
        const file = files[k]
        // this.imgName = file.name + new Date().getTime()                               //添加的
        // this.imgName = file.name
        // 添加的
        this.imgName = file.name
        this.fileArray.push(file.name)
        console.log(this.imgName)
        console.log(this.$refs.upload.files)
        // console.log(file)
        if (file.size > maxSize) {
          file.ignore = true
          hasIgnore = true
        }
      }
      console.log(this.fileArray)
      hasIgnore && this.$createToast({
        type: 'warn',
        time: 1000,
        txt: 'You selected >1M files'
      }).show()
      this.$refs.upload.pause()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    background-color: #000;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
  .btn{
    display: block;
    margin: 0 auto;
    background: green;
    width: 100px;
    height: 44px;
    color:#fff;
    text-align: center;
    line-height: 44px;

  }
</style>
<!--<style lang="stylus" rel="stylesheet/stylus">-->
  <!--.upload-view-custom-->
    <!--.content-->
      <!--&gt;-->
      <!--p, div-->
        <!--margin: 20px 0-->
  <!--.upload-view-custom-main-->
    <!--background-color: #fff-->
    <!--.cube-upload-->
      <!--.cube-upload-file, .cube-upload-btn-->
        <!--margin: 0-->
        <!--height: 200px-->
      <!--.cube-upload-file-->
        <!--margin: 0-->
        <!--+ .cube-upload-btn-->
          <!--margin-top: -200px-->
          <!--opacity: 0-->
      <!--.cube-upload-file-def-->
        <!--width: 100%-->
        <!--height: 100%-->
        <!--.cubeic-wrong-->
          <!--display: none-->
      <!--.cube-upload-btn-->
        <!--display: flex-->
        <!--align-items: center-->
        <!--justify-content: center-->
        <!--&gt; div-->
          <!--text-align: center-->
        <!--i-->
          <!--display: inline-flex-->
          <!--align-items: center-->
          <!--justify-content: center-->
          <!--width: 50px-->
          <!--height: 50px-->
          <!--margin-bottom: 20px-->
          <!--font-size: 32px-->
          <!--line-height: 1-->
          <!--font-style: normal-->
          <!--color: #fff-->
          <!--background-color: #333-->
          <!--border-radius: 50%-->
<!--</style>-->
