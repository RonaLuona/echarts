<template>
  <div id="container" class="container">
  </div>
</template>

<script>
  import Echart from '@/services/Echart';

  export default {
    name: 'echart-1',
    data() {
      return {};
    },
    methods: {
      initMap() {
        Echart.map();
      },
    },
    created() {
      this.initMap();
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width:1024px;
    height: 800px;
  }
</style>
