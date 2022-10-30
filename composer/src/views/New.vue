<template>
  <section class="new">
    <section class="new__view">
      <b-button class="button-back" title="Back" variant="link" v-b-tooltip.hover="{ variant: 'info' }" @click="goToIndex"><b-icon-arrow-left-circle-fill /></b-button>
      <div class="new__view__container">
        <span class="new__title">New Presentation</span>
        <b-form-input class="input" v-model="presentation.presentationId" placeholder="Presentation ID"></b-form-input>
        <b-form-input class="input" v-model="presentation.name" placeholder="Presentation Name"></b-form-input>
        <b-form-input class="input" v-model="presentation.product" placeholder="Product"></b-form-input>

        <div class="new__cta-container">
          <button class="new__cta button-bondiblue" @click="createPresentation">CREATE</button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex'

export default {
  name: 'New',
  data() {
    return ( {
      presentation: {
        presentationId: '',
        name: '',
        product: '',
        useShared: true,
        savedSlides: [],
        slides: []
      }
    })
  },
  components: {
  },
  methods: {
    ...mapActions({
      setNewPresentation: 'PresentationModule/setNewPresentation',
      clearPresentationInfo: 'PresentationModule/clearPresentationInfo'
    }),
    createPresentation() {
      this.setNewPresentation(this.presentation)
      this.$router.push('build')
    },
    goToIndex() {
      this.$router.push('/')
    }
  },
  mounted(){
    this.clearPresentationInfo()
  }
}
</script>
<style lang="scss" scoped>
  @import "../assets/styles/form";

  .new {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: $color-tertiary;
    &__view {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 95%;
      height: rem(430);
      max-width: rem(730);
      padding: 0 rem(10);
      background-color: $color-primary;
      box-shadow: 0 0 rem(20) rem(5) $color-black-trans-2;
      &__container {
        width: rem(450);
      }
    }
    &__title {
      font-size: rem(25);
      font-weight: bold;
      color: $color-tertiary;
    }
    &__cta-container {
      margin-top: rem(50);
      text-align: center;
    }
    &__cta {
      width: rem(340);
      margin: 0 auto;
      font-weight: bold;
    }
    .button-back {
      position: absolute;
      top: rem(10);
      left: rem(10);
      svg {
        fill: $color-tertiary;
      }
    }
  }
</style>