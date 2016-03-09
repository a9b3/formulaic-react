'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('./util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input() {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Input).call(this));

    _this.state = {
      value: '',
      isValid: true,
      errorMessage: ''
    };
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Input, [{
    key: 'onChange',
    value: function onChange(e) {
      var _this2 = this;

      var _props = this.props;
      var _triggerFormValidation = _props._triggerFormValidation;
      var _refsToFormData = _props._refsToFormData;
      var validate = _props.validate;


      var value = e.target.value;

      this.setState({
        value: value
      }, function () {
        var formData = _refsToFormData();
        if (!validate) return;
        var errorMessage = validate(value, formData);

        // TODO: make validate return something more obvious
        if (errorMessage === true) {
          _this2.setState({
            isValid: true
          }, _triggerFormValidation);
        } else {
          _this2.setState({
            isValid: false,
            errorMessage: errorMessage
          }, _triggerFormValidation);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var children = _props2.children;
      var className = _props2.className;
      var errorModClassName = _props2.errorModClassName;
      var errorTextClassName = _props2.errorTextClassName;
      var placeholder = _props2.placeholder;
      var type = _props2.type;
      var validate = _props2.validate;

      var otherProps = _objectWithoutProperties(_props2, ['children', 'className', 'errorModClassName', 'errorTextClassName', 'placeholder', 'type', 'validate']);

      var _state = this.state;
      var isValid = _state.isValid;
      var errorMessage = _state.errorMessage;


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
        function () {
          if (!isValid && errorMessage) {
            return _react2.default.createElement(
              'div',
              {
                className: (0, _util.bemElement)(className, errorTextClassName) },
              errorMessage
            );
          }
        }()
      );
    }
  }]);

  return Input;
}(_react.Component);

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