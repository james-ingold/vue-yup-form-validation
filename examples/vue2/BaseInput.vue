<template>
  <div
    class="TextInput"
    :class="{
      'has-error': !!errorMessage || customError,
      'input-success': !errorMessage && !customError
    }"
  >
    <div class="flex row justify-between">
      <label class="inline-block tracking-wide text-gray-800 text-md mb-2 flex-grow" :for="name">{{
        label
      }}</label>
      <span
        class="text-red-600 text-xs uppercase font-bold mb-2 tracking-wide"
        v-show="errorMessage || customError"
      >
        {{ errorMessage || customError }}
      </span>
    </div>
    <input
      class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      v-bind:class="{ 'border-red-400': errorMessage || customError }"
      :placeholder="placeholder"
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      @input="onInput"
      @blur="handleBlur"
    />
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    errors: {
      type: Array
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      // vuejs3 value => modelValue
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    customError: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: '',
      errorMessage: ''
    };
  },
  created() {
    this.inputValue = this.value;
  },
  watch: {
    value(val) {
      this.inputValue = val;
    },
    errors(val) {
      this.errorMessage = val ? val.join(' ') : '';
    }
  },
  methods: {
    onInput(e) {
      // this.handleChange(e);
      // vuejs3 input -> update:modelValue;
      this.$emit('input', e.target.value);
    },
    handleBlur(e) {
      console.log(e);
    }
  }
};
</script>

<style scoped>
.TextInput {
  position: relative;
  margin-bottom: calc(1em * 1.5);
  width: 100%;
}

label {
  margin-bottom: 4px;
}
</style>
