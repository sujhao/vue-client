<template>
  <div class="login-view">
    <div class="login-title">客服系统</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-form">
      <el-form-item label="账号" prop="account" class="login-item">
        <el-input
          type="account"
          placeholder="请输入账号"
          prefix-icon="el-icon-user-solid"
          v-model="ruleForm.account"
          autofocus
          maxlength="20"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass" class="login-item">
        <el-input
          type="password"
          placeholder="请输入密码"
          prefix-icon="el-icon-unlock"
          v-model="ruleForm.pass"
          autofocus
          maxlength="20"
          clearable
          show-password
        >
          <!-- <i slot="prefix" class="el-icon-user"></i> -->
        </el-input>
      </el-form-item>
      <el-form-item class="login-item">
        <el-button type="primary" @click="submitForm('ruleForm')" class="login-button">登录</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.login-view .login-title {
  font-size: 2rem;
  color: #eee;
  margin: 10rem auto 0 auto;
  text-align: center;
  font-weight: 700;
}
.login-view .login-form {
  width: 30rem;
  margin: 0 auto;
}
.login-view .login-form .login-item .el-form-item__label {
  color: #eee;
  font-size: 1.3rem;
  font-weight: 500;
}
.login-view .login-form .login-item .login-button {
  width: 30rem;
  margin: 0 auto;
}
</style>

<script>
import { Logger } from "../engine/utils/Logger";
export default {
  data() {
    let validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 1 || value.length > 10) {
        callback(new Error("请输入1~10位的密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: "",
        pass: ""
      },
      rules: {
        account: [{ validator: validateAccount, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    gotoChat() {
      Logger.log("gotoChat===");
      this.$router.push({ path: "/chat" });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          Logger.log("login=", this.ruleForm.account, this.ruleForm.pass);
          this.gotoChat();
        } else {
          Logger.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
