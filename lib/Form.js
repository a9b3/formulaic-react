'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Input = require('./Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _util = require('./util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Form extends _react.Component {
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
      if (child.type === _Input2.default) {
        return (0, _react.cloneElement)(child, {
          key: child.key,
          ref: child.key,
          _triggerFormValidation: this._triggerFormValidation,
          _refsToFormData: this._refsToFormData
        });
      }
      return child;
    });

    return _react2.default.createElement(
      'form',
      _extends({
        className: (0, _util.bemModifierClassName)(className, errorClassName, !isValid),
        onSubmit: this.onSubmit
      }, otherProps),
      clonedChildren
    );
  }
}

exports.default = Form;
Form.propTypes = {
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  errorClassName: _react.PropTypes.string,
  onInvalid: _react.PropTypes.func,
  onSubmit: _react.PropTypes.func,
  onValid: _react.PropTypes.func
};

Form.defaultProps = {
  errorClassName: 'invalid',
  onInvalid() {},
  onSubmit() {},
  onValid() {}
};