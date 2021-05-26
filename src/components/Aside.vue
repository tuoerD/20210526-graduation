<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="bisque"
            text-color="#ffffff"
            active-text-color="#F497C6"
            router
        >
        <template v-for="item in items">
            <template>
                <el-menu-item :index="item.index" :key="item.index">
                    <div v-if="!collapse">
                    <i :class="item.icon"></i>
                    {{item.title}}</div>
                    <div v-else><i :class="item.icon"></i></div>
                </el-menu-item>
            </template>
        </template>
        </el-menu>
    </div>
</template>

<script>
import bus from "../js/bus"
export default {
  name: 'Aside',
  data(){
      return{
          collapse:false,
          items:[
              {
                  icon:'el-icon-pie-chart',
                  index:'InfoPage',
                  title:'系统首页',
              },
              {
                  icon:'el-icon-user',
                  index:'Consumer',
                  title:'用户管理',
              },
              {
                  icon:'el-icon-goods',
                  index:'Producer',
                  title:'化妆品管理',
              },
              {
                  icon:'el-icon-document',
                  index:'OrderPage',
                  title:'订单管理',
              },
              {
                  icon:'el-icon-office-building',
                  index:'StorePage',
                  title:'店铺管理',
              },
          ]
      }
  },
  computed:{
      onRoutes(){
          return this.$route.path.replace('/','');
      }
  },
  created(){
      bus.$on('collapse',msg=>{
          this.collapse=msg
      })
  }
}
</script>

<style scoped>
.sidebar{
    display: block;
    position: absolute;
    /* left: 0; */
    top: 70px;
    bottom: 0;
    background-color: bisque;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar{
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse){
    width: 150px;
}
.sidebar >ul{
    height: 100%;
}
</style>