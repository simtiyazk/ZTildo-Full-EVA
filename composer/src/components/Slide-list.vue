<template>
  <section class="slide-list d-flex flex-column">
    <div class="slide-list__header">
      Slide List
    </div>
    <div class="slide-list__wrapper d-flex flex-column">
      <div class="slide-list__slides d-flex flex-column">
        <draggable v-model="presentation.slides" group="slides" @start="drag=true" @end="drag=false">
          <SlideListSlide
            v-for="(slide, index) in presentation.slides"
            :index="index"
            :background="slide.backgroundUrl"
            :key="slide.id"></SlideListSlide>
        </draggable>
      </div>
      <div class="slide-list__bottom text-center mt-3">
        <div class="slide-list__modifiedActions" v-show="presentation.modified">
          <button class="button-main" @click="cancel">Cancel</button>
          <button class="button-bondiblue" @click="save">Save</button>
        </div>
        <button class="button-main" @click="close" v-show="!presentation.modified">Close Project</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SlideListSlide from '@/components/Slide-list__slide.vue'
import draggable from 'vuedraggable'

export default {
  name: 'SlideList',
  computed: {
    ...mapGetters({presentation: 'PresentationModule/getPresentation'})
  },
  components: {
    SlideListSlide,
    draggable
  },
  methods: {
    ...mapActions({
      savePresentation: 'PresentationModule/savePresentation',
      resetPresentation: 'PresentationModule/resetPresentation',
      clearPresentationInfo: 'PresentationModule/clearPresentationInfo',
      clearEditingSlide: 'SlideEditModule/clearEditingSlide'
    }),

    save() {
      this.savePresentation()
    },
    close() {
      this.clearPresentationInfo()
      this.clearEditingSlide()
      this.$router.push('/')
    },
    cancel() {
      this.resetPresentation()
    },
    setSlideListHeight() {
      document.querySelector('.slide-list__wrapper').style.height =
        document.querySelector('.slide-edit').offsetHeight - 40 + 'px'
    }
  },
  mounted() {
    this.setSlideListHeight()
    window.addEventListener('resize', this.setSlideListHeight);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .slide-list {
    &__header {
      height: rem(40);
      padding: rem(10) rem(20);
      font-size: rem(16);
      background-color: $color-primary;
      color: $color-white;
    }
    &__wrapper {
      flex: 1;
      height: 100%;
      padding: 0 rem(20) rem(20) rem(20);
      background-color: $color-lightGrey;
    }
    &__slides {
      overflow-y: auto;
      flex: 1;
    }
    &__slide {
      cursor: grab;
    }
    &__modifiedActions {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
