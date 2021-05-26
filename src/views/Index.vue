<template>
  <div class="hello">
    <Top></Top>
    <Search></Search>
    <Tabclass></Tabclass>
    <Produce></Produce>
  </div>
</template>

<script>
import Classbyfunc from "../components/Classbyfunc.vue";
import Search from "../components/Search.vue";
import Tabclass from "../components/Tabclass.vue";
import Top from "../components/Top.vue";
import Produce from "../components/Produce.vue";
export default {
  name: "Index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  components: {
    Top: Top,
    Tabclass,
    Classbyfunc,
    Search,
    Produce,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 10px 10px;
}
a {
  color: #42b983;
}
.divider-line {
  padding-top: 30px;
}
</style>
