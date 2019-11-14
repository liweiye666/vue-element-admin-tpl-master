<template>
  <div class="page-body">
    <div class="page-header">
      <h1 class="page-title">作业信息</h1>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item >作业信息</el-breadcrumb-item>
        <!-- <el-input placeholder="请输入作业名" size="small" v-model="wname"></el-input>
        <el-button type="infor" size="mini">查询</el-button> -->
      </el-breadcrumb>
    </div>


    <div class="box">
      <el-table
        :data="dataTable"
        height="550"
        highlight-current-row @row-click="handleCurrentChange"
        class="tb-edit"
      >

        <el-table-column label="ID" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.wid}}</span>
          </template>
        </el-table-column>


        <!-- <el-table-column label="动作" prop="action"></el-table-column> -->
        <el-table-column label="课程名" width="150">
          <template slot-scope="scope">

            <el-input size="small" v-model="scope.row.wname"
                      placeholder="请输入内容"
            ></el-input>

            <span>{{ scope.row.wname}}</span>
          </template>
        </el-table-column>
        <<!-- el-table-column label="结果" prop="result"></el-table-column> -->
        <!-- <el-table-column label="描述" prop="desctiption"></el-table-column> -->
        <el-table-column label="作业内容" width="250">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.wcontent"
                      placeholder="请输入内容"
            ></el-input>

            <span>{{ scope.row.wcontent}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="状态" prop="show" width="80" ></el-table-column> -->
        <el-table-column
          label="发布时间"
          width="150"
          :formatter="dateFormat">
          <template slot-scope="scope">
            <el-date-picker size="small" v-model="scope.row.start" type="date"
                            placeholder="请输入内容"
            ></el-date-picker>
            <span style="margin-left: 10px">{{ scope.row.start }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="截止时间"
          width="150"
          :formatter="dateFormat">

          <template slot-scope="scope">
            <el-date-picker size="small" v-model="scope.row.end" type="date"
                            placeholder="请输入内容"
            ></el-date-picker>
            <span style="margin-left: 10px">{{ scope.row.end }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="最后更新" prop="updatedAt">
           <template slot-scope="scope">
             {{format(scope.row.updatedAt)}}
           </template>
         </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--          <el-button @click="handleClick(scope.row)" type="success" size="mini">查看</el-button>-->
            <el-button type="primary" size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
  .tb-edit .el-input {
    display: none
  }
  .tb-edit .current-row .el-input {
    display: block
  }
  .tb-edit .current-row .el-input+span {
    display: none
  }
</style>

<script>
  import {updateWork, workList, xueId} from '../api/loginApi'
  import {deleteWork} from '../api/loginApi'
  import theme from '../components/theme'
  import moment from 'moment'

  export default{

    inject: ['reload'],

    data(){
      return{
        dataTable:[]
      }
    },

    created () {
      this.init();
    },

    methods: {
      //删除作业，根据作业序号
      handleDelete(index, row){
        deleteWork({
          wid: row.wid
        }).then(result => {
          if(result===true){
            this.reload()
            return this.$message.success('删除成功')
          }
        }).catch(error=>{
          console.log(error)
        })
      },

      handleCurrentChange(row, event, column) {
        console.log(row, event, column, event.currentTarget)
      },

      handleEdit(index, row) {
        updateWork({
          wid: row.wid,
          wname: row.wname,
          wcontent: row.wcontent,
          start: row.start,
          end: row.end,
        }).then(result => {
          if(result===true){
            this.reload()
            return this.$message.success('修改成功')
          }
        }).catch(error=>{
          console.log(error)
        })
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
        workList({
          id:this.$store.state.user.user.username,
        }).then(res=>{
          this.dataTable=res
        }).catch(err=>{
          console.log(err)
        })
      }

    }
  }

</script>

