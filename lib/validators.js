'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// return true if valid
// return string|false if invalid
exports.default = {
  email: function email(value) {
    if (value.length === 0) return true;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(value)) {
      return 'Must be a valid email.';
    } else {
      return true;
    }
  },
  password: function password(value) {
    if (value.length < 6) {
      return 'Password should be more than 6 characters.';
    } else {
      return true;
    }
  },
  confirmPassword: function confirmPassword(value, formData) {
    if (value !== formData.password) {
      return 'Confirm password must match password.';
    } else {
      return true;
    }
  }
};