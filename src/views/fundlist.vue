<template>
  <div
    class="fundlist-container"
    ref="test"
  >
    <div class="handle-content">
      <!-- 添加功能 -->
      <el-form
        :inline="true"
        ref="addData"
        class="clearfix"
      >
        <el-form-item
          label="按照时间筛选："
          class="left form-item-padding-left"
        >
          <el-date-picker
            v-model="searchDate.startTime"
            type="datetime"
            placeholder="选择开始时间"
          >
          </el-date-picker>
          --
          <el-date-picker
            v-model="searchDate.endTime"
            type="datetime"
            placeholder="选择结束时间"
          >
          </el-date-picker>
          <el-button
            type="primary"
            icon="search"
            size="small"
            @click="headleSearch()"
          >筛选</el-button>
        </el-form-item>
        <el-form-item class="right form-item-padding-right">
          <el-button
            type="primary"
            size="small"
            icon="view"
            @click="handleAdd()"
            v-if="identity >=10000"
          >添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;"
      max-height="700"
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
            {{scope.row.income | addFormat}}
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
            {{scope.row.expend | subFormat}}
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
            :disabled="identity >= 10000 ? false : true"
          >编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            icon="delete"
            @click="handleDelete(scope.row)"
            :disabled="identity >= 10000 ? false : true"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row>
      <el-col :span="
            24">
        <el-pagination
          class="paginations-page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="paginations.pageIndex"
          :page-sizes="paginations.pageSizes"
          :page-size="paginations.pageSize"
          :layout="paginations.layout"
          :total="paginations.total"
        >
        </el-pagination>
      </el-col>
    </el-row>
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
      searchDate: {
        startTime: "",
        endTime: ""
      },
      paginations: {
        pageIndex: 1, //当前位于哪一页
        total: 0, //总数
        pageSize: 5, //每页显示几条
        pageSizes: [5, 10, 15, 20], //每天显示的动态设置
        layout: "total, sizes, prev, pager, next, jumper",// 翻页属性
      },
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        remark: "",
        cash: "",
        _id: "",
      },
      allTableData: [], //全部数据未过滤
      filterTableData: [],// 需要特殊过滤的数据
      tableData: [], //页面显示数据
      dialog: {
        show: false, // 控制显示和隐藏
        title: "",
        option: "",
        fun: () => { }
      }
    }
  },
  methods: {
    //日期时间筛选
    headleSearch() {
      //填写不能为空
      if (!this.searchDate.startTime || !this.searchDate.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        })
        this.getProfile()
        return
      }
      const { startTime: sTime, endTime: eTime } = this.searchDate

      this.filterTableData = this.allTableData.filter((item) => {
        let itemTime = new Date(item.date).getTime()
        return itemTime >= sTime.getTime() && itemTime <= eTime.getTime()
      })
      this.setPaginations() //重置分页

    },
    //点击每条显示几页时候触发
    handleSizeChange(pageSize) {
      this.paginations.pageIndex = 1
      this.paginations.pageSize = pageSize
      this.tableData = this.allTableData.filter((item, index) => {
        return index < pageSize
      })
    },
    //跳转到第几页时候触发
    handleCurrentChange(page) {
      // 获取这一页之前的所有数据
      let justData = this.paginations.pageSize * (page - 1)
      // 获取选择页的所有数据
      let lastData = this.paginations.pageSize * page

      this.tableData = this.allTableData.filter((item, index) => {
        if (index >= justData && index < lastData) {
          return item
        }
      })
    },
    //获取表格数据
    async getProfile() {
      let { data, status } = await axios.get("/profile/all").catch(err => console.log(err))
      if (status === 200) {
        this.allTableData = data

        this.filterTableData = [...this.allTableData] //将数据传递给过滤过的数组

        //设置分页数据
        this.setPaginations(this.filterTableData)

      }
    },
    setPaginations() {
      let paginations = this.paginations
      //分页属性设置
      paginations.total = this.filterTableData.length
      paginations.pageIndex = 1
      paginations.pageSize = 5
      //设置默认的分页数据
      this.tableData = this.filterTableData.filter((item, index) => {
        return index < paginations.pageSize
      })
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
        income: Number(row.income),
        expend: Number(row.expend),
        cash: row.cash,
        remark: row.remark,
        _id: row._id
      }
    },
    //添加新数据
    handleAdd() {
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
    },
    //删除数据
    handleDelete(row) {
      this.$confirm("此操作将永久删除该条记录, 是否继续?", '提示', {
        type: "warning"
      }).then(() => {
        axios.delete(`/profile/delete/${row._id}`).then(({ data, status }) => {
          if (status === 200) {
            this.getProfile()
            this.$message({
              type: "success",
              message: data.message
            })
          }
        })
      })
    }
  },
  created() {
    this.getProfile()
  },
  filters: {
    addFormat(income) {
      return `+ ${income}`
    },
    subFormat(expend) {
      return `- ${expend}`
    }
  },
  components: {
    Dialog,
  },
  computed: {
    cash() {
      let formData = this.formData
      return Number(formData.income - formData.expend)
    },
    identity() {
      return this.$store.getters.user.identity
    }
  },
  watch: {
    cash(newValue) {
      this.formData.cash = newValue
    },
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
.paginations-page {
  margin-top: 25px;
  text-align: right;
}
.form-item-padding-left {
  padding-left: 25px;
}
.form-item-padding-right {
  padding-right: 25px;
}
</style>