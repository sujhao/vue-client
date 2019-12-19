<template>
  <div class="piccompress-view">
    <h1 class="logo-text">图片压缩</h1>
    <ol class="header-ol">
      <li>从您的设备中选择最多10张jpg,jpeg或者png图片拖动到上传区，等待压缩完成。</li>
      <li>单独下载的压缩图或下载所有的ZIP压缩包。</li>
    </ol>
    <el-upload
      action="http://localhost:9666/upload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleUploadSuc"
      :on-error="handleUploadError"
      :on-progress="handleUploadProgress"
      :before-upload="handleBeforeUpload"
      :on-exceed="handleUploadLimit"
      list-type="picture-card"
      multiple
      drag
      :limit="3"
      accept="image/jpeg, image/png"
    >
      <i class="el-icon-plus"></i>

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
    },
    handleUploadSuc(response, file, fileList) {
      Logger.log("handleUploadSuc resp=", response);
      Logger.log("handleUploadSuc file=", file);
      Logger.log("handleUploadSuc fileList=", fileList);
    },
    handleUploadProgress(event, file, fileList) {
      Logger.log("handleUploadProgress event=", event);
      Logger.log("handleUploadProgress file=", file);
      Logger.log("handleUploadProgress fileList=", fileList);
    },
    handleUploadError(err, file, fileList) {
      Logger.log("handleUploadError err=", err);
      Logger.log("handleUploadError file=", file);
      Logger.log("handleUploadError fileList=", fileList);
    },
    handleBeforeUpload(file) {
      Logger.log("handleBeforeUpload file=", file);
    },
    handdleUploadChange(file, fileList) {
      Logger.log("handdleUploadChange file=", file);
      Logger.log("handdleUploadChange fileList=", fileList);
    },
    handleUploadLimit(files, fileList) {
      Logger.log("handleUploadLimit files=", files);
      Logger.log("handleUploadLimit fileList=", fileList);
    }
  }
};
</script>>