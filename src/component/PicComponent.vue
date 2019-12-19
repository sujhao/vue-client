<template>
  <div class="PicComponent">
    <div>
      <el-button type="primary" icon="el-icon-delete" size="mini" style="margin-top:5px"></el-button>
    </div>
    <el-image style="width: 120px; height: 120px" :src="imgUrl" fit="cover"></el-image>
    <el-button size="mini" type="primary" style="width: 120px;">下载</el-button>
  </div>
</template>


<style scoped>
.PicComponent {
  display: inline-block;
  background-color: #FFF0ED;
  width:150PX;
  height:190PX;
}
</style>

<script>
export default {
  data() {
    return {
      imgUrl: "http://localhost:9666/upload/1576749298443/cat.png"
    };
  }
};
</script>>