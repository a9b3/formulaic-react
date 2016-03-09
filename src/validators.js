// return true if valid
// return string|false if invalid
export default {
  email(value) {
    if (value.length === 0) return true
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(value)) {
      return 'Must be a valid email.'
    } else {
      return true
    }
  },
  password(value) {
    if (value.length < 6) {
      return 'Password should be more than 6 characters.'
    } else {
      return true
    }
  },
  confirmPassword(value, formData) {
    if (value !== formData.password) {
      return 'Confirm password must match password.'
    } else {
      return true
    }
  },
}
