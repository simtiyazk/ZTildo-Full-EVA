<template>
  <section class="slide-edit d-flex flex-column">

    <SlideView></SlideView>

    <div class="d-flex justify-content-between mt-2">
      <button class="button-darkgrey" :disabled="!slideEdit.modified && slideEdit.isNew" @click="clearEditingSlide">Cancel</button>
      <button class="button-bondiblue" :disabled="!slideEdit.modified" @click="saveAndClearEditingSlide">Save</button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SlideView from '@/components/Slide-view.vue'

export default {
  name: 'SlideEdit',
  computed: {
    ...mapGetters({
      slideEdit:'SlideEditModule/getSlideEdit'
    })
  },
  methods: {
    ...mapActions({
      setAppMessage: 'AppModule/setAppMessage',
      saveSlideOnEdition:'SlideEditModule/saveSlideOnEdition',
      clearEditingSlide: 'SlideEditModule/clearEditingSlide'
    }),
    saveAndClearEditingSlide: function() {
      if(!this.slideEdit.id || this.slideEdit.id === '') {
        this.slideEdit.errors.inputId = true
        this.setAppMessage({
          text: 'Slide id is required',
          type: 'danger'
        })
        return
      }
      this.saveSlideOnEdition()
      this.clearEditingSlide()
    }
  },
  components: {
    SlideView,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .slide-edit {
    padding: 0 rem(30) rem(20) 0;
  }
</style>
