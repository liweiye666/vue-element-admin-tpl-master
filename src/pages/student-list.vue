<template>
  <div class="page-body">
    <div class="page-header">
      <h1 class="page-title">我的班级：{{classname}}</h1>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item >学生信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-autocomplete
      class="inline-input"
      v-model="inputName"
      :fetch-suggestions="querySearch"
      size="mini"
      placeholder="请输入学生姓名">
    </el-autocomplete>

    <el-button
      type="primary"
      size="mini"
      @click="selectName()"
    >
      查询
    </el-button>

    <div style="margin-bottom: 15px"></div>

    <div class="box">
      <el-table
        :data="studentTable"
        stripe
      >
        <el-table-column
          prop="sname"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sid"
          label="ID"
          width="180"
        >
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>

  import {studentList, findCName, selectStudent, selectSName} from '../api/loginApi'

  export default{

    inject: ['reload'],

    data(){
      return{
        csvList:[],
        inputName: '',
        classname:'',
        studentTable:[]
      }
    },


    created () {
      this.init();
      this.find();
    },

    mounted(){
      selectSName({
        id:this.$store.state.user.user.username,
      }).then(result => {
        this.csvList=result
      })
    },

    watch:{
      inputName:{
        handler: function() {
          this.csvS = [];//这是定义好的用于存放下拉提醒框中数据的数组
          var len = this.csvList.length;//csvList是页面初始化时得到的初始全部数据
          var arr = [];
          for (var i = 0; i < len; i++) {//根据输入框中inputName的值进行模糊匹配
            if (this.csvList[i].indexOf(this.inputName) >= 0) {
              arr.push(this.csvList[i]);//符合条件的值都放入arr中
            }
          }

          //el-autocomplete元素要求数组内是对象，且有value属性，此处做一个格式调整
          for (var i = 0; i < arr.length; i++) {
            var obj = { value: "" };
            obj.value = arr[i];
            this.csvS.push(obj);
          }
        }
      }
    },

    methods: {

      init(){
        studentList({
          id:this.$store.state.user.user.username,
        }).then(result => {
          this.studentTable=result
        }).catch(error=>{
          console.log(error)
        })
      },

      //根据学生名查找学生
      selectName(){
        if(!this.inputName){
          this.init();
          this.reload()
        }else{
          selectStudent({
            sname: this.inputName
          }).then(result => {
            console.log(result)
            this.studentTable=result
          }).catch(error=>{
            console.log(error)
          })
        }
      },

      find(){
        findCName({
          id: this.$store.state.user.user.username
        }).then(result => {
          this.classname=result
        }).catch(error=>{
          console.log(error)
        })
      },

      //根据关键字查找学生的姓名
      querySearch(queryString, cb) {
        var csvS = this.csvS;
        cb(csvS);
      }
    }
  }
</script>

<style scoped>

</style>
