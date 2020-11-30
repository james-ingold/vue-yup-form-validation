import { devMode, registerVuexStore } from './utils';

// Import your additional components here
import VueYupFormValidationForm from './vue-yup-form-validation-form.vue';

export default class VueYupFormValidation {
  // HERE IS YOUR PLACE TO DEVELOP YOUR COMPONENT

  constructor(options = {}) {
    const defaults = {
      // This is your plugin's options. It will be accessible with this.options
      accessorName: '$yupFormValidation'
    };
    this.options = { ...defaults, ...options };
  }

  // Some instance methods that you can access from this.$yupFormValidation
  // world() {
  //   return 'world';
  // }

  static register = (Vue, options, store) => {
    console.log('Here is the options of the component', options);
    console.log('Here is the store of the app', store);
    // You can use `this.options` property to access options.

    // Delete this line if your plug-in doesn't provide any components
    Vue.component('VueYupForm', VueYupFormValidationForm);

    // Vue.directive('your-custom-directive', customDirective);

    // registerVuexStore(store, 'counterStore', {
    //   namespaced: true,
    //   state: { counter: 0 },
    //   getters: {
    //     counter: state => state.counter
    //   },
    //   actions: {
    //     increment: ({ commit }) => commit('increment')
    //   },
    //   mutations: {
    //     increment: state => state.counter++
    //   }
    // });
  };

  // Some lifecycle hooks to add on mixin
  static mixin = () => ({
    mounted() {}
  });

  initialized = false;

  init(Vue, store) {
    if (devMode() && !install.installed) {
      console.warn(
        `[vue-yup-form-validation] not installed. Make sure to call \`Vue.use(VueYupFormValidation)\` before init root instance.`
      );
    }

    if (this.initialized) {
      return;
    }

    VueYupFormValidation.register(Vue, this.options, store);
    this.initialized = true;
  }
}

export function install(Vue) {
  const isDev = devMode();
  if (install.installed && Vue) {
    if (isDev) {
      console.warn(
        '[vue-yup-form-validation] already installed. Vue.use(VueYupFormValidation) should be called only once.'
      );
    }
    return;
  }

  Vue.mixin({
    /**
     * VueYupFormValidation init hook, injected into each instances init hooks list.
     */
    beforeCreate() {
      let instance = new VueYupFormValidation()
      instance.init(Vue)

      if (instance) {
        // Store helper for internal use
        this.__$VueYupFormValidationInstance = instance;
        this[instance.options.accessorName] = instance;
      }
    },

    ...VueYupFormValidation.mixin()
  });

  install.installed = true;
  if (isDev) {
    console.info('[vue-yup-form-validation] is plugged in.');
  }
}

VueYupFormValidation.install = install;
