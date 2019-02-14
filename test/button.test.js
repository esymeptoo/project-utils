import React from 'react'
import Enzyme from './index'
import Button from '../src/components/Button/Button'

const { shallow } = Enzyme

it('按钮的text', () => {
  const app = shallow(<Button text="你好" />)
  expect(app.find('button').text()).toBe('你好')
})
