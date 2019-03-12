<template>
  <div class="header">
    <h1>{{title}}</h1>
    <!--<i @click="back" class="cubeic-back"></i>-->
  </div>
</template>

<script>
  export default {
    name: "vtop",
    props:{
      title: String,
      default:''
    },
    data(){
      return {

      }
    },
    methods:{

    }
  };
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  .header
    position: relative;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #edf0f4;
    box-shadow: 0 1px 6px #ccc;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 5;
    h1
      font-size: 16px
      font-weight: 700;
    .cubeic-back
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 15px;
      color: #fc9153;
      font-size: 16px
</style>
