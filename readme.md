# formulaic-react

React form validation

## Install

`npm install --save formulaic-react`

## Example

A simple login form.

```javascript
import React, { Component } from 'react'
import Formulaic from 'formulaic-react'

class SignupContainer extends Component {
  constructor() {
    super()
    this.state = {
      canSubmit: false,
    }
    this.onValid = this.onValid.bind(this)
    this.onInvalid = this.onInvalid.bind(this)
  }

  onValid() {
    this.setState({
      canSubmit: true,
    })
  }

  onInvalid() {
    this.setState({
      canSubmit: false,
    })
  }

  onSubmit(formData) {
    // do something with the formData
  }

  render() {
    const {
      canSubmit,
    } = this.state

    return <div className="signup">
      <Formulaic.Form
        className="form"
        onValid={this.onValid}
        onInvalid={this.onInvalid}
        onSubmit={this.onSubmit}
        >

        <Formulaic.Input
          className="form__input"
          key="email"
          placeholder="Email"
          validate={Formulaic.validators.email}
        />

        <Formulaic.Input
          className="form__input"
          key="password"
          placeholder="Password"
          validate={Formulaic.validators.password}
        />

        <Formulaic.Input
          className="form__input"
          key="confirmPassword"
          placeholder="Confirm Password"
          validate={Formulaic.validators.confirmPassword}
        />

        <button disabled={ !canSubmit }>
          Submit
        </button>

      </Formulaic.Form>
    </div>
  }
}
```

You can style it using these class names.

```css
.form {
  &--invalid {

  }

  &__input {
    &--invalid {

    }

    &__error {

    }
  }

  &__submit {

  }
}
```
