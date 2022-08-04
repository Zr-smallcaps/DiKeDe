<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div class="business-header">
        <div class="header-left">
          <span class="header-text">工单编号:</span>
          <el-input placeholder="请输入内容" v-model="businessCode" size="medium" clearable>
          </el-input>
        </div>
        <div class="header-rigth">
          <span class="header-text">工单状态:</span>
          <el-select v-model="businessStatus" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
      </div>
      <!-- 新建 and 工单配置 -->

      <div class="business-main">
        <div class="main-header">
          <NewButton></NewButton>
          <el-button size="small">工单配置</el-button>
        </div>
        <div class="main-descriptions">
          <TableItem></TableItem>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data(){
    return{
       businessCode:'',
       businessStatus:'',
        options: [{
          value: '选项1',
          label: '代办'
        }, {
          value: '选项2',
          label: '进行'
        }, {
          value: '选项3',
          label: '取消'
        }, {
          value: '选项4',
          label: '完成'
        }],
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin-left: 20px;
    .business-header{
      box-sizing: border-box;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      display: flex;
      height: 54px;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin-bottom: 20px;
      padding-left: 17px;
      background-color: #fff;
      .header-text{
         font-size: 12px;
        margin-right: 20px;
      }
      .header-left{
        margin-right: 20px;
        display: flex;
        .el-input--suffix{
           height: 36px;
           width: 180px !important;
           box-sizing: content-box
        }
     }
       .header-right{
        display: flex;
        margin-right: 20px;

        .el-input__inner{
           height: 36px;
           width: 200px;
        }
        }
        .el-button{
        margin-left: 20px;

        }
    }
    .business-main{
         padding: 20px 15px 19px 17px;
        background-color: #fff;
      .main-header{
        height: 100%;
        background-color: #fff;
        display: flex;
        .el-button--default{
          margin-left: 10px;
          background-color: #FBF4F0;
          border: #fff;
        }
      }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
