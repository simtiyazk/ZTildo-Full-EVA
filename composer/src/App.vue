<template>
  <section class="app-wrapper">
    <router-view/>
    <b-alert
      class="system-message"
      :show="getApp.message.text !== '' ? 5 : 0"
      dismissible
      fade
      :variant="getApp.message.type"
      @dismissed="deleteAppMessage"
    >
      {{ getApp.message.text }}
    </b-alert>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SlideList',
  computed: {
    ...mapGetters({getApp: 'AppModule/getApp'})
  },
  methods: {
    ...mapActions({deleteAppMessage: 'AppModule/deleteAppMessage'})
  }
}
</script>
<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
}
.app-wrapper {
  height: 100%;
}
.alert {
  &.system-message {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    margin-bottom: 0;
    z-index: 2;
  }
}
</style>
