<template>
  <div class="fundlist-container">
    <div class="handle-content clearfix">
      <!-- 添加功能 -->
      <el-form
        :inline="true"
        ref="addData"
        class="right"
      >
        <el-form-item class="btn-right">
          <el-button
            type="primary"
            size="small"
            icon="view"
            @click="handleAdd()"
          >添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;"
      max-height="450"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
      >

      </el-table-column>
      <el-table-column
        prop="date"
        label="创建时间"
        width="250"
        align="center"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left:7px">
            {{scope.row.date}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="收支类型"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="describe"
        label="收支描述"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="income"
        label="收入"
        width="170"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:#00d053">
            {{scope.row.income}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="expend"
        label="支出"
        width="170"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:#f56767">
            {{scope.row.expend}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cash"
        label="账户现金"
        width="170"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:#4db3ff">
            {{scope.row.cash}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        prop="operation"
        width="250"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            type="warning"
            icon="edit"
            @click="handleEdit(scope.row)"
          >编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            icon="delete"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <Dialog
      :dialog="dialog"
      @update="getProfile"
      :formData="formData"
    />
  </div>
</template>
<script>
import axios from "axios"
import Dialog from "../components/dialog"
export default {
  data() {
    return {
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        remark: "",
        cash: "",
        id: "",
      },
      tableData: [],
      dialog: {
        show: false, // 控制显示和隐藏
        title: "",
        option: "",
        fun: () => { }
      }
    }
  },
  methods: {
    //获取表格数据
    async getProfile() {
      let { data, status } = await axios.get("/profile/all").catch(err => console.log(err))
      if (status === 200) {
        this.tableData = data
      }
    },
    handleEdit(row) {
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit",
        fun: (done, formData = this.formData) => { //清空对象
          let keysArr = [...Object.keys(formData)]
          keysArr.forEach(keys => {
            formData[keys] = ""
          })
          done()
        }
      }
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark
      }
    },
    //添加新数据
    handleAdd() {
      console.log(this.formData);
      this.dialog = {
        show: true,
        title: "添加新数据",
        option: "add",
        fun: (done, formData = this.formData) => { //清空对象
          let keysArr = [...Object.keys(formData)]
          keysArr.forEach(keys => {
            if (keys === "cash") formData[keys] = "0"
            formData[keys] = ""
          })
          done()
        }
      }
    }
  },
  created() {
    this.getProfile()
  },
  components: {
    Dialog
  },
  computed: {
    cash() {
      console.log(1);
      let formData = this.formData
      return Number(formData.income - formData.expend)
    }
  },
  watch: {
    cash(newValue) {
      this.formData.cash = newValue
    }
  },
  mounted() {

  },

}
</script>

<style lang="scss">
.fundlist-container {
  box-sizing: border-box;
  padding: 50px;
}
.el-table__header-wrapper {
  display: flex;
  justify-content: center;
  .cell {
    font-weight: bold;
  }
}
.el-table__body-wrapper {
  display: flex;
  justify-content: center;
  font-weight: bold;
}
</style>