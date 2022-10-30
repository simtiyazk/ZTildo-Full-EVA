<template>
  <section class="slide-view">
    <div class="slide-view__head mb-2">
      <div>
        <button class="button-main" v-b-modal.modal-gallery>Set Background</button>
        <b-modal id="modal-gallery" title="Gallery" size="xl" ok-only ok-title="Close">
          <Gallery :in_modal="'true'"/>
        </b-modal>
        <button class="button-main ml-4" @click="onAddCTA">Add CTA</button>
      </div>
      <div class="slide-id">
        <label for="slide-id__input">Id:</label>
        <b-form-input
          id="slide-id__input"
          v-model="slideEdit.id"
          placeholder="Format: 00_00"
          :class="slideEdit.errors.inputId ? 'form-control-error' : ''"
          @change="onChangeInputId">
        </b-form-input>
      </div>
    </div>
    <div class="slide-view__slide bg-darkblue">
      <div class="slide-view__ctas">
        <img class="slide-view__background" v-show="slideEdit.backgroundUrl !== ''" :src="'./images/' + slideEdit.backgroundUrl">
        <VueDraggableResizable class-name="slide-view__box text-right vdr"
          v-for="(cta, index) in slideEdit.ctas"
          :key="index"
          :w="cta.size.width"
          :h="cta.size.height"
          :x="cta.position.x"
          :y="cta.position.y"
          @activated="onActivated(index)"
          @deactivated="onDeactivated"
          @dragging="onDrag"
          @resizing="onResize"
          :parent="true">
          <div class="d-flex justify-content-between px-1 pt-1">
            <a class="badge badge-pill" :class="cta.link === '' ? 'badge-secondary' : 'badge-primary'" :id="'tooltip-link' + index">L</a>
            <button class="cta-close-link badge text-dark" :id="'close-link-' + index" @click="onClose(index)">X</button>
          </div>
          <b-tooltip :target="'tooltip-link' + index">
            <div class="input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Link:</span>
              </div>
              <input class="form-control" type="text" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="cta.link" @change="onLinkChanged">
            </div>
          </b-tooltip>
        </VueDraggableResizable>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import Gallery from '@/components/Image-gallery'
import utils from '../assets/js/utils'

export default {
  name: 'SlideView',
  data() {
    return {
      ctaActive: -1
    }
  },
  components: {
    VueDraggableResizable,
    Gallery
  },
  computed: {
    ...mapGetters({ slideEdit: 'SlideEditModule/getSlideEdit' })
  },
  methods: {
    ...mapActions({
      setSlideEditModifiedStatus: 'SlideEditModule/setSlideEditModifiedStatus',
      updateAppViewSize:'SlideEditModule/updateAppViewSize',
      moveCTAArrows:'SlideEditModule/moveCTAArrows',
      setSlideEditError: 'SlideEditModule/setSlideEditError',
      addCTA: 'SlideEditModule/addCTA',
      dragCTA: 'SlideEditModule/dragCTA',
      resizeCTA: 'SlideEditModule/resizeCTA',
      removeCTA: 'SlideEditModule/removeCTA',
      setBackground: 'SlideEditModule/setBackground'
    }),
    onAddCTA: function() {
      this.addCTA()
      this.setSlideEditModifiedStatus(true)
    },
    onResize: function(x, y, width, height) {
      const index = this.ctaActive
      this.resizeCTA({ index, x, y, width, height })
      this.setSlideEditModifiedStatus(true)
    },
    onDrag: function(x, y) {
      const index = this.ctaActive
      this.dragCTA({ index, x, y })
      this.setSlideEditModifiedStatus(true)
    },
    onActivated: function(i) {
      this.ctaActive = i
    },
    onDeactivated: function() {
      this.ctaActive = -1
    },
    onChangeInputId: function(value) {
      this.setSlideEditError(value)
      this.setSlideEditModifiedStatus(true)
    },
    saveSlideViewWidth: function() {
      let slideViewCtas = document.querySelector('.slide-view__ctas');
      if(slideViewCtas !== null) {
        this.updateAppViewSize({ width: slideViewCtas.offsetWidth, height: slideViewCtas.offsetHeight })
      }
    },
    onClose: function(index) {
      this.removeCTA(index)
    },
    onArrowPress: function(key) {
      //key: up, down, left, right
      const index = this.ctaActive
      this.moveCTAArrows({ index, key })
      this.setSlideEditModifiedStatus(true)
    },
    onLinkChanged: function() {
      this.setSlideEditModifiedStatus(true)
    }
  },
  mounted() {
    this.saveSlideViewWidth()
    let component = this
    let res
    window.onresize = function() {
      if(res) {
        clearTimeout(res)
      }
      res = setTimeout(function() {
        component.saveSlideViewWidth()
      }, 100)
    }

    document.onkeydown = function(e) {
      e = e || window.event;
      if(component.ctaActive >= 0) {
        utils.eventKeyCode(e, function(code){
          if (code == '38' || code === 'ArrowUp') {
            // up arrow
            e.preventDefault()
            component.onArrowPress('up')
          }
          else if (code == '40' || code === 'ArrowDown') {
              // down arrow
            e.preventDefault()
            component.onArrowPress('down')
          }
          else if (code == '37' || code === 'ArrowLeft') {
            // left arrow
            e.preventDefault()
            component.onArrowPress('left')
          }
          else if (code == '39' || code === 'ArrowRight') {
            // right arrow
            e.preventDefault()
            component.onArrowPress('right')
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/styles/form";

  .slide-view {
    max-width: rem(1024);
    &__head {
      display: flex;
      justify-content: space-between;
      .slide-id {
        display: flex;
        align-items: center;
        label {
          margin-bottom: 0;
          padding-right: rem(12);
        }
        input {
          max-width: rem(140);
          border-radius: 0;
        }
      }
    }
    &__slide {
      position: relative;
      width: 100%;
      padding-top: 75%;
      box-shadow: 0 0 rem(5) 0 $color-black-trans-1;
    }
    &__background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
    }
    &__ctas {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* IE10+/Edge */
      user-select: none; /* Standard */
    }
    &__box {
      border: rem(1) solid $color-white;
      background: $color-black-trans-2;
    }
    .cta-close-link {
      position: absolute;
      top: rem(-14);
      right: rem(-14);
      border-width: 0;
    }
  }
</style>
