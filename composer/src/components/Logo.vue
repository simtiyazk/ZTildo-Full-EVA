<template>
  <span class="logo">
    <span class="logo__brand">VEEVA</span><span class="logo__desc text-white"> | Visual Composer</span>
  </span>
</template>

<script>
export default {
  name: "Logo",
  components: {},
};
</script>
<style scoped lang="scss">
  .logo {
    &__brand {
      color: $color-tertiary;
      font-weight: bold;
    }
    &__desc {
      color: $color-white;
    }
  }
</style>