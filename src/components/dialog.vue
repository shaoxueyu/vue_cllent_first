<template>
  <div class=diglog-container>
    <!-- Form -->
    <el-dialog
      title="添加资金信息"
      :visible.sync="dialog.show"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          v-model="formData"
          ref="form"
          label-width="120px"
          style="margin:10px"
        >
          <el-form-item label="收支类型：">
            <el-select
              v-model="formData.type"
              placeholder="收支类型"
            >
              <el-option
                v-for="(formtype) in formatTypeList"
                :key="formtype"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="收支描述："
            prop="describe"
          >
            <el-input
              type="describe"
              label="收支描述"
              v-model="formData.describe"
            >
            </el-input>

          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      formatTypeList: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ]
    }
  },
  watch: {
  },
  props: {
    dialog: Object
  },
  components: {
  },
  mounted() {
  },
}
</script>
<style lang="scss">
</style>