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
    <div>原大小:{{item.size}}</div>
    <div>压缩后大小:{{item.compressSize}}</div>
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

  margin-left: 10px;
  display: inline-block;
  background-color: #fff0ed;
  width: 150px;
  height: 270px;
}
</style>

<script>
import { FileSizeHelper } from "../engine/utils/FileSizeHelper";
import { Logger } from "../engine/utils/Logger";
export default {
  data() {
    return {
      // showItem: {}
    };
  },
  methods: {
    handleDelete() {
      this.$parent.handleDeletePicComponent(this.item.uid);
    },
    handleDownload() {
      download(this.item.database64, this.item.name, this.item.mime);
    }
  },
  watch: {
    // item: {
    //   handler(newItem, oldItem) {
    //     Logger.log("watchItem", newItem, oldItem);
    //     this.showItem = newItem;
    //     this.$forceUpdate();
    //   },
    //   immediate: true
    // }
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
</script>