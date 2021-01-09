<template>
  <div class="">
    {{ id }}
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      id: null,
    };
  },
  watch: {
    $route: {
      handler() {
        this.id = this.$route.query.id;
        this.getModelList();
      },
      deep: true,
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getModelList();
  },
  methods: {
    getModelList() {
      // 获取数据
    }
  },
  components: {},
};
</script>

<style scoped lang="scss">
</style>
