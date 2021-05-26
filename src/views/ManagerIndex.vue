<template>
    <div>
        <Header></Header>
        <Aside></Aside>
        <div class="content-box" :class="{'content-collapse':collapse}">
        <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import Aside from '../components/Aside.vue';
import bus from "../js/bus"
export default {
  name: 'ManagerIndex',
  components:{
      Header,
      Aside,
  },
  data(){
      return{
          collapse:false
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
.content-box{
    position: absolute;
    left: 150px;
    right: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background:rgb(255, 255, 255);
}
.content-collapse{
    left: 65px;
}
</style>