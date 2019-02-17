<template>
  <div>
    <Menu
      mode="horizontal"
      theme="dark"
      active-name="1"
    >
      <div class="layout-logo"></div>
      <div class="layout-nav">
        <MenuItem name="1">
        <Icon type="ios-navigate"></Icon>
        {{ customerName }}
        </MenuItem>
        <MenuItem name="2">
        <Icon type="ios-keypad"></Icon>
        {{ breadMenu }}
        </MenuItem>
        <MenuItem name="3">
        <Icon type="ios-analytics"></Icon>
        Item 3
        </MenuItem>
        <MenuItem name="4">
        <Icon type="ios-paper"></Icon>
        <a @click="logout">退出</a>
        </MenuItem>
      </div>
    </Menu>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "header-menu",
  data: function() {
    return {};
  },
  props: {
    customerName: {
      type: String,
      default() {
        return "";
      }
    },
    breadMenu: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    ...mapActions(["handleLogout"]),
    logout() {
      this.handleLogout().then(() => {
        this.$router.push({
          name: "login"
        });
      });
    }
  }
};
</script>

