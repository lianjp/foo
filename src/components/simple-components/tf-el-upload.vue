<template>
  <div class="tf-el-upload">
    <el-dialog
      v-if="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :visible.sync="dialogVisible"
    >
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
    <el-upload
      accept="image/*"
      name="image"
      v-bind="$attrs"
      :on-change="(file, fileList)=>{
        handleChange(file, fileList, 'material', amount)
      }"
      :on-remove="(file, fileList)=>{
        handleRemove(file, fileList, 'material', amount)
      }"
      :on-success="(res, file, fileList)=>{
        uploadSucceed(res, file, fileList, 'material', amount)
      }"
      :file-list="value"
      :on-preview="handlePictureCardPreview"
      :before-upload="beforeImgUpload"
      :action="action"
      list-type="picture-card"
    >
      <i class="el-icon-plus" />
      <template v-slot:tip>
        <slot name="tip" />
      <!-- <div slot="tip" class="el-upload__tip">
        商品注册证 or 商品注册受理证复印本
      </div> -->
      </template>
    </el-upload>
  </div>
</template>
<script>
export default {
  props: {
    amount: {
      type: Number,
      default: 1
    },
    action: {
      type: String,
      default: 'upload'
    },
    size: {
      type: Number,
      default: 2
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleChange(file, fileList, type, len = 0) {
      // this.ruleForm[type] = fileList.slice(-len)
      this.$emit('input', fileList.slice(-len))
    },

    handleRemove(file, fileList, type, len = 0) {
      // this.ruleForm[type] = fileList.slice(-len)
      this.$emit('input', fileList.slice(-len))
    },

    uploadSucceed(res, file, fileList, type, len) {
      console.log(res, file, fileList, type, len)
    },

    // 图片上传之前
    beforeImgUpload(file) {
      const fileTypeArray = ['image/jpeg', 'image/png']
      const isAllowedType = fileTypeArray.includes(file.type)
      const isAllowedSize = file.size / 1024 / 1024 < this.size

      if (!isAllowedType) {
        this.$message.error(`上传图片只能是 JPG PNG 格式!`)
      }
      if (!isAllowedSize) {
        this.$message.error(`上传图片大小不能超过 ${this.size}MB!`)
      }
      return isAllowedType && isAllowedSize
    },

    // 放大观看
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
.tf-el-upload {
  min-height: 220px;
}
</style>
