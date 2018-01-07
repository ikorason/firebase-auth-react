import React, { Fragment, Component } from 'react'
import styled from 'styled-components'

import withAuthorization from './withAuthorization'
import { db } from '../firebase'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: null
    }
  }

  componentDidMount() {
    db
      .onceGetUsers()
      .then(snapshot => this.setState(() => ({ users: snapshot.val() })))
  }

  render() {
    const { users } = this.state
    console.log(users)
    return (
      <Wrapper>
        <div className="container">
          <h1>Home Page</h1>
          <p>The Home Page is accessible by every signed in user.</p>
          {!!users && <UserList users={users} />}
        </div>
      </Wrapper>
    )
  }
}

const UserList = ({ users }) => (
  <Fragment>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>
    {Object.keys(users).map(key => <div key={key}>{users[key].username}</div>)}
  </Fragment>
)

const authCondition = authUser => !!authUser

export default withAuthorization(authCondition)(HomePage)

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
