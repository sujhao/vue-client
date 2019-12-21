<template>
  <div class="piccompress-view">
    <h1 class="logo-text">图片压缩</h1>
    <ol class="header-ol">
      <li>从您的设备中选择最多10张jpg,jpeg或者png图片拖动到上传区，等待压缩完成。</li>
      <li>单独下载的压缩图或下载所有的ZIP压缩包。</li>
    </ol>
    <el-upload
      class="uploadDiv"
      :action="uploadUrl"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleUploadSuc"
      :on-error="handleUploadError"
      :on-progress="handleUploadProgress"
      :before-upload="handleBeforeUpload"
      :on-exceed="handleUploadLimit"
      multiple
      drag
      list-type="picture"
      :show-file-list="true"
      :limit="1"
      accept="image/jpeg, image/png"
      ref="uploadUI"
      :file-list="fileList"
    >
      <!-- <i class="el-icon-plus"></i> -->
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件,一次最多上传7个</div>
    </el-upload>

    <div>
      <el-button type="danger" plain class="btnclean" @click="handleClearPic">清空列表</el-button>
    </div>
    <PicComponent v-for="item in picItemList" :key="item.id" v-bind:item="item" ref="item.id"></PicComponent>

    <div class="pagetips">喜欢吗？赶紧分享一次</div>
    <div class="smalltips">服务器资源有限,所有上传的数据将在一小时后将被删除。</div>
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
}

.uploadDiv {
  margin-top: 20px;
}
.btnclean {
  margin-top: 20px;
  margin-bottom: 20px;
}

.pagetips {
  margin-top: 20px;
  font-weight: 30px;
  font-size: 30px;
}
.smalltips {
  margin-top: 20px;
  font-weight: 10px;
  font-size: 10px;
}
</style>

<script>
import Vue from "vue";
import { Logger } from "../engine/utils/Logger";
import { Config } from "../engine/config/Config";
const axios = require("axios");
import PicComponent from "../component/PicComponent"; //引入子组件

export default {
  data() {
    return {
      picId: 0,
      dialogImageUrl: "",
      uploadUrl: "http://localhost:9666/upload/",
      dialogVisible: false,
      picItemList: [
        // {
        //   id: 1,
        //   uid: 45454,
        //   url: "http://localhost:9666/upload/1576749298443/cat.png",
        //   size: 34751,
        //   compressSize: 10000,
        //   percent: 100
        // }
      ],
      fileList:[]
    };
  },
  components: { PicComponent },
  methods: {
    isInPicList(uid) {
      for (let i = 0; i < this.picItemList.length; i++) {
        let item = this.picItemList[i];
        if (item.uid == uid) {
          return item;
        }
      }
      return false;
    },
    checkAddUploadPicList(file) {
      let uid = file.uid;
      let picUrl = file.url;
      let item = this.isInPicList(uid);
      if (!item) {
        item = {};
        this.picId++;
        item["id"] = this.picId;
        item["uid"] = uid;
        item["url"] = picUrl;
        item["size"] = file.size;
        item["percent"] = Math.floor(file.percentage);
        this.picItemList.push(item);
      } else {
        item["url"] = picUrl;
        item["percent"] = Math.floor(file.percentage);
      }
      Logger.log("checkAddUploadPicList==", item);
      return item;
    },
    handleRemove(file, fileList) {
      Logger.log("handleRemove=", file, fileList);
      this.fileList = fileList;
    },
    handleDeletePicComponent(item) {
      Logger.log("handleDeletePicComponent==", item);
      for (let i = 0; i < this.picItemList.length; i++) {
        let tempItem = this.picItemList[i];
        if (tempItem.id == item.id) {
          this.picItemList.splice(i, 1);
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      Logger.log("handlePictureCardPreview=", file);
    },
    handleUploadSuc(response, file, fileList) {
      Logger.log("handleUploadSuc resp=", response);
      Logger.log("handleUploadSuc file=", file);
      this.fileList = fileList;
      if (response["code"] == 0) {
        this.$message({
          message: response["msg"],
          type: "success"
        });
        // let database64 = response["data"];
        // let buf1 = Buffer.from(database64, "base64");
        // Logger.log("buf1==", buf1);
        // let blob = new Blob([buf1], {
        //   type: "image/*"
        // });
        // let bloburl = URL.createObjectURL(blob);
        // Logger.log("bloburl===", bloburl)
        // let url = Config.Pic_Url + response["url"];
        // file.url = url;
        let item = this.checkAddUploadPicList(file);
      } else {
        this.$message({
          message: response["msg"],
          type: "warning"
        });
      }
    },
    handleUploadProgress(event, file, fileList) {
      Logger.log("handleUploadProgress event=", event);
      Logger.log("handleUploadProgress file=", file);
      Logger.log("handleUploadProgress fileList=", fileList);
      this.checkAddUploadPicList(file);
    },
    handleUploadError(err, file, fileList) {
      Logger.log("handleUploadError err=", err);
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
    },
    handleClearPic() {
      this.picItemList = [];
      this.fileList = [];
      // this.$refs.uploadUI.clearFiles()
      // this.$refs.uploadUI.fileList = []

    }
  }
};
</script>>