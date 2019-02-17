<template>
  <div>
    <span> {{ msg }} </span>
    <button @click="getInfo">获取信息</button>
    <button @click="changeval">change</button>
    <span v-model="infomation"> {{ infomation }}</span>
  </div>
</template>
<script>
import Axios from "axios";
import qs from "qs";
import { getUser } from "@/libs/util";
const conf = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
  },
  timeout: 5000
};
const instance = Axios.create(conf);

instance.interceptors.request.use(config => {
  let user = getUser();

  config.headers.Authorization = "Bearer " + user.token;
  return config;
});

instance.interceptors.response.use(res => {
  console.log(res);
  return res;
});

export default {
  name: "policyInfo",
  data() {
    return {
      msg: "policyInfo",
      infomation: "000"
    };
  },
  mounted() {
    this.$Message.success("123");
  },
  methods: {
    getInfo() {
      var that = this;
      let data = { username: "123", password: "123" };
      let config = {
        url: "http://10.100.216.20:7999/api/login",
        data: qs.stringify(data),
        method: "POST"
      };
      instance(config)
        .then(function(response) {
          console.log(this);
          that.infomation = "123";
          //this.infomation = "123";不生效，因为这里的this已经是undifined
        })
        .catch(err => {
          console.log(err);
        });
    },

    changeval() {
      instance({
        url: "http://localhost:7999/api/test",
        method: "get"
      })
        .then(response => {
          console.log(response);
          this.infomation = "rdsfgdf"; //使用箭头函数，这里的this还是vue对象
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

