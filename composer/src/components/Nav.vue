<template>
  <div class="nav bg-darkgray">
    <div class="container-fluid h-100">
      <div class="row row--no-gutter d-flex justify-content-between align-items-center h-100">
        <b-navbar class="bg-darkgray w-100 p-0" type="dark">
          <b-collapse id="nav-collapse" is-nav>
            <!--<b-navbar-nav>
              <b-nav-item href="/">Home</b-nav-item>
              <b-nav-item href="/gallery">Gallery</b-nav-item>
            </b-navbar-nav>-->

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  components: {},
};
</script>
<style scoped lang="scss">
  .nav {
    height: $nav-height;
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