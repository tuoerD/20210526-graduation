<template>
    <div class="tab-class">
        <el-tabs type="border-card">
            <el-tab-pane label="护肤">
              <Classbyfunc></Classbyfunc>
              <SlideShow></SlideShow>
            </el-tab-pane>
            <el-tab-pane label="美妆">
              <Classbyfunc2></Classbyfunc2>
              <SlideShow2></SlideShow2>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Classbyfunc from '../components/Classbyfunc.vue';
import Classbyfunc2 from '../components/Classbyfunc2.vue';
import SlideShow from '../components/SlideShow.vue';
import SlideShow2 from '../components/SlideShow2.vue';
export default {
  name: 'Tabclass',
  data () {
    return {
      
    }
  },
  components: {
    Classbyfunc,
    Classbyfunc2,
    SlideShow,
    SlideShow2,
  },
}
</script>

<style scoped>
.tab-class{
    margin: 0 auto;
}
</style>