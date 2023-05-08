<template>
  <div class="menu">
    <el-aside width="200px">
      <el-menu  router default-active="2" class="el-menu-vertical-demo" background-color="#bd162c" text-color="#fff"
        active-text-color="#ffd04b">
        <template v-for="(item) in menus" >
            <el-menu-item-group v-for="(child,index) in item.children" :key="index" >
              <el-menu-item :index="child.path" v-if="!item.hidden && item.meta.role==role">{{ child.name }}</el-menu-item>
            </el-menu-item-group>
        </template>

      </el-menu>

    </el-aside>
  </div>
</template>
  
<script>
import { getToken } from '../../utils/setToken.js'
export default {
  data() {
    return {
      menus: [],
      role:null
    };
  },
  created() {
    //console.log(this.$router.options.routes);
    this.menus = [...this.$router.options.routes]
    //console.log(this.menus)
    var userrole=this.userInfo = getToken('userrole')
    this.role=userrole
    //console.log(this.role)
  }


}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.menu {
  .el-aside {
    height: 100%;

    .el-menu {
      height: 100%;
      .el-icon-location{
        margin-right: 10px;
      }
    }

    .el-submenu .el-menu-item {
      min-width: 0;
    }
  }
}
</style>
  