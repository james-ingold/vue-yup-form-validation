/*
Nuxt.js module for vue-yup-form-validation
Usage:
    - Install vue-yup-form-validation package
    - Add this into your nuxt.config.js file:
    {
        modules: [
            // Simple usage
            'vue-yup-form-validation/nuxt'
            // Optionally passing options in module configuration
            ['vue-yup-form-validation/nuxt', { ...options }]
        ],
        // Optionally passing options in module top level configuration
        VueYupFormValidation: { ...options }
    }
*/

const { resolve } = require('path');

module.exports = function nuxtVueWaitModule(moduleOptions) {
  const options = Object.assign({}, this.options.VueYupFormValidation, moduleOptions);

  // Register plugin
  this.addPlugin({
    src: resolve(__dirname, 'vue-yup-form-validation-plugin.template.js.tpl'),
    fileName: 'vue-yup-form-validation-plugin.js',
    options: options
  });
};

// required by nuxt
module.exports.meta = require('../package.json');
