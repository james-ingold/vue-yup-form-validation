# VueYupFormValidation

Super simple form validation in Vue2 with yup schemas

## Installation

### 1. Install

```
yarn add vue-yup-form-validation
# or
npm i vue-yup-form-validation --save
```

### 2. Plug-in

```js
import VueYupFormValidation from 'vue-yup-form-validation';

Vue.use(VueYupFormValidation);
```

### 3. Use in your components

props:

- validationSchema: The yup schema to use
- model-name: The data object property to use
- on-submit: Callback for when the form is valid

slot-scoped errors:

- Use a template with slot-scope="{errors}" to access errors

```vue
<template>
  <vue-yup-form :validationSchema="schema" model-name="user" v-on:on-submit="submitted()">
    <template slot-scope="{ errors }">
      <div>
        <label for="firstName">First Name</label>
        <span v-show="errors['firstName']">
          {{ errors['firstName'].join(' ') }}
        </span>
      </div>
      <input
        v-bind:class="{ 'border-red-400': errors['firstName'] }"
        placeholder="First Name"
        name="firstName"
        type="text"
        v-model="user.firstName"
      />
      <div>
        <label for="lastName">Last Name</label>
        <span v-show="errors['lastName']">
          {{ errors['lastName'].join(' ') }}
        </span>
      </div>
      <input
        v-bind:class="{ 'border-red-400': errors['lastName'] }"
        placeholder="Last Name"
        name="lastName"
        type="text"
        v-model="user.lastName"
      />
      <button type="submit">
        Submit
      </button>
    </template>
  </vue-yup-form>
</template>

<script>
export default {
  data() {
    return {
      schema: {
        firstName: yup
          .string()
          .required('First Name is Required')
          .label('First Name'),
        lastName: yup
          .string()
          .required('Last Name is Required')
          .label('Last Name')
      },
      user: {
        firstName: '',
        lastName: ''
      }
    };
  },
  submitted() {
    console.log('form is valid');
  }
};
</script>
```

## License

[MIT](http://opensource.org/licenses/MIT)
