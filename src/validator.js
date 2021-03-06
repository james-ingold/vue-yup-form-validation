import { parseFormData, validate } from './validationHelper';

export default class FormValidator {
  static createMixin() {
    return {
      computed: {
        formElement() {
          if (this.$el.nodeName && this.$el.nodeName === 'FORM') {
            return this.$el;
          }
          return this.$el.querySelector('form');
        },
      },
      methods: {
        onSubmit(event) {
          event.preventDefault()
          const res = this.validateForm();
          if (res) {
            this.onSubmitValid();
          }
        },
        onSubmitValid() {
          throw new Error('Please implement this method for your form!');
        },
        validateForm() {
          const res = validate(parseFormData(this.formElement), this.validationSchema);
          this.errors = res.errors || {};
          return !res.errors;
        },
        validateField(name) {
          const res = validate(parseFormData(this.formElement), this.validationSchema);
          const fieldError = res.errors ? res.errors[name] : null;
          this.$nextTick(() => {
            this.errors = {
              ...this.errors,
              [name]: fieldError
            };
          });
          this.$emit('fieldError', { name, error: fieldError });
        },
        setData(formData) {
          applyFormData(this.formElement, formData);
        },
      },
      mounted() {
        this.formElement.onsubmit = this.onSubmit.bind(this);
        const handler = event => {
          const { name, type } = event.target;
          if (name && !["checkbox", "radio"].includes(type)) {
            this.validateField(name);
          }
        };
        [].forEach.call(this.$el.elements, e => {
          e.addEventListener("input", handler);
          e.addEventListener("blur", handler);
        });
        this.unlisten = () => {
          [].forEach.call(this.$el.elements, e => {
            e.addEventListener("input", handler);
            e.addEventListener("blur", handler);
          });
        }
      },
      beforeDestroy() {
        return this.unlisten && this.unlisten();
      },
      data: () => {
        return {
          errors: {},
        };
      },
    };
  }
}
