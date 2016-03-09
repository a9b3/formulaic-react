var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component, PropTypes, cloneElement } from 'react';
import Input from './Input.js';
import { bemModifierClassName } from './util.js';

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      isValid: true
    };
    this._refsToFormData = this._refsToFormData.bind(this);
    this._triggerFormValidation = this._triggerFormValidation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  _refsToFormData() {
    return Object.keys(this.refs).reduce((obj, key) => {
      const component = this.refs[key];
      obj[key] = component.state.value;
      return obj;
    }, {});
  }

  _triggerFormValidation() {
    // go through each input and determine the entire form's valid state
    const isValid = Object.keys(this.refs).every(key => this.refs[key].state.isValid);

    this.setState({
      isValid
    }, () => {
      if (isValid) {
        this.props.onValid();
      } else {
        this.props.onInvalid();
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const formData = this._refsToFormData();
    this.props.onSubmit(formData);
  }

  render() {
    const {
      children,
      className,
      errorClassName,
      onInvalid,
      onSubmit,
      onValid,
      ...otherProps } = this.props;

    const {
      isValid
    } = this.state;

    const clonedChildren = children.map(child => {
      if (child.type === Input) {
        return cloneElement(child, {
          key: child.key,
          ref: child.key,
          _triggerFormValidation: this._triggerFormValidation,
          _refsToFormData: this._refsToFormData
        });
      }
      return child;
    });

    return React.createElement(
      'form',
      _extends({
        className: bemModifierClassName(className, errorClassName, !isValid),
        onSubmit: this.onSubmit
      }, otherProps),
      clonedChildren
    );
  }
}

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  errorClassName: PropTypes.string,
  onInvalid: PropTypes.func,
  onSubmit: PropTypes.func,
  onValid: PropTypes.func
};

Form.defaultProps = {
  errorClassName: 'invalid',
  onInvalid() {},
  onSubmit() {},
  onValid() {}
};