<template>
  <div class="piccompress-view">
    <h1 class="logo-text">图片压缩</h1>
    <ol class="header-ol">
      <li>从您的设备中选择最多10张jpg,jpeg或者png图片拖动到上传区，等待压缩完成。</li>
      <li>单独下载的压缩图或下载所有的ZIP压缩包。</li>
    </ol>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <!-- <i class="el-icon-plus"></i> -->
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>


<style scoped>
.logo-text {
  display: inline-block;
  background-color: #e37863;
  color: #ffffff;
  vertical-align: middle;
  text-transform: uppercase;
  border-radius: 4px;
  height: 45px;
  font-size: 28px;
  line-height: 45px;
  padding: 0 10px;
}
.header-ol {
  margin: 0;
  margin-left: 1.4em;
  list-style-type: upper-latin;
}
</style>

<script>
import { Logger } from "../engine/utils/Logger";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      Logger.log("handleRemove=", file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      Logger.log("handlePictureCardPreview=", file);
    }
  }
};
</script>>