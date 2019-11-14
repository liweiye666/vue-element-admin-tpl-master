<script src="../../.eslintrc.js"></script>
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
<!--              <el-input  v-if="showEdit[scope.$index]" v-model="scope.row.wname" size="mini"-->
<!--                      placeholder="请输入作业名"/>-->
              <input  v-if="showEdit[scope.$index]" v-model="scope.row.wname"
                placeholder="请输入作业名"/>
              <span v-if="!showEdit[scope.$index]">{{ scope.row.wname }}</span>
            </el-form-item>

            <el-form-item label="发布日期">
<!--              <el-date-picker-->
<!--                v-if="showEdit[scope.$index]"-->
<!--                type="date"-->
<!--                v-model="scope.row.startTime"-->
<!--                size="mini"-->
<!--                placeholder="选择日期"></el-date-picker>-->
              <input v-if="showEdit[scope.$index]" v-model="scope.row.startTime" placeholder="请输入发布日期"/>
              <span v-if="!showEdit[scope.$index]">{{moment(scope.row.startTime).format('YYYY-MM-DD')}}</span>
            </el-form-item>
            <el-form-item label="截止日期">
<!--              <el-date-picker-->
<!--                v-if="showEdit[scope.$index]"-->
<!--                type="date"-->
<!--                v-model="scope.row.endTime"-->
<!--                size="mini"-->
<!--                placeholder="选择日期"></el-date-picker>-->
              <input v-if="showEdit[scope.$index]" v-model="scope.row.endTime" placeholder="请输入截止日期"/>
              <span v-if="!showEdit[scope.$index]">{{moment(scope.row.endTime).format('YYYY-MM-DD')}}</span>
            </el-form-item>

            <el-form-item label="作业内容">
              <textarea v-if="showEdit[scope.$index]"
                     v-model="scope.row.wcontent"
                     style="width: 700px;font-size: 15px;"
                     placeholder="请输入作业内容"
                        :rows=10></textarea>
<!--              <el-input type="textarea" v-if="showEdit[scope.$index]"-->
<!--                        v-model="scope.row.wcontent"-->
<!--                        style="width: 700px;font-size: 15px;"-->
<!--                        rows="10"-->
<!--                        placeholder="请输入作业内容"></el-input>-->
              <span v-if="!showEdit[scope.$index]"
                style="display: block; width:750px; word-break: break-all">{{ scope.row.wcontent }}</span>
            </el-form-item>

            <div style="margin: 20px 0;"></div>

            <el-button type="primary" size="small"     @click="handelUpdate(scope.$index, scope.row)"     v-if="showBtn[scope.$index]">保存</el-button>
            <el-button type="text" size="small"     @click="handelCancel(scope.$index, scope.row)"     v-if="showBtn[scope.$index]">取消</el-button>

            <el-button type="primary" size="mini"  v-if="!showBtn[scope.$index]"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        prop="startTime"
        sortable
        :formatter="dateFormat">
      </el-table-column>

      <el-table-column label="截止日期"
        prop="endTime"
        sortable
        :formatter="dateFormat">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="toogleExpand(scope.row)">
            查看
          </el-button>

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
  import {queryWork, selectWork, selectWork1, updateWork, workList, xueId} from '../api/loginApi'
  import {deleteWork} from '../api/loginApi'
  import theme from '../components/theme'
  import moment from 'moment'

  export default{

    name:"table",
    inject: ['reload'],

    data(){
      return{
        csvList:[],
        inputName: '',
        options: [],
        value: [],
        list: [],
        loading: false,
        states: [],
        dataTable:[],
        expandRowKeys:[],  //展开行id的数组
        showEdit: [], //显示编辑框
        showBtn: [],
        showBtnOrdinary: true,
        select_work:''
      }

      for(var i = 0; i < 100; i ++) {
        this.showEdit[i] = false;
        this.showBtn[i] = false;
        this.$set(vm.showEdit[i], false);
        this.$set(vm.showBtn[i], false);
      }

    },

    created () {
        this.init();
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

    mounted(){
      queryWork({
        id: this.$store.state.user.user.username
      }).then(result => {
        this.csvList=result
      })
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

      //删除作业，根据作业序号
      handleDelete(index, row){
        this.$confirm('此操作将删除该记录，是否继续?','提示',{
          confirmButtonText:'确认',
          cancelButtonText:'取消',
          type:'warning',
          center:true
        }).then(()=>{
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
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'已取消删除'
          });
        });
      },

      handleCurrentChange(row, event, column) {
        console.log(row, event, column, event.currentTarget)
      },

      handleEdit(index, row) {
        this.showEdit[index] = true;
        this.showBtn[index] = true;
        this.$set(this.showEdit,index,true)
        this.$set(this.showBtn,index,true)
      },
      //取消编辑
      handelCancel(index, row) {
        this.$confirm('确认取消对该数据的编辑?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$set(this.showEdit,index,false)
          this.$set(this.showBtn,index,false)
          this.reload()
          this.$message({
            type: 'success',
            message: '取消成功!'
          });
        }).catch(() => {
        });
      },

      //确认编辑
      handelUpdate(index, row){
        this.$confirm('是否确认保存对该数据的编辑?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(row.startTime>row.endTime){
            return this.$message.warning("发布日期不能大于截止日期")
          }
          updateWork({
            wid: row.wid,
            wname: row.wname,
            wcontent: row.wcontent,
            startTime: row.startTime,
            endTime: row.endTime,
          }).then(result => {
            if(result===true){
              this.reload()
              return this.$message.success('保存成功')
            }
            else{
              return this.$message.warning("提交内容不能为空")
            }
          }).catch(error=>{
            console.log(error)
          })
        }).catch(() => {
        });
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
          console.log(this.dataTable)
       }).catch(err=>{
         console.log(err)
       })
      },

      //根据关键字查找作业名
      querySearch(queryString, cb) {
          var csvS = this.csvS;
          cb(csvS);
      }
    }
  }

</script>
