var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component, PropTypes } from 'react';
import { bemModifierClassName, bemElement } from './util.js';

export default class Input extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      isValid: true,
      errorMessage: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const {
      _triggerFormValidation,
      _refsToFormData,
      validate
    } = this.props;

    const value = e.target.value;

    this.setState({
      value
    }, () => {
      const formData = _refsToFormData();
      if (!validate) return;
      const errorMessage = validate(value, formData);

      // TODO: make validate return something more obvious
      if (errorMessage === true) {
        this.setState({
          isValid: true
        }, _triggerFormValidation);
      } else {
        this.setState({
          isValid: false,
          errorMessage
        }, _triggerFormValidation);
      }
    });
  }

  render() {
    const {
      children,
      className,
      errorModClassName,
      errorTextClassName,
      placeholder,
      type,
      validate,
      ...otherProps } = this.props;

    const {
      isValid,
      errorMessage
    } = this.state;

    return React.createElement(
      'div',
      _extends({
        className: bemModifierClassName(className, errorModClassName, !isValid)
      }, otherProps),
      children,
      React.createElement('input', {
        type: type,
        placeholder: placeholder,
        onChange: this.onChange
      }),
      (() => {
        if (!isValid && errorMessage) {
          return React.createElement(
            'div',
            {
              className: bemElement(className, errorTextClassName) },
            errorMessage
          );
        }
      })()
    );
  }
}

Input.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  errorModClassName: PropTypes.string,
  errorTextClassName: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  validate: PropTypes.func
};

Input.defaultProps = {
  errorModClassName: 'invalid',
  errorTextClassName: 'error'
};