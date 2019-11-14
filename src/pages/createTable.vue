<template>
  <div class="page-body">
    <div class="page-header">
      <h1 class="page-title">发布作业</h1>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item >发布作业</el-breadcrumb-item>
      </el-breadcrumb>
  </div>

  <div class="box">
    <div class="demo-input-suffix">
      作业名：
      <el-input
        id="wname"
        style="width: 200px"
        placeholder="输入作业名"
        v-model="wname"
      >
      </el-input>
    </div>

    <div class="demo-input-suffix">
      <div class="block">
        发布日期：
        <el-date-picker
          id="startTime"
          v-model="startTime"
          type="date"
          style="width: 200px"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>
    <div class="demo-input-suffix">
      <div class="block">
        截止日期：
        <el-date-picker
          id="endTime"
          v-model="endTime"
          type="date"
          style="width: 200px"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>

    <div class="demo-input-suffix1">
      <div style="margin-bottom: 20px">作业内容：</div>
      <el-input
        id="wcontent"
        type="textarea"
        :autosize="{ minRows: 10, maxRows: 12}"
        placeholder="请输入内容"
        v-model="wcontent">
      </el-input>
    </div>


    <div style="margin: 20px 0;"></div>

    <el-button
      type="primary"
      size="small"
      style="text-align: -moz-right"
      @click.prevent="addWork"
    >提交</el-button>
  </div>

 </div>
</template>


<script>

  import {insertWork} from '../api/loginApi'

  export default {

    inject: ['reload'],

    data () {
      return {
        wname:'',
        startTime:'',
        endTime:'',
        wcontent:''
      }
    },

    methods:{
      addWork(){
        this.$confirm('是否提交该作业?','提示',{
          confirmButtonText:'是',
          cancelButtonText:'否',
          type:'warning',
          center:true
        }).then(()=>{
          if(this.startTime>this.endTime){
            return this.$message.warning("发布日期不能大于截止日期")
          }
          insertWork(
            {
              wname: this.wname,
              wcontent: this.wcontent,
              startTime: this.startTime,
              endTime: this.endTime,
              id: this.$store.state.user.user.username
            }
          ).then(result => {
            if(result===true){
              this.$message.success("提交成功")
              this.reload()
            }
            else
              return this.$message.warning("提交内容不能为空")
          }).catch(error=>{
            console.log(error)
          })
        }).catch(()=>{
        });
      }
    }
  }

</script>

<style>
  .box-body{
    width: 100%;
    overflow: auto;
  }
  .demo-input-suffix{
      margin-bottom: 20px;
      font-size: 15px;
  }
  .demo-input-suffix1{
    font-size: 15px;
    height: auto;
    width: 700px;
  }
</style>
