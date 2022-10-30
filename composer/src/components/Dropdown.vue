<template>
  <v-select label="name" :options="items" placeholder="No presentation selected" v-on:input="updateValue"></v-select>
</template>

<script>
// @ is an alias to /src
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: 'Index',
  props: ['items','value'],
  components: {
    'v-select': vSelect
  },
  methods: {
    updateValue: function(value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style lang="scss">
  .vs {
    &--searchable {
      &.v-select {
        .vs__dropdown-toggle {
          cursor: pointer;
        }
      }
    }
    &__dropdown-toggle {
      border: 0;
    }
    &__selected-options {
      height: rem(50);
      border-radius: rem(5) 0 0 rem(5);
      font-size: rem(18);
      background-color: $color-tuna;
      .vs__search {
        margin: 0;
        padding-left: rem(15);
        color: $color-white;
      }
    }
    &__selected {
      color: $color-white;
    }
    &__actions {
      justify-content: center;
      width: rem(55);
      height: rem(50);
      padding-left: rem(6);
      border-radius: 0 rem(5) rem(5) 0;
      background-color: $color-secondary;
    }
    &__open-indicator {
      fill: $color-tertiary;
    }
  }
</style>