<template>
    <div class="container">
        <div class="infoBox">
            <mt-field placeholder="请输入身份证"  v-model="idCard"></mt-field>
            <mt-button type="primary" size="large" class="btn" @click.native="submitId">确认提交</mt-button>
        </div>
    </div>
</template>

<script>
import {IdentityCodeValid} from '../../utils/validation'
import { Field } from 'mint-ui';
import { Button } from 'mint-ui';
import { Toast } from  'mint-ui'

import Vue from 'vue'
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
export default {
    name:'collectId',
    data(){
        return {
            idCard:''
        }
    },
    methods:{
        submitId(){
            // 正则验证身份证号码
            if(!IdentityCodeValid(this.idCard)){
                Toast('身份证格式不正确！')
                return
            }
            this.$http.put('/wap/guide/updateGuideIdCard',{
                "idCard":this.idCard
            }).then(res=>{
                if(res.data.code==500){
                    // Toast(res.data.msg)
                    return
                }
                Toast({
                    message: '验证成功！',
                });
                this.$router.go(-1)
            }).catch(err=>{
                Toast(err)
            })
        }
    }
}
</script>

<style scoped>
    .container{
        background:#eee;
        height:100vh;
    }
    .infoBox{
        padding:50px;
    }
    .btn{
        margin-top:20px;
    }
</style>