import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { auth, db } from '../firebase'
import * as routes from '../constants/routes'

const SignUpPage = ({ history }) => (
  <Wrapper>
    <h1>Sign Up</h1>
    <SignUpForm history={history} />
  </Wrapper>
)

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

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

const byPropKey = (propName, value) => ({
  [propName]: value
})

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = e => {
    const { username, email, passwordOne } = this.state
    const { history } = this.props

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        db
          .doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }))
            history.push(routes.HOME)
          })
          .catch(error => {
            this.setState(byPropKey('error', error))
          })
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    e.preventDefault()
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state

    const isInValid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''

    return (
      <Wrapper>
        <form onSubmit={this.onSubmit}>
          <input
            value={username}
            onChange={e => this.setState(byPropKey('username', e.target.value))}
            type="text"
            placeholder="full name"
          />
          <input
            value={email}
            onChange={e => this.setState(byPropKey('email', e.target.value))}
            type="text"
            placeholder="Email"
          />
          <input
            value={passwordOne}
            onChange={e =>
              this.setState(byPropKey('passwordOne', e.target.value))
            }
            type="password"
            placeholder="Password"
          />
          <input
            value={passwordTwo}
            onChange={e =>
              this.setState(byPropKey('passwordTwo', e.target.value))
            }
            type="password"
            placeholder="Confirm Password"
          />
          <button type="submit" disabled={isInValid}>
            Sign Up
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </Wrapper>
    )
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
)

export default withRouter(SignUpPage)

export { SignUpForm, SignUpLink }
