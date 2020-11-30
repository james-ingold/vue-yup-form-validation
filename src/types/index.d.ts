import Vue, { PluginFunction } from 'vue';
// import { Store } from 'vuex';

export class VueYupFormValidation {
  constructor(options?: VueYupFormValidationOptions);

  static install(): PluginFunction<any>;
  // static init(Vue: Vue, store: Store<any>): void;
  static init(Vue: Vue, store: any): void;

  // Your instance methods
  world(): string;
}

export interface VueYupFormValidationOptions extends Object {
  accessorName?: string
}

declare module 'vue/types/vue' {
  interface Vue {
    $yupFormValidation: VueYupFormValidation;
    __$VueYupFormValidationInstance: VueYupFormValidation;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    yupFormValidationSettings?: VueYupFormValidationOptions | VueYupFormValidation
  }
}
