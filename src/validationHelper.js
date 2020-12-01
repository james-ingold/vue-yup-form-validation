import * as yup from 'yup';
import _ from 'lodash'

export const createFieldWatchers = (model, modelName = 'form') => {
  const res = {};
  _.forOwn(model, (field, key) => {
    const watcherKey = `${modelName}.${key}`;
      res[watcherKey] = function watcher(newValue, oldValue) {
        if (!oldValue) return
        this.validateField(key);
      };
    })
  return res
};


export const parseFormData = form => {
  if (!form || form.nodeName !== 'FORM') {
    return;
  }
  const q = _.compact(_.map(form.elements, el => {
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
            const j = _.compact(_.map(el.options, opt => {
              if (opt.selected) return [el.name, opt.value]
            }))
            return j
        }
        break;
    }
  }))
  const res = {};
  for (const [key, val] of q) {
    if (res[key] === undefined) {
      res[key] = val;
    } else if (_.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key]];
      res[key].push(val);
    }
  }
  return res;
};

export const validate = (formData, formSchema) => {
  _.forOwn(formSchema, (e, name) => {
    if(!e._label) {
      e._label = _.capitalize(name)
    }
  });

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
