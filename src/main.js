import React from 'react'
import { render } from 'react-dom'
import configureComponent from '@/utils/configureComponent'
import App from '@/containers/App/App'

configureComponent()

render(
  <App />,
  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept()
}
