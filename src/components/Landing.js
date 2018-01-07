import React from 'react'
import styled from 'styled-components'
import { media } from '../constants/media_templates'

const LandingPage = () => (
  <Wrapper>
    <div className="container">
      <h1>Firebase Authentication</h1>
    </div>
  </Wrapper>
)

export default LandingPage

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    h1 {
      font-size: 4em;
      margin: 0;
      ${media.laptop`
        font-size: 5em;
      `};
    }
  }
`
