<template>
  <form :class="customClass" @submit="onSubmit" :name="name">
    <slot v-bind:errors="errors"></slot>
  </form>
</template>

<script>
import Validator from './validator.js';
export default {
  props: {
    validationSchema: {
      type: Object
    },
    customClass: {
      type: String
    },
    modelName: {
      type: String
    },
    name: {
      type: String,
      default: 'form'
    }
  },
  mixins: [Validator.createMixin()],
  components: {},
  computed: {},
  data() {
    return {};
  },
  methods: {
    onSubmitValid() {
      this.$emit('on-submitted');
    }
  }
};
</script>
