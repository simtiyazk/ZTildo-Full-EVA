<template>
  <b-row>
    <b-col class="pb-3" sm="12" align="center">
      <button class="btn-upload" @click="uploadFile"><span class="btn-icon">Upload</span></button>
      <input type="file" @change="handleFile" ref="fileInput" style="display: none">
    </b-col>
    <b-col class="gallery" sm="12">
      <b-row>
        <b-col class="pb-3" sm="3" v-for="(image, key) in items" :key="key">
          <b-card
            class= 'gallery__image'
            no-body
            :img-src="'images/'+image.file.id"
            img-alt="Image"
            img-top
            v-on:click="setBackground(image.file.id)"
          >
            <b-card-footer class="d-flex justify-content-around align-items-center" align="center">
              <button class="gallery-button button-danger" v-on:click='remove(image.file.id)'>Delete</button>
              <button class="gallery-button button-bondiblue" v-if="in_modal === 'true'" v-on:click="setSlideBackground(image.file.id)" v-show="image.file.id !== slideEdit.backgroundUrl">Select</button>
              <button class="gallery-button button-blue" v-if="in_modal === 'true'" v-show="image.file.id === slideEdit.backgroundUrl">Selected</button>
            </b-card-footer>
          </b-card>
        </b-col>

      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: "Image-gallery",
  props: ['in_modal'],
  data() {
    return {
      items: {}
    }
  },
  computed: {
    ...mapGetters({ slideEdit: 'SlideEditModule/getSlideEdit'})
  },
  mounted() {
    this.getFiles()
  },
  methods: {
    ...mapActions({
      setSlideEditModifiedStatus: 'SlideEditModule/setSlideEditModifiedStatus',
      setBackground: 'SlideEditModule/setBackground'
    }),
    setSlideBackground(imageFileId) {
      this.setBackground(imageFileId)
      this.setSlideEditModifiedStatus(true)
    },
    uploadFile() {
      this.$refs.fileInput.click()
    },
    handleFile(ev) {
      const _this = this
      const file = ev.target.files[0]
      const formData = new FormData()
      formData.append('filetoupload', file)
      axios.post('/api/saveimage',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(function(response) {
          _this.setBackground(response.data.file.name)
          _this.getFiles();
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    remove(file){
      let _this = this
      axios.delete('/api/image/'+file)
        .then(function() {
          _this.getFiles()
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    getFiles(){
      axios.get('/api/images')
        .then(response => (this.items = response.data))
        .catch(function(err) {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
#modal-gallery {
  .modal-dialog {
    max-width: 80vw;
    .modal-content {
      max-height: 90vh;
      border-radius: 0;
      .modal-header {
        border-bottom: rem(2) solid $color-tuna;
        .modal-title {
          color: $color-tertiary;
        }
        .close {
          opacity: 1;
          font-size: rem(30);
          font-weight: bold;
          color: $color-tuna;
        }
      }
      .modal-body {
        padding-bottom: 0;
        .btn-upload {
          width: rem(176);
          height: rem(50);
          padding: 0;
          border: 0;
          font-size: rem(20);
          font-weight: bold;
          color: $color-white;
          background-color: $color-tertiary;
          .btn-icon {
            position: relative;
            display: inline-block;
            padding-right: rem(35);
            &:after {
              content: '';
              position: absolute;
              top: rem(7);
              right: 0;
              bottom: 0;
              width: 0;
              height: 0;
              border-left: rem(7) solid transparent;
              border-right: rem(7) solid transparent;
              border-bottom: rem(14) solid $color-white;
            }
          }
        }
        .gallery {
          overflow-y: auto;
          max-height: calc(90vh - 134px - 102px);
          &-button {
            width: rem(70);
            height: rem(30);
            padding: 0;
            line-height: rem(30);
            font-size: rem(14);
          }
          &__image {
            cursor: pointer;
          }
          .col {
            padding-right: 0;
            padding-left: rem(20);
            &:last-of-type {
              padding-right: rem(20);
            }
          }
          .card {
            max-width: rem(300);
            margin: 0 auto;
            border: rem(1) solid $color-primary;
            &-footer {
              height: rem(50);
              padding: 0;
              background-color: $color-tuna;
            }
          }
        }
      }
      .modal-footer {
        height: rem(70);
        border-top: rem(2) solid $color-tuna;
        .btn-primary {
          background-color: $color-tertiary;
          border-radius: 0;
          border: 0;
        }
      }
    }
  }
}
</style>
