import * as yup from 'yup';

export const createFieldWatchers = (model, modelName = 'form') => {
  const res = {};
  for (var key in model) {
    const watcherKey = `${modelName}.${key}`;
      res[watcherKey] = function watcher(newValue, oldValue) {
        if (!oldValue) return
        this.validateField(key);
      };
    }
  return res
};


export const parseFormData = form => {
  if (!form || form.nodeName !== 'FORM') {
    return;
  }
  const q = [].map.call(form.elements, el => {
    if (el.name === '') return
    switch (el.nodeName) {
      case 'INPUT':
        switch (el.type) {
          case 'number':
            try {
              return [el.name, parseFloat(el.value)]
            } catch (err) {}
            break;
          case 'text':
          case 'TEXTAREA':
          case 'email':
          case 'hidden':
          case 'password':
          case 'button':
          case 'reset':
          case 'submit':
          case 'duration_format':
          case 'input_mask':
            return [el.name, el.value]
          case 'checkbox':
            if (el.checked) {
              let value = el.value;
              value = value === 'on' ? 1 : value === 'off' ? 0 : value;
              return [el.name, value]
            } else {
              return [el.name, 0]
            }
          case 'radio':
            if (el.checked) {
              return [el.name, el.value]
            }
            break;
          case 'file':
            const { files } = el;
            if (files && files[0]) {
              return [el.name, el.files[0]]
            }
            break;
        }
        break;
      case 'SELECT':
        switch (el.type) {
          case 'select-one':
            return [el.name, el.value];
          case 'select-multiple':
            const j = el.options.map(opt => {
              if (opt.selected) return [el.name, opt.value]
            }).filter(Boolean)
            return j
        }
        break;
    }
  }).filter(Boolean)
  const res = {};
  for (const [key, val] of q) {
    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key]];
      res[key].push(val);
    }
  }
  return res;
};

export const validate = (formData, formSchema) => {
  for (var prop in formSchema) {
    if(!formSchema[prop]._label) {
        formSchema[prop]._label = capitalize(name)
      }
  }

  formSchema = yup.object().shape(formSchema);
  const res = {
    errors: null,
    data: null,
  };
  try {
    formSchema.validateSync(formData, {
      abortEarly: false,
      stripUnknown: true,
    });
    res.data = formSchema.cast(formData);
  } catch (err) {
    if (err.inner) {
      res.errors = {};
      err.inner.map(e => {
        res.errors[e.path] = e.errors;
        return null;
      });
    } else {
      console.error(err);
    }
  }
  return res;
};

export const isValid = (formData, fromSchema) => {
  return !validate(formData, fromSchema).errors;
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
