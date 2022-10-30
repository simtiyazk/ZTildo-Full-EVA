<template>
  <b-modal
    class="presentation-setup"
    id="modal-presentation-setup"
    ref="modal"
    title="Presentation Setup"
    @cancel="resetModal"
    @ok="handleOk">
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label="Id"
        label-for="id-input"
        invalid-feedback="Id is required"
        :state="validateId"
      >
        <b-form-input
          id="id-input"
          v-model="presentationId"
          :state="validateId"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Name"
        label-for="name-input"
        invalid-feedback="Name is required"
        :state="validateName"
      >
        <b-form-input
          id="name-input"
          v-model="name"
          :state="validateName"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Product"
        label-for="product-input"
        invalid-feedback="Product is required"
        :state="validateProduct"
      >
        <b-form-input
          id="product-input"
          v-model="product"
          :state="validateProduct"
          required
        ></b-form-input>
      </b-form-group>

        <b-form-checkbox
          id="use-shared-checkbox"
          v-model="useShared"
          name="use-shared-checkbox"
          value="true"
          unchecked-value="false"
          disabled
        >
          Use Shared
        </b-form-checkbox>
    </form>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "PresentationSetupModal",
  data() {
    return {
      presentationId: '',
      name: '',
      product: '',
      useShared: true
    }
  },
  computed: {
    ...mapGetters({
      app: 'AppModule/getApp',
      presentation: 'PresentationModule/getPresentation'

    }),
    validateId() {
      return (this.presentationId !== undefined && this.presentationId !== '')
    },
    validateName() {
      return (this.name !== undefined && this.name !== '')
    },
    validateProduct() {
      return (this.product !== undefined && this.product !== '')
    }
  },
  methods: {
    ...mapActions({
      updatePresentationSavedStatus:'PresentationModule/updatePresentationSavedStatus',
      setTemporalPresentationConfig: 'AppModule/setTemporalPresentationConfig'
    }),
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      return valid
    },
    resetModal(bvModalEvent) {
      if(bvModalEvent.trigger === 'cancel') {
        this.loadDefaultConfiguration()
      }
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      //Check if value changed
      if(this.presentationId !== this.presentation.presentationId ||
        this.name !== this.presentation.name ||
        this.product !== this.presentation.product ||
        this.useShared !== this.presentation.useShared) {
          this.updatePresentationSavedStatus(false)
          // Save the presentation data temporarily
          this.setTemporalPresentationConfig({
            presentationId: this.presentationId,
            name: this.name,
            product: this.product,
            useShared: this.useShared
          })
        }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-presentation-setup')
      })
    },
    loadDefaultConfiguration() {
      if(this.app.presentation.isConfSaved) {
        this.presentationId = this.presentation.presentationId,
        this.name = this.presentation.name,
        this.product = this.presentation.product,
        this.useShared = this.presentation.useShared
      } else {
        this.presentationId = this.app.presentation.presentationId,
        this.name = this.app.presentation.name,
        this.product = this.app.presentation.product,
        this.useShared = this.app.presentation.useShared
      }
    }
  },
  mounted() {
    this.loadDefaultConfiguration()
  }
};
</script>
