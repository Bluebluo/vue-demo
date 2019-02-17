
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu
          mode="horizontal"
          theme="dark"
          active-name="1"
        >
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
            Item 1
            </MenuItem>
            <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
            Item 2
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
      </Header>
      <Layout>
        <Sider
          hide-trigger
          :style="{background: '#fff'}"
        >
          <Menu
            active-name="1-1"
            theme="light"
            width="auto"
            :open-names="[1]"
          >
            <Submenu
              v-for="(menu, i) in menus"
              :name="menu.id"
              :key="`menu-${i}`"
            >
              <template slot="title">
                <Icon :type="menu.icon"></Icon>
                {{menu.title}}
              </template>
              <MenuItem
                v-for="(child, j) in menu.children"
                :name="`${menu.id}-${child.id}`"
                :key="`child-${j}`"
              >
              {{ child.title }}
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem
              v-for="bread in breads"
              :name="bread.name"
              :key="bread.id"
            >{{bread.name }} -{{ bread.id}}</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '580px', background: '#fff'}">
            <span
              v-for="(info,index) in menus"
              :key="info.id"
            >
              <span
                v-for="info1 in info.children"
                :key="info1.id"
              >
                {{ info1.id }}
              </span>
            </span>
            <a @click="getModel">modeltest</a>
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { mapMutatuions, mapActions } from "vuex";
import { getModelData } from "@/api/data";

export default {
  name: "home",
  data() {
    return {
      test: [{ title: "1" }, { title: "3" }, { title: "2" }],
      breads: [{ id: 1, name: "Home" }],
      menus: {
        fisrt: {
          id: 1,
          name: "first",
          icon: "ios-navigate",
          title: "保单查询",
          children: [
            {
              id: 1,
              title: "基本信息查询"
            },
            {
              id: 2,
              title: "理赔信息查询"
            },
            {
              id: 3,
              title: "保单信息查询"
            }
          ]
        },
        second: {
          id: 2,
          name: "second",
          icon: "ios-keypad",
          title: "保单管理",
          children: [
            {
              id: 1,
              title: "second_1"
            },
            {
              id: 2,
              title: "second_2"
            },
            {
              id: 3,
              title: "second_3"
            }
          ]
        },
        third: {
          id: 3,
          name: "third",
          title: "保单秘密",
          icon: "ios-analytics",
          children: [
            {
              id: 1,
              title: "third_1"
            },
            {
              id: 2,
              title: "third_2"
            },
            {
              id: 3,
              title: "third_3"
            }
          ]
        }
      }
    };
  },
  mounted: function() {
    this.setTagNavList();
    this.addTag(this.$store.state.app.homeRoute);
    this.setBreadCrumb(this.$route.matched);
    this.getModel(1);
    console.log(this.$store);
  },
  methods: {
    ...mapMutatuions(["setBreadCrumb", "setTagNavList", "addTag", "setLocale"]),
    ...mapActions(["handleLogin"]),
    logout() {
      this.handleLogout().then(() => {
        this.$router.push({
          name: "login"
        });
      });
    },
    getModel(username) {
      getModelData(username).then(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  computed: {
    breadCrumbList() {
      console.log("store++++++" + this.$store.state.app.breadCrumbList);
    }
  }
};
</script>

