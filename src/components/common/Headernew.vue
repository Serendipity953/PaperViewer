<template>
    <div class="header">
        <el-header>
            <div class="title">毕业论文管理系统</div>
            <div class="options">
                <el-tabs  @tab-click="handleClick">
                    <template v-for="(item, index) in menus">
                        <el-tab-pane  :index="index +''" :key="index" v-if="!item.hidden">
                            <span slot="label"> {{ item.name }}</span>
                        </el-tab-pane>

                    </template>
                </el-tabs>
            </div>
        </el-header>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            menus: []
        }
    },
    created() {
        this.menus = [...this.$router.options.routes]
        console.log(this.menus)
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-header {
    background: #bd162c;
    color: #fff;
    line-height: 60px;
    display: flex;
    justify-content: flex-start;
    margin-left: 0;
    padding: 0 20px;
    padding-top: 0px;
    padding-right: 20px;
    padding-bottom: 0px;
    padding-left: 0px;

    .title {
        width: 200px;
        font-size: 20px;

    }

    .options {
        width: 600px;
    }
}
</style>
  