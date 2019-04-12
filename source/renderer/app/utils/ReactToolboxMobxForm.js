// @flow
import MobxReactForm from 'mobx-react-form';

export default class ReactToolboxMobxForm extends MobxReactForm {
  bindings() {
    return {
      ReactToolbox: {
        id: 'id',
        name: 'name',
        type: 'type',
        value: 'value',
        label: 'label',
        placeholder: 'hint',
        disabled: 'disabled',
        error: 'error',
        onChange: 'onChange',
        onFocus: 'onFocus',
        onBlur: 'onBlur',
      },
    };
  }
}

export const handleFormErrors = () => {
  const firstErrorLabel = document.querySelector('.SimpleFormField_error');
  if (firstErrorLabel) firstErrorLabel.scrollIntoView({ behavior: 'smooth' });
};
