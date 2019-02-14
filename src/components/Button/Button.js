import React from 'react'

export default class Button extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      buttonText: props.text,
    }
  }

  handleClick() {
    this.setState({
      buttonText: 'hello world',
    })
  }

  render() {
    return <button onClick={this.handleClick.bind(this)}>{this.state.buttonText}</button>
  }
}

Button.defaultProps = {
  text: '你好',
}
