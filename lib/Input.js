'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('./util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Input extends _react.Component {
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

    return _react2.default.createElement(
      'div',
      _extends({
        className: (0, _util.bemModifierClassName)(className, errorModClassName, !isValid)
      }, otherProps),
      children,
      _react2.default.createElement('input', {
        type: type,
        placeholder: placeholder,
        onChange: this.onChange
      }),
      (() => {
        if (!isValid && errorMessage) {
          return _react2.default.createElement(
            'div',
            {
              className: (0, _util.bemElement)(className, errorTextClassName) },
            errorMessage
          );
        }
      })()
    );
  }
}

exports.default = Input;
Input.propTypes = {
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  errorModClassName: _react.PropTypes.string,
  errorTextClassName: _react.PropTypes.string,
  placeholder: _react.PropTypes.string,
  type: _react.PropTypes.string,
  validate: _react.PropTypes.func
};

Input.defaultProps = {
  errorModClassName: 'invalid',
  errorTextClassName: 'error'
};