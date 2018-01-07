import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './normalize.css'
import './skeleton.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 1em;
    font-weight: 300;
    color: #fff;
    background-color: #32936F;
  }
`

ReactDOM.render(
  <Router basename="/firebase-auth-react">
    <App />
  </Router>,
  document.getElementById('root'),
)
registerServiceWorker()
