<template>
  <div @keydown.enter="handleEnter()">
    <Row
      type="flex"
      justify="center"
      class="code-row-bg"
      magtin-top="80px"
    >
      <Col span="8">
      <Form
        ref="formInline"
        :model="formInline"
        :rules="ruleInline"
      >
        <FormItem prop="username">
          <Input
            type="text"
            v-model="formInline.username"
            placeholder="Username"
            style="width:auto"
          >
          <Icon
            type="ios-person-outline"
            slot="prepend"
          ></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            type="password"
            v-model="formInline.password"
            placeholder="Password"
            style="width:auto"
          >
          <Icon
            type="ios-lock-outline"
            slot="prepend"
          ></Icon>
          </Input>
        </FormItem>
        <FormItem prop="validateCode">
          <Row>
            <Col span="6">
            <Input
              type="text"
              v-model="formInline.validateCode"
              placeholder="validateCode"
              style="width:auto"
              @keyup.enter.native="handleSubmit('formInline')"
            >
            <Icon
              type="ios-attach"
              slot="prepend"
            ></Icon>
            </Input>
            </Col>
            <Col>
            <img
              :src="validateImage"
              @click="refreshImg(this)"
            />
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            @click="handleSubmit('formInline')"
          >Signin</Button>
        </FormItem>
      </Form>
      </Col>
    </Row>
  </div>
</template>
<script>
import { login } from "@/api/user";
import { getImgCode } from "@/api/data";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      formInline: {
        username: "",
        password: "",
        validateCode: ""
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不小于6位",
            trigger: "blur"
          }
        ],
        validateCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 4,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      },
      validateImage: ""
    };
  },
  methods: {
    ...mapActions(["handleLogin"]),
    handleEnter() {
      handleSubmit("formInline");
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("去登录吧");
          // login(this.formInline.username, this.formInline.password).then(
          //   res => {
          //     this.$Loading.finish();
          //   }
          // );
          let username = this.formInline.username;
          let password = this.formInline.password;
          let validateCode = this.formInline.validateCode;
          this.handleLogin({
            username,
            password,
            validateCode
          })
            .then(res => {
              this.$router.push({
                name: "home"
              });
            })
            .catch(err => {
              this.$Loading.error();
              if (err === 401) {
                this.$Message.error(e);
              }
            });
        } else {
          this.$Message.error("请检查输入信息");
        }
      });
    },
    refreshImg(obj) {
      let date = new Date();
      this.validateImage = "http://10.100.216.20:7999/validate/image?time=" + date;
    }
  },
  mounted() {
    this.validateImage =
      "http://10.100.216.20:7999/validate/image?time=" + new Date();
  }
};
</script>
