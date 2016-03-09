import React, { Component, PropTypes } from 'react'
import { bemModifierClassName, bemElement } from './util.js'

export default class Input extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      isValid: true,
      errorMessage: '',
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const {
      _triggerFormValidation,
      _refsToFormData,
      validate,
    } = this.props

    const value = e.target.value

    this.setState({
      value,
    }, () => {
      const formData = _refsToFormData()
      if (!validate) return
      const errorMessage = validate(value, formData)

      // TODO: make validate return something more obvious
      if (errorMessage === true) {
        this.setState({
          isValid: true,
        }, _triggerFormValidation)
      } else {
        this.setState({
          isValid: false,
          errorMessage,
        }, _triggerFormValidation)
      }
    })
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
      ...otherProps,
    } = this.props

    const {
      isValid,
      errorMessage,
    } = this.state

    return <div
      className={bemModifierClassName(className, errorModClassName, !isValid)}
      {...otherProps}
      >

      {children}

      <input
        type={type}
        placeholder={placeholder}
        onChange={this.onChange}
      />

      {(() => {
        if (!isValid && errorMessage) {
          return <div
            className={bemElement(className, errorTextClassName)}>
            {errorMessage}
          </div>
        }
      })()}
    </div>
  }
}

Input.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  errorModClassName: PropTypes.string,
  errorTextClassName: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  validate: PropTypes.func,
}

Input.defaultProps = {
  errorModClassName: 'invalid',
  errorTextClassName: 'error',
}
