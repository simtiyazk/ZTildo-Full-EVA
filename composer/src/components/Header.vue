<template>
  <div class="header bg-darkblue">
    <div class="container-fluid h-100">
      <div class="row row--no-gutter d-flex justify-content-between align-items-center h-100">
        <Logo />
        <span>
          <b-icon icon="person-square" variant="secondary"></b-icon>
          <span class="pl-2 text-white">{{ getUser.name }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '@/components/Logo.vue'

export default {
  name: 'Header',
  components: {
    Logo
  },
  computed: {
    ...mapGetters({getUser: 'UserModule/getUser'})
  }
}
</script>
<style scoped lang="scss">
  .header {
    height: $header-height;
    .container-fluid {
      width: $page-width;
      max-width: $page-max-width;

      @media only screen and (min-width: 768px) {
        width: $page-sm-width;
      }
      @media only screen and (min-width: 1024px) {
        width: $page-md-width;
      }
      @media only screen and (min-width: 1440px) {
        width: $page-lg-width;
      }
    }
  }
</style>