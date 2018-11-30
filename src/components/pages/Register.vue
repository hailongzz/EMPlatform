<template>
    <div>
       <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        />
        <div class="register-panel">
        <van-field
            :error-message="usernameErrorMsg"
            v-model="username"
            label="用户名"
            icon="clear"
            placeholder="请输入用户名"
            required
            @click-icon="username = ''"
        />
        <van-field
            :error-message="passwordErrorMsg"
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
        />
        <div class="register-button">
            <van-button type="primary" size="large" :loading="openLoading" @click='registerAction'>马上注册</van-button>
        </div>
       </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {Toast} from 'vant'
    import url from '@/serviceAPI.config.js'
    export default {
        data() {
            return {
                username: '',
                password: '',
                openLoading:false,
                usernameErrorMsg:'',   //当用户名出现错误的时候
                passwordErrorMsg:'',   //当密码出现错误的时候
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            },
            axiosRegisterUser(){
                axios({
                    url:url.registerUser,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password,
                        usernameErrorMsg:'',   //当用户名出现错误的时候
                        passwordErrorMsg:'',   //当密码出现错误的时候
                    }
                })
                .then((response) => {
                    if(response.data.code == 200){
                        Toast.success('注册成功')
                        this.$router.push('/login')
                    }else{
                         console.log(response.data.message)
                        Toast.fail('注册失败')
                        this.openLoading=false
                    }
                    console.log(response.data.code)
                })
                .catch((error)=>{
                   Toast.fail('注册失败') 
                   this.openLoading=false
                   console.log(error) 
                })
            },
            checkForm(){
                let isOk= true
                if(this.username.length<5){
                    this.usernameErrorMsg="用户名不能小于5位"
                    isOk= false
                }else{
                    this.usernameErrorMsg=''
                }
                if(this.password.length<6){
                    this.passwordErrorMsg="密码不能少于6位"
                    isOk= false
                }else{
                    this.passwordErrorMsg=''
                }
                return isOk
            },
            registerAction(){
                console.log(1)
                 this.checkForm() && this.axiosRegisterUser()
            }
            
        }
    }
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    };
    .register-button{
        padding-top:10px;
    }
</style>