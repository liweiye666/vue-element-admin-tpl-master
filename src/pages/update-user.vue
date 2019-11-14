<template>
  <div class="fullscreen">
    <div class="login-box">

      <div style="text-align: center">
        <img src="../assets/logo.png" alt="" class="logo">
      </div>
      <p class="text-tips" style="font-size: 30px">修 改 密 码</p>
      <form action="" class="login-form">
        <div class="m-list-group">
          <div class="m-list-group-item">
            <input type="text" placeholder="输入ID" class="m-input" v-model="username"
                   maxlength="12">
          </div>
          <div class="m-list-group-item">
            <input type="password" placeholder="输入新密码" class="m-input" v-model="password1"
                   maxlength="15">
          </div>
          <div class="m-list-group-item">
            <input type="password" placeholder="确认密码" class="m-input" v-model="password2"
                   maxlength="15">
          </div>
        </div>

        <button class="m-btn sub select-none" @click.prevent="updateP" v-loading="isLoging">提交</button>
      </form>
      <div style="margin-top: 50px"></div>
    </div>
  </div>
</template>
<script>


  import {mapActions} from 'vuex'
  import {login1} from '@/api/loginApi'
  import {login2, updatePWD, updateSPWD} from '../api/loginApi'
  export default{
    name: 'update-user',
    data () {
      return {
        username: this.$store.state.user.user.username,
        password1: '',
        password2: '',
        id: this.$store.state.user.user.ID,
        isLoging: false,
        author: window.APP_INFO.author,
        version: window.APP_INFO.version,
        appName: window.APP_INFO.appName,
      }
    },

    methods: {
      updateP () {
          if(!this.password2 || !this.password1 || !this.username){
            return this.$message.error("输入内容不能为空")
          }
          if(this.password1!==this.password2){
            return this.$message.error("输入密码不一致")
          }
          this.$confirm('是否确认提交', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.isLoging=true
            if(this.id==='menus'){
              updatePWD({
                id: this.$store.state.user.user.username,
                pwd: this.password1,
              }).then(result => {
                if(result===true){
                  this.isLoging=false
                  this.$router.push({name:'login'})
                  return this.$message.success("修改成功，请重新登录")
                  console.log("这是学委")
                }
                else {
                  this.isLoging=false
                  return this.$message.error("用户不存在")
                }
              }).catch(error=>{
                this.isLoging=false
                console.log(error)
              })
            }
            else{
              updateSPWD({
                sid: this.$store.state.user.user.username,
                pwd: this.password2
              }).then(result => {
                if(result===true){
                  this.isLoging=false
                  this.$router.push({name:'login'})
                  return this.$message.success("修改成功，请重新登录")
                  console.log("这是学生")
                }
                else {
                  this.isLoging=false
                  return this.$message.error("用户不存在")
                }
              }).catch(error=>{
                this.isLoging=false
                console.log(error)
              })
            }
          }).catch(() => {
        });
      }
    },

  }
</script>
<style type="text/css">
  .m-list-group{
    border-radius: 3px;
    padding: 0;
    margin: 0 0 20px;
  }
  .m-list-group .m-list-group-item{
    position: relative;
    display: block;
    padding: 6px 10px;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #e7ecee;
  }
  .m-list-group .m-list-group-item:first-child{
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .m-list-group .m-list-group-item:last-child{
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .m-list-group-radio{
    margin-bottom: 20px;

  }

  .fullscreen{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #F4F5F5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-box{
    position: relative;
    width: 330px;
    margin: 0 auto;
    padding: 0px 15px;

  }
  .login-box .logo{
    max-width: 40%;
    margin-bottom: 30px;
  }
  .login-box .text-tips{
    text-align: center;
    color: #909DB7;
    font-size: 1.25rem;
  }
  .login-box .m-input{
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    box-sizing: border-box;
  }
  .login-box .m-btn{
    font-size: 18px;
    width: 100%;
    color: #fff;
    background-color: #36c1fa;
    display: inline-block;
    padding: 10px 12px;
    margin-bottom: 5px;
    line-height: 1.42857143;
    text-align: center;
    cursor: pointer;
    outline: none;
    border-radius: 2px;
    border: 1px solid #36c1fa;
    box-sizing: border-box;
    text-decoration: none;
  }
  .login-box .m-btn.m-btn-text{
    background: #fff;
    color: #36C1FA;
  }
  .login-box .m-btn:hover{
    background-color: #2DB7F5;
  }
  .login-box .m-btn.m-btn-text:hover{
    background-color: #F4F5F5;
  }
  .login-box .m-btn:active{
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    .login-box{
      width: auto;
    }
  }
</style>
