<template>
  <div>
    {{ claim }}
    <button
      @click="getOrderGet"
      type="info"
    >order get</button>
    <button
      @click="getOrderPost"
      type="info"
    >order post</button>
  </div>
</template>
<script>
import { getOrder, getOrderPost } from "@/api/data";

export default {
  name: "claim",
  data() {
    return {
      claim: "claiminfo"
    };
  },
  methods: {
    getOrderGet() {
      getOrder().then(res => {
        this.claim = res;
      }).catch(err => {
          console.log
      });
    },
    getOrderPost() {
      getOrderPost().then(res => {
        this.claim = res;
      });
    }
  }
};
</script>

