<template>
  <section class="slide-list__slide">
    <div class="slide-list__slide__preview d-flex flex-column align-items-start">
      <img class="slide-list__slide__img" :src=" './images/' + background" alt="">
      <section class="controls-top d-flex justify-content-between mb-auto w-100" role="group">
        <div class="d-flex flex-column">
          <div class="slide-list__slide__index">{{ presentation.slides[index].id }}</div>
        </div>
        <b-button class="button-status align-self-start p-0" variant="link" @click="toggleActiveSlide(index)" v-b-tooltip.hover="{ variant: 'info' }" title="Active status">
          <b-icon class="text-white"
            :class="presentation.slides[index].isActive ? 'bg-darkblue' : 'bg-gray'"
            :icon="presentation.slides[index].isActive ? 'check' : 'slash'"
            font-scale="1"
            variant="light"></b-icon>
        </b-button>
      </section>
      <div class="controls-bottom w-100 text-right">
        <div class="slide-list__slide__ctas btn-group">
            <b-button
              class="controls-bottom__cta p-0"
              :class="slideEdit.index === index ? 'bg-primary' : 'bg-gray'"
              variant="link"
              v-b-tooltip.hover="{ variant: 'info' }"
              title="Edit"
              @click="loadSlideForEdit(index)">
              <b-icon class="text-white"
                icon="pencil-square"
                font-scale=".8"
                variant="light"></b-icon>
            </b-button>
            <button title="Duplicate" @click="duplicateSlide(index)" v-b-tooltip.hover="{ variant: 'info' }"><b-icon-files></b-icon-files></button>
            <button title="Delete" @click="deletingSlide(index)" v-b-tooltip.hover="{ variant: 'info' }"><b-icon-trash></b-icon-trash></button>
          </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SlideListSlide',
  props: {
    index: Number,
    background: String
  },
  computed: {
    ...mapGetters({
      presentation: 'PresentationModule/getPresentation',
      slideEdit: 'SlideEditModule/getSlideEdit'
    })
  },
  methods: {
    ...mapActions({
      loadSlideForEdit: 'SlideEditModule/loadSlideForEdit',
      duplicateSlide: 'PresentationModule/duplicateSlide',
      deleteSlide: 'PresentationModule/deleteSlide',
      toggleActiveSlide:'PresentationModule/toggleActiveSlide',
      clearEditingSlide: 'SlideEditModule/clearEditingSlide'
    }),
    deletingSlide(index) {
      if(this.slideEdit.index === index) {
        this.clearEditingSlide()
      }
      this.deleteSlide(index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .slide-list__slide {
    padding: rem(20) 0;
    border-bottom: rem(1) solid $color-secondary;
    &:last-of-type {
      border-bottom: none;
    }
    &__preview {
      position: relative;
      width: 100%;
      padding-top: 75%;
    }
    &__index {
      padding: rem(5) rem(10);
      z-index: 1;
      background-color: $color-secondary;
      color: $color-white;
    }
    &__ctas {
      button {
        width: rem(20);
        height: rem(20);
        margin-top: rem(5);
        margin-right: rem(5);
        padding: 0;
        border: none;
        font-size: rem(14);
        line-height: rem(11);
        background-color: $color-grey;
        color: $color-white;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
    &__img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .button-status,
    .controls-bottom {
      z-index: 1;
    }
    .button-status {
      display: flex;
      width: rem(20);
      height: rem(20);
      border: none;
    }
    .controls-top {
      position: absolute;
      top: 0;
    }
    .controls-bottom {
      position: absolute;
      bottom: 0;
      width: rem(20);
      height: rem(20);
      &__cta {
        display: flex;
        justify-content: center;
        align-items: center;
        width: rem(20);
        height: rem(20);
        margin-left: auto;
        border: none;
        border-radius: initial;
      }
    }
  }
</style>
