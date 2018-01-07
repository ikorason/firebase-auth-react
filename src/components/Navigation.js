import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { media } from '../constants/media_templates'

import SignOutButton from './SignOut'
import * as routes from '../constants/routes'

const Navigation = (props, { authUser }) => (
  <Fragment>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</Fragment>
)

Navigation.contextTypes = {
  authUser: PropTypes.object
}

const NavigationAuth = () => (
  <Wrapper>
    <ul>
      <li>
        <NavLink to={routes.LANDING} exact activeClassName="is-active">
          Landing
        </NavLink>
      </li>
      <li>
        <NavLink to={routes.HOME} activeClassName="is-active">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={routes.ACCOUNT} activeClassName="is-active">
          Account
        </NavLink>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </Wrapper>
)

const NavigationNonAuth = () => (
  <Wrapper>
    <ul>
      <li>
        <NavLink to={routes.LANDING} exact activeClassName="is-active">
          Landing
        </NavLink>
      </li>
      <li>
        <NavLink to={routes.SIGN_IN} activeClassName="is-active">
          Sign In
        </NavLink>
      </li>
    </ul>
  </Wrapper>
)

export default Navigation

const Wrapper = styled.div`
  position: relative;
  max-width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 2em;
  z-index: 999;
  ${media.laptop`
    padding: 4em;
  `};
  ul {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0;
    padding: 0;
    ${media.laptop`
      width: 50%;
    `};
    li {
      list-style: none;
      margin: 0;
      padding: 0;
      a {
        font-size: 1.5em;
        color: #fff;
        text-decoration: none;
        cursor: pointer;
        ${media.laptop`
          font-size: 1.7em;
        `};
        &.is-active {
          &::after {
            content: '';
            display: block;
            width: 40%;
            height: 2px;
            background-color: #fff;
          }
        }
      }
    }
  }
`
