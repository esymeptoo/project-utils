import React from 'react'
import { render } from 'react-dom'
import configureComponent from '@/utils/configureComponent'

configureComponent()

render(
  <div>你好</div>,
  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept()
}
