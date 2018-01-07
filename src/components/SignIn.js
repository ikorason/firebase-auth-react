import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { SignUpLink } from './SignUp'
import { PasswordForgetLink } from './PasswordForget'
import { auth } from '../firebase'
import * as routes from '../constants/routes'

const SignInPage = ({ history }) => (
  <Wrapper>
    <div className="container">
      <h1>Sign In</h1>
      <SignInForm history={history} />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  </Wrapper>
)

const byPropKey = (propName, value) => () => ({
  [propName]: value
})

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = e => {
    const { email, password } = this.state
    const { history } = this.props
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
        history.push(routes.HOME)
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })
    e.preventDefault()
  }

  render() {
    const { email, password, error } = this.state

    const isInvalid = password === '' || email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={e => this.setState(byPropKey('email', e.target.value))}
          type="text"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={e => this.setState(byPropKey('password', e.target.value))}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default withRouter(SignInPage)

export { SignInForm }

const Wrapper = styled.div.attrs({
  className: 'container'
})`
  position: relative;
  margin-top: 5em;
  form {
    display: flex;
    flex-direction: column;
    input {
      color: #000;
    }
  }
`
