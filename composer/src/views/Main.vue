<template>
  <div class="h-100 d-flex flex-column">
    <Header />
    <div class="presentation-data container-fluid bg-darkgray py-2">
      <div class="presentation-data__container row justify-content-between align-items-center">
        <div class="presentation-data__name">
            {{ presentation.name }}
          </div>
        <b-button size="sm" class="my-2 my-sm-0 bg-bondiblue border-none" type="button" variant="dark" v-b-modal.modal-presentation-setup>
          <b-icon icon="gear-fill"></b-icon> Edit presentation
        </b-button>
      </div>
    </div>
    <section class="main-wrapper mt-2">
      <div class="main container-fluid">
        <div class="row row--no-gutter">
          <div class="col">
            <SlideEdit />
          </div>
          <div class="col-3 col-xl-2">
            <SlideList />
          </div>
        </div>
      </div>
    </section>
    <PresentationSetupModal />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SlideEdit from '@/components/Slide-edit.vue'
import SlideList from '@/components/Slide-list.vue'
import PresentationSetupModal from '@/components/PresentationSetupModal.vue'

export default {
  name: 'Main',
  components: {
    Header,
    SlideEdit,
    SlideList,
    PresentationSetupModal
  },
  computed: {
    ...mapGetters({presentation: 'PresentationModule/getPresentation'})
  }
}
</script>
<style lang="scss" scoped>
  .presentation-data {
    &__container {
      width: $page-width;
      max-width: $page-max-width;
      margin: 0 auto;
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
    &__name {
      font-size: rem(25);
      color: $color-white;
    }
  }
  .main {
    width: $page-width;
    max-width: $page-max-width;
    &-wrapper {
      display: flex;
      align-items: center;
      flex-grow: 1;
    }
    .row {
      > div {
        padding-right: 0;
        padding-left: 0;
      }
    }
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
</style>
