<template>
  <section class="index">
    <section class="index__view">
      <div class="index__view__container">
        <Logo />
        <b-form-input class="input d-none" v-model="user.name" placeholder="Enter your username"></b-form-input>
        <Dropdown :items="presentationItems" v-model="presentationSelected" v-if="havePresentations"/>
        <div class="index__view__cta-container">
          <button class="index__view__cta button-bondiblue" v-if="presentationSelected" @click="openPresentation">Open</button>
          <button class="index__view__cta button-bondiblue" v-if="!presentationSelected" @click="$router.push('new')">New</button>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'
import Logo from '@/components/Logo.vue'
import Dropdown from '@/components/Dropdown.vue'

export default {
  name: 'Index',
  data() {
    return ({
      presentationItems: [],
      havePresentations: false,
      presentationSelected: null
    })
  },
  components: {
    Logo,
    Dropdown
  },
  computed: {
    ...mapGetters({user: 'UserModule/getUser'})
  },
  methods: {
    ...mapActions({
      loadPresentationList: 'UserModule/loadPresentationList',
      setPresentationData: 'PresentationModule/setPresentationData'
    }),
    openPresentation() {
      this.setPresentationData(this.presentationSelected)
      this.$router.push('build')
    }
  },
  created() {
    this.loadPresentationList()
  },
  mounted() {
    let component = this;
    this.$store.subscribe((mutation) => {
      if(mutation.type === 'UserModule/setPresentationList') {
        if(this.user.presentations.length > 0) {
          component.havePresentations = true
          for(let i = 0; i < this.user.presentations.length; i++) {
            component.presentationItems.push({
              id: this.user.presentations[i].presentation.id,
              presentationId: this.user.presentations[i].presentation.presentationId || '',
              name: this.user.presentations[i].presentation.name,
              product: this.user.presentations[i].presentation.product,
              useShared: this.user.presentations[i].presentation.useShared || this.user.presentations[i].presentation.useShared === 'true',
              slides: this.user.presentations[i].slides
            })
          }
        }
      }
    })
  }

}
</script>
<style lang="scss" scoped>
  @import "../assets/styles/form";

  .index {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: $color-tertiary;
    &__view {
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
      &__cta-container {
        margin-top: rem(50);
        text-align: center;
      }
      &__cta {
        width: rem(340);
        margin: 0 auto;
        font-size: rem(20);
        font-weight: bold;
      }
    }
    .logo {
      font-size: rem(25);
    }
    .v-select {
      margin-top: rem(50);
    }
  }
</style>