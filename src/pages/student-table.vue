<template xmlns:word-break="http://www.w3.org/1999/xhtml">
<div class="page-body">
  <div class="page-header">
    <h1 class="page-title">我的班级：{{classname}}</h1>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item >作业信息</el-breadcrumb-item>
      <!-- <el-input placeholder="请输入作业名" size="small" v-model="wname"></el-input>
      <el-button type="infor" size="mini">查询</el-button> -->
    </el-breadcrumb>
  </div>

  <el-autocomplete
    class="inline-input"
    v-model="inputName"
    :fetch-suggestions="querySearch"
    size="mini"
    placeholder="请输入作业名">
  </el-autocomplete>

  <el-button
    type="primary"
    size="mini"
    @click="selectW()"
  >
    查询
  </el-button>

  <div style="margin-bottom: 15px"></div>

  <div class="box">
    <el-table
      :data="dataTable"
      highlight-current-row
      class="tb-edit"
      ref="table"
    >

      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="ID">
              <span>{{ scope.$index+1 }}</span>
            </el-form-item>
            <el-form-item label="作业名">
              <span>{{ scope.row.wname }}</span>
            </el-form-item>

            <el-form-item label="发布日期">
              <span>{{moment(scope.row.startTime).format('YYYY-MM-DD')}}</span>
            </el-form-item>

            <el-form-item label="截止日期">
              <span>{{moment(scope.row.endTime).format('YYYY-MM-DD')}}</span>
            </el-form-item>

            <el-form-item label="作业内容">
              <span style="display: block; width:750px; word-break: break-all">{{ scope.row.wcontent }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column label="ID" width="150rem">
        <template slot-scope="scope">
          <span>{{ scope.$index+1}}</span>
        </template>
      </el-table-column>

      <el-table-column label="作业名"
                       prop="wname">
      </el-table-column>

      <el-table-column label="发布日期"
                       sortable
                       prop="startTime"
                       :formatter="dateFormat">
      </el-table-column>

      <el-table-column label="截止日期"
                       sortable
                       prop="endTime"
                       :formatter="dateFormat">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="toogleExpand(scope.row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>

</template>
<style>

  .box-body{
    width: 100%;
    overflow: auto;
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }

</style>


<script>

  import {findCName, queryWork, selectWork1, workList, xueId} from '../api/loginApi'
  import moment from 'moment'

  export default{

    inject: ['reload'],

    data(){
      return{
        csvList:[],
        inputName: '',
        classname:'',
        expandRowKeys:[],  //展开行id的数组
        dataTable:[]
      }
    },

    created () {
      this.init();
      this.find();
    },

    mounted(){

      xueId({
        sid:this.$store.state.user.user.username,
      }).then(result => {
        queryWork({
          id: result
        }).then(result => {
          this.csvList=result
        })
      }).catch(error=>{
        console.log(error)
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

      //根据作业名查找作业
      selectW(){
        if(!this.inputName){
          this.init();
          this.reload()
        }else{
          selectWork1({
            wname: this.inputName
          }).then(result => {
            this.dataTable=result
          }).catch(error=>{
            console.log(error)
          })
        }
      },

      toogleExpand(row){
        let $table = this.$refs.table;
        this.dataTable.map((item) => {
          if (row.id != item.id) {
            $table.toggleRowExpansion(item, false)
          }})
        $table.toggleRowExpansion(row)
      },

      //时间格式化
      dateFormat:function(row, column) {
        var date = row[column.property];
        if (date === undefined) {
          return "";
        }
        return moment(date).format('YYYY-MM-DD');
      },

      init(){
        xueId({
          sid:this.$store.state.user.user.username,
        }).then(result => {
          workList({
            id:result
          }).then(result1 => {
            this.dataTable=result1
          }).catch(error=>{
              console.log(error)
          })
        }).catch(error=>{
          console.log(error)
        })
      },

      //根据关键字查找作业名
      querySearch(queryString, cb) {
        var csvS = this.csvS;
        cb(csvS);
      },

      find(){
        xueId({
          sid:this.$store.state.user.user.username,
        }).then(result => {
          findCName({
            id: result
          }).then(result => {
            this.classname=result
          }).catch(error=>{
            console.log(error)
          })
        }).catch(error=>{
          console.log(error)
        })
      },

    }
  }
</script>
