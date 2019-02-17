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
        <headerMenu
          :customerName="getUsername"
          :breadMenu="getMenuList"
        ></headerMenu>
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
                :to="`${child.to}`"
              >
              {{ child.title }}
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem
              v-for="bread in tagNavList"
              :name="bread.name"
              :key="bread.id"
            >{{bread.name }}</BreadcrumbItem>
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
            <p>tag Nav LIST = {{tagNavList}}</p>]
            <p> userAvator = {{userAvator}} ...</p>
            <p> cacheList = {{cacheList}} ...</p>
            <p> menuList = {{menuList}} ...</p>
            <button @click="direct(123)">testview</button>
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import { getModelData } from "@/api/data";
import { getNextName, getNewTagList } from "@/libs/util";
import headerMenu from "./header-bar/header-menu.vue";
export default {
  name: "home",
  components: {
    headerMenu
  },
  data: function() {
    return {
      username: "",
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
              title: "基本信息查询",
              to: "/claim"
            },
            {
              id: 2,
              title: "理赔信息查询",
              to: "/claim"
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
    console.log(this.$route.matched);
    this.setTagNavList();
    this.addTag(this.$store.state.app.homeRoute);
    this.setBreadCrumb(this.$route.matched);
    this.getModel(1);
    this.username = this.$store.state.user.username;
  },
  methods: {
    ...mapMutations(["setBreadCrumb", "setTagNavList", "addTag", "setLocale"]),
    getModel(username) {
      getModelData(username).then(
        res => {
          console.log(res);
        },
        err => {
          this.$Message.info(err);
          console.log(err);
        }
      );
    },
    direct(routeName) {
      this.$router.push({
        name: "claim"
      });
    }
  },
  computed: {
    tagNavList() {
      return this.$store.state.app.tagNavList;
    },
    tagRouter() {
      return this.$store.state.app.tagRouter;
    },
    userAvator() {
      return this.$store.state.user.avatorImgPath;
    },
    cacheList() {
      return this.tagNavList.length
        ? this.tagNavList
            .filter(item => !(item.meta && item.meta.notCache))
            .map(item => item.name)
        : [];
    },
    menuList() {
      return this.$store.getters.menuList;
    },
    locale() {
      return this.$store.state.app.locale;
    },
    getUsername() {
      return this.$store.state.user.username;
    },
    getMenuList() {
      return this.$store.getters.menuList;
    }
  },
  watch: {
    $route(newRoute) {
      this.setBreadCrumb(newRoute.matched);
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
    }
  }
};
</script>
