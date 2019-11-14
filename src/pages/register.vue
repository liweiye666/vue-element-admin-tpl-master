<template>
<div class="fullscreen">
  <div class="register-box">
    <div style="text-align: center">
      <img src="../assets/logo.png" alt="" class="logo">
    </div>
    <p class="text-tips">你好，欢迎注册</p>
    <form action="" class="login-form">
      <div class="m-list-group">
        <div class="m-list-group-item"  v-if="isExit">
          <input type="text" placeholder="输入ID" class="m-input" v-model="sid" maxlength="12">
        </div>
        <div class="m-list-group-item" v-if="!isExit">
          <input type="text" placeholder="输入ID" class="m-input" v-model="id" maxlength="12">
        </div>
        <div class="m-list-group-item">
          <input type="text" placeholder="输入姓名" class="m-input" v-model="sname" maxlength="10">
        </div>
        <div class="m-list-group-item">
          <input type="password" placeholder="输入密码" class="m-input" v-model="pwd" maxlength="15">
        </div>

        <div class="m-list-group-item"  v-if="!isExit">
          <input type="text" placeholder="输入班级名" class="m-input" v-model="cname" maxlength="15">
        </div>

        <div class="m-list-group-item"  v-if="isExit">
          <input type="text" placeholder="输入学委的ID" class="m-input" v-model="id" maxlength="12">
        </div>
      </div>
      <div class="m-list-group-radio" v-model="ID" @change="isExist">
        <el-radio  label="xuewei" v-model="ID">学委</el-radio>
        <el-radio  label="student" v-model="ID">学生</el-radio>
      </div>
      <button class="m-btn sub select-none" @click.prevent="handleRegister" v-loading="isLogin">注册</button>
      <p class="text-tips">已经有账号？</p>
      <a href="/login" class="m-btn m-btn-text">登陆</a>
    </form>
  </div>
</div>
</template>
<script>

  import {registerMStudent, registerStudent,findStudent} from '../api/loginApi'

export default {

  name: 'register',

  data(){
    return{
      sid:'',
      sname:'',
      pwd:'',
      id:'',
      ID:'student',
      isExit:true,
      cname:'',
      isLogin:false
    }
  },

  created(){

    const h = this.$createElement;

    this.$notify({
      title: '注意事项',
      message: h('i', { style: 'color: gay'}, '学生用户在注册之前，你需要知道你们班级的学委学号，在注册输入ID时，请输入你的学号，已方便学委能够更好管理班级信息')
    });
  },


  methods:{
    handleRegister(){
      if(this.ID==='student'){
        if(!this.sid || !this.sname || !this.pwd || !this.id){
          return this.$message.warning("输入的内容不能为空！")
        }
        this.isLoging=true
        findStudent({
          sid:this.sid
        }).then(res=>{
          if(res===true){
            registerStudent({
              sid:this.sid,
              sname:this.sname,
              pwd:this.pwd,
              id:this.id
            }).then(result => {
                if(result===true){
                  this.$message.success("注册成功!")
                  this.$router.push({name:'login'})
                  this.isLoging = false
                }
                else{
                  this.$message.error("输入的学委ID不存在！")
                  this.isLoging = false
                }
            }).catch(error=>{
              console.log(error)
            })
          }
          else{
            this.$message.error("该学号已被注册，请重新输入!")
            this.isLoging = false
          }
        }).catch(error=>{
          console.log(error)
        })
      }
      else{
        if(!this.cname || !this.sname || !this.pwd || !this.id){
          return this.$message.warning("输入的内容不能为空！")
        }
        this.isLoging=true
        registerMStudent({
          id:this.id,
          sname:this.sname,
          pwd:this.pwd,
          cname: this.cname
        }).then(result => {
            if(result===true){
              this.$message.success("注册成功!")
              this.$router.push({name:'login'})
              this.isLoging = false
            }
            else {
              this.$message.error("该学号已被注册，请重新输入！")
              this.isLoging = false
            }
        }).catch(error=>{
            console.log(error)
        })
      }
    },

    isExist(){
      if(this.ID==='student')
        this.isExit=true
      else
        this.isExit=false
    }
  }
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
  .fullscreen{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .register-box{
    position: relative;
    width: 330px;
    margin: 0 auto;
    padding: 0px 15px;
  }
  .register-box .logo{
    max-width: 40%;
    margin-bottom: 30px;
  }
  .register-box .text-tips{
    text-align: center;
    color: #909DB7;
  }
  .register-box .m-input{
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    box-sizing: border-box;
  }
  .register-box .m-btn{
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
  .register-box .m-btn.m-btn-text{
    background: #fff;
    color: #36c1fa;
  }
  .register-box .m-btn:hover{
    background-color: #36c1fa;
  }
  .register-box .m-btn.m-btn-text:hover{
    background-color: #F4F5F5;
  }
  .register-box .m-btn:active{
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    .register-box{
      width: auto;
    }
  }

  .m-list-group-radio{
    margin-bottom: 20px;
  }
</style>
