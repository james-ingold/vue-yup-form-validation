import Vue from 'vue';
import Vuex from 'vuex';
import { storiesOf } from '@storybook/vue';

import VueYupFormValidation from '../src/vue-yup-form-validation';

Vue.use(Vuex);
Vue.use(VueYupFormValidation);

const withSettings = component => ({
  yupFormValidationSettings: new VueYupFormValidation(),
  ...component
});

const stories = storiesOf('VueYupFormValidation', module);

stories
  // Add some stories here to make your plugin more descriptive
  .add(
    'My Customs  Component',
    () =>
      withSettings({
        template: `
        <div>
          <vue-yup-form-validation />
        </div>
      `
      }),
    {
      notes: `
        # Using \`vue-yup-form-validation\`

        \`\`\`html
        <template>
          <vue-yup-form-validation />
        </template>
        \`\`\`
      `
    }
  )
  .add(
    'My Custom Component with another markup',
    () =>
      withSettings({
        template: `
        <div>
          <b>Hello</b>
          <vue-yup-form-validation />
          <i>world</i>
        </div>
      `
      }),
    {
      notes: `
        # Using \`vue-yup-form-validation\` with other components

        \`\`\`html
        <template>
          <div>
            <b>Hello</b>
            <vue-yup-form-validation />
            <i>world</i>
          </div>
        </template>
        \`\`\`
      `
    }
  );
