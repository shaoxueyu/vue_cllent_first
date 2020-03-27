<template>
  <div
    class="diglog-container"
    ref="test"
  >
    <!-- Form -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :modal-append-to-body="false"
      :before-close="dialog.fun"
      :destroy-on-close="true"
    >
      <div class="form">
        <el-form
          :model="formData"
          ref="form"
          label-width="120px"
          style="margin:10px"
          :rules="formRules"
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
              id="describe"
              type="describe"
              label="收支描述"
              v-model="formData.describe"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="收入："
            prop="income"
            style="width:300px"
          >
            <el-input
              type="income"
              v-model.number="formData.income"
              id="income"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="支出："
            prop="expend"
            style="width:300px"
          >
            <el-input
              type="text"
              v-model.number="formData.expend"
              id="expend"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="账户现金："
            prop="cash"
            style="width:300px"
          >
            <el-input
              type="text"
              v-model.number="formData.cash"
              :readonly="true"
              :disabled="true"
              id="cash"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="备注："
            prop="remark"
            style="width: 80%"
          >
            <el-input
              type="textarea"
              v-model="formData.remark"
              id="remark"
            ></el-input>
          </el-form-item>
          <el-form-item class="text-right">
            <el-button @click="cancel">
              取消
            </el-button>
            <el-button
              @click="onSubmit('form')"
              type="primary"
            >
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios"
export default {
  data() {
    return {
      formatTypeList: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
      formRules: {
        describe: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" }
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" },
          { type: "number", message: "必须为数字", trigger: "blur" }

        ],
        expend: [
          { required: true, message: "支出不能为空！", trigger: "blur" },
          { type: "number", message: "必须为数字", trigger: "blur" }
        ],
        /*   cash: [
            { required: true, message: "账户现金不能为空！", trigger: "blur" },
            { type: "number", message: "必须为数字", trigger: "blur" }
          ] */
      }
    }
  },
  methods: {
    cancel() {
      this.dialog.show = false
      this.$refs["form"].resetFields()  //清空验证条件
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        this.validate(valid)
      })
    },
    async validate(valid) {
      if (valid) {
        let params = this.dialog.option //具体是添加还是编辑在这判断
        console.log(params);
        let { status, data } = await axios.post(`/profile/${params}`, this.formData).catch(err => console.log(err)).catch(err => console.log(err))
        if (status === 200) {
          this.dialog.show = false
          this.$message({
            message: data.message,
            type: "success"
          })
          let keysArr = [...Object.keys(this.formData)]
          keysArr.forEach((key) => {
            this.formData[key] = ""
          })
          //通过调用父组件更新
          this.$emit("update")

        }
      }
    }
  },
  props: {
    dialog: Object,
    formData: Object,
    sunzi: Function
  },
  components: {
  },
  mounted() {

  },
}
</script>
<style lang="scss">
.el-dialog {
  border-radius: 25px;
  box-shadow: 0 4px 10px 0 darken(#8a8484, 30%);
}
</style>
