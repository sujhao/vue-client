<template>
  <div class="piccompress-view">
    <h1 class="logo-text">jpg,png,gif转换为webp</h1>
    <ol class="header-ol">
      <li>从您的设备中选择最多{{maxPicNum}}张jpg,jpeg,png或者gif图片拖动到上传区，等待压缩完成。</li>
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
      :show-file-list="false"
      :limit="maxPicNum"
      accept="image/jpeg, image/png, image/gif"
      ref="uploadUI"
      :file-list="fileList"
      :data="httpData"
    >
      <!-- <i class="el-icon-plus"></i> -->
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg,png,gif文件,一次最多上传{{maxPicNum}}个</div>
    </el-upload>

    <div>
      <el-button type="danger" plain class="btnclean" @click="handleClearPic">清空列表</el-button>
    </div>
    <PicComponent
      v-for="item in picItemList"
      :key="item.id"
      v-bind:item="item"
      :ref="item.componentName"
    ></PicComponent>

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
  list-style-type: none;
  /* margin-left: 1.4em; */
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
import { FileSizeHelper } from "../engine/utils/FileSizeHelper";
import { Md5Helper } from "../engine/utils/Md5Helper";
import { DateUtil } from "../engine/utils/DateUtil";
import { Locale } from "../locale/Locale";

export default {
  data() {
    return {
      httpData: {
        time: 12121,
        value:"",
      },
      picId: 0,
      maxPicNum: 7,
      dialogImageUrl: "",
      uploadUrl: Config.Convert_Url,
      dialogVisible: false,
      picItemList: [
        // {
        //   id: 1,
        //   uid: 45454,
        // componentName:"picItem1"
        // name:"a.png",
        //   url: "http://localhost:9666/upload/1576749298443/cat.png",
        //   size: 34751,
        //   compressSize: 10000,
        //   percent: 100,
        //    database64:"",
        // mime:""
        // }
      ],
      fileList: []
    };
  },
  mounted() {
    document.title = Locale.getLocaleDesc("title1");
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
        item["componentName"] = "picItem" + uid;
        item["uid"] = uid;
        item["url"] = picUrl;
        item["name"] = file.name;
        item["size"] = FileSizeHelper.getPicSizeDesc(file.size);
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
      this.handleDeletePicComponent(file.uid);
    },
    handleDeletePicComponent(uid) {
      Logger.log("handleDeletePicComponent==", uid, this.fileList);
      for (let i = 0; i < this.picItemList.length; i++) {
        let tempItem = this.picItemList[i];
        if (tempItem.uid == uid) {
          this.picItemList.splice(i, 1);
          break;
        }
      }
      for (let i = 0; i < this.fileList.length; i++) {
        let file = this.fileList[i];
        Logger.log("handleDeletePicComponent==file", file.uid, uid);
        if (file.uid == uid) {
          this.fileList.splice(i, 1);
          break;
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
      Logger.log("handleUploadSuc fileList=", fileList);
      if (response["code"] == 0) {
        this.$message({
          message: response["msg"],
          type: "success"
        });
        let database64 = response["data"];
        let mime = response["mime"];
        database64 = "data:" + mime + ";base64," + database64;
        // Logger.log("database64==", database64);
        Logger.log("mime==", mime);
        let item = this.checkAddUploadPicList(file);
        item.database64 = database64;
        item.mime = mime;
        item["newName"] = response["newName"];
        // item.compressSize = response["size"];
        item.compressSize = FileSizeHelper.getPicSizeDesc(response["size"]);
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
      this.fileList = fileList;
      this.handleDeletePicComponent(file.uid);
    },
    handleBeforeUpload(file) {
      Logger.log("handleBeforeUpload file=", file);
      this.httpData.time = DateUtil.now()
      this.httpData.value = Md5Helper.getSimpleEncryptStr(this.httpData.time+"")
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
    }
  }
};
</script>>