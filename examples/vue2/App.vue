<template>
  <div>
    <h1>Simple Vue Form Validation with Yup</h1>
    <vue-yup-form :validationSchema="schema" model-name="user" v-on:on-submit="submitted()">
      <template slot-scope="{ errors }">
        <BaseInput
          name="firstName"
          type="text"
          label="First Name"
          v-model="user.firstName"
          placeholder="Your first name"
          :errors="errors['firstName']"
        />
        <BaseInput
          name="lastName"
          type="text"
          label="Last Name"
          v-model="user.lastName"
          placeholder="Your last name"
          :errors="errors['lastName']"
        />
        <button class="px-2 py-2 bg-blue-400 text-white rounded" type="submit">
          Submit
        </button>
      </template>
    </vue-yup-form>
  </div>
</template>

<script>
import BaseInput from './BaseInput.vue';
import { schema } from './user.schema.js';
export default {
  components: {
    BaseInput
  },
  data() {
    return {
      schema: schema,
      user: {
        firstName: '',
        lastName: ''
      }
    };
  },
  methods: {
    submitted() {
      alert('form is valid');
    }
  }
};
</script>

<style></style>
