<template>
  <div class="PicComponent">
    <div>
      <el-button
        type="primary"
        icon="el-icon-delete"
        size="mini"
        style="margin-top:5px"
        @click="handleDelete"
      ></el-button>
    </div>
    <el-image style="width: 120px; height: 120px" :src="item.url" fit="cover"></el-image>
    <el-progress :percentage="item.percent"></el-progress>
    <div>原大小:{{fileSizeDesc}}</div>
    <div>压缩后大小:{{compressFileSizeDesc}}</div>
    <el-button
      size="mini"
      type="primary"
      style="margin-top:5px;width: 120px;"
      @click="handleDownload"
    >下载</el-button>
  </div>
</template>


<style scoped>
.PicComponent {
  display: inline-block;
  background-color: #fff0ed;
  width: 150px;
  height: 240px;
}
</style>

<script>
import { FileSizeHelper } from "../engine/utils/FileSizeHelper";
// require("../engine/utils/Download")
export default {
  data() {
    return {
      // img_src:require(this.item.url)
    };
  },
  methods: {
    handleDelete() {
      this.$parent.handleDeletePicComponent(this.item.uid);
    },
    handleDownload() {
      console.log("handleDownload===",this.item.downloadUrl, download);

        download(this.item.database64, this.item.name, this.item.mime);
      // let x = new XMLHttpRequest();
      // x.open("GET", this.item.downloadUrl, true);
      // x.responseType = "blob";
      // x.onload = (e)=> {
      //   let url = window.URL.createObjectURL(x.response);
      //   let a = document.createElement("a");
      //   a.href = url;
      //   a.download = "";
      //   a.click();
      // };
      // x.send();
    }
  },
  computed: {
    // a computed getter
    fileSizeDesc() {
      return FileSizeHelper.getPicSizeDesc(this.item.size);
    },
    compressFileSizeDesc() {
      if (this.item.compressSize) {
        return FileSizeHelper.getPicSizeDesc(this.item.compressSize);
      } else {
        return "0kb";
      }
    }
  },
  props: ["item"]
};
</script>>