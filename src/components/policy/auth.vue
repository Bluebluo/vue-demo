<template>
  <div><a @click="auth">auth</a>
  </div>
</template>
<script>
import Axios from "axios";
import { getUser } from "@/libs/util";

const user = getUser();

const conf = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: "Bearer " + user.token
  },
  timeout: 5000
};

const instance = Axios.create(conf);
instance.interceptors.request.use(config => {
  if (!config.url.includes("/api/login")) {
    const user = getUser();
    if (user && user.token) {
      config.headers.Authorization = "Bearer " + user.token;
    }
  }
  return config;
});
export default {
  name: "auth",
  methods: {
    auth() {
      instance({
        url: "http://10.100.216.20:7999/api/test",
        method: "GET"
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

