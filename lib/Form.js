'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Input = require('./Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _util = require('./util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form() {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this));

    _this.state = {
      isValid: true
    };
    _this._refsToFormData = _this._refsToFormData.bind(_this);
    _this._triggerFormValidation = _this._triggerFormValidation.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    return _this;
  }

  _createClass(Form, [{
    key: '_refsToFormData',
    value: function _refsToFormData() {
      var _this2 = this;

      return Object.keys(this.refs).reduce(function (obj, key) {
        var component = _this2.refs[key];
        obj[key] = component.state.value;
        return obj;
      }, {});
    }
  }, {
    key: '_triggerFormValidation',
    value: function _triggerFormValidation() {
      var _this3 = this;

      // go through each input and determine the entire form's valid state
      var isValid = Object.keys(this.refs).every(function (key) {
        return _this3.refs[key].state.isValid;
      });

      this.setState({
        isValid: isValid
      }, function () {
        if (isValid) {
          _this3.props.onValid();
        } else {
          _this3.props.onInvalid();
        }
      });
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(e) {
      e.preventDefault();

      var formData = this._refsToFormData();
      this.props.onSubmit(formData);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var errorClassName = _props.errorClassName;
      var onInvalid = _props.onInvalid;
      var onSubmit = _props.onSubmit;
      var onValid = _props.onValid;

      var otherProps = _objectWithoutProperties(_props, ['children', 'className', 'errorClassName', 'onInvalid', 'onSubmit', 'onValid']);

      var isValid = this.state.isValid;


      var clonedChildren = children.map(function (child) {
        if (child.type === _Input2.default) {
          return (0, _react.cloneElement)(child, {
            key: child.key,
            ref: child.key,
            _triggerFormValidation: _this4._triggerFormValidation,
            _refsToFormData: _this4._refsToFormData
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
  }]);

  return Form;
}(_react.Component);

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
  onInvalid: function onInvalid() {},
  onSubmit: function onSubmit() {},
  onValid: function onValid() {}
};