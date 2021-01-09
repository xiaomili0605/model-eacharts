<template>
  <div class="container">
    <header>标题: xxxxxxxxxxxxx</header>
    <div class="main">
      <aside class="main_left">
        <el-menu
          unique-opened
          class="el-menu-vertical-demo"
          background-color="#333E51"
          text-color="#FFFFFF"
          active-text-color="#FFFFFF"
          :default-openeds="openeds"
        >
          <el-submenu :index="item.id" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              :index="subItem.id"
              v-for="subItem in item.children"
              :key="subItem.id"
              :style="highlight == subItem.id ? 'color: #409EFF' : ''"
              @click="handleMenu(subItem, item)"
            >
              <template slot="title">
                <i
                  :class="subItem.icon"
                  :style="highlight == subItem.id ? 'color: #409EFF' : ''"
                ></i>
                <span>{{ subItem.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </aside>
      <main class="main_right">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      menuList: [
        {
          title: "模型展示",
          icon: "el-icon-s-data",
          id: "1",
          path: "",
          children: [
            {
              title: "模型1",
              icon: "el-icon-menu",
              path: "/modelManage/modelDetails",
              id: "2",
            },
            {
              title: "模型2",
              icon: "el-icon-menu",
              path: "/modelManage/modelDetails",
              id: "3",
            },
          ],
        },
        {
          title: "模型管理",
          icon: "el-icon-s-operation",
          id: "3",
          path: "",
          children: [
            {
              title: "模型列表",
              icon: "el-icon-document",
              path: "/modelManage/modelList",
              id: "4",
            },
          ],
        },
      ],
    };
  },
  created() {
    // 第一次进入页面默认渲染第一个模型  刷新时显示当前页面
    if (!window.sessionStorage.getItem("subMenuId")) {
      this.$router.push({
        path: "/modelManage/modelDetails",
        query: { id: this.menuList[0].children[0].id },
      });
    } else {
      this.$router.push({
        path: window.sessionStorage.getItem("subMenuPath"),
        query: { id: window.sessionStorage.getItem("subMenuId") },
      });
    }
  },
  computed: {
    // 第一次进入页面展开一级模型菜单  类型要求["1"]
    // 刷新时：展开对应的一级菜单
    openeds() {
      let menuId = window.sessionStorage.getItem('menuId')
      if(!menuId) {
         return ['1']
      } else {
        let temp = []
        temp.push(menuId)
        return temp
      }
    },
    // 菜单高亮
    highlight() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      }
      return 2;
    },
  },
  methods: {
    // 二级菜单切换时：显示对应数据
    handleMenu(submenu, menu) {
      this.$router.push({ path: submenu.path, query: { id: submenu.id }});
      window.sessionStorage.setItem("subMenuId", submenu.id); // 二级菜单id
      window.sessionStorage.setItem("subMenuPath", submenu.path); // 二级菜单路由
      window.sessionStorage.setItem("menuId", menu.id) // 一级菜单id
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  header {
    font-size: 0.2rem;
    height: 0.6rem;
    line-height: 0.6rem;
    background: #0079d6;
    color: #ffffff;
    padding-left: 0.2rem;
  }
  .main {
    flex: 1;
    display: flex;
    .main_left {
      min-width: 1.8rem;
      overflow: hidden;
    }
    .main_right {
      flex: 1;
    }
  }
}

.el-menu {
  border: none;
  height: 100%;
  background: #333e51;
  i {
    margin-right: 0.1rem;
  }
  i,
  span {
    font-size: 0.12rem;
  }
}
</style>
