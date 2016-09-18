import React from 'react'
import ReactDOM from 'react-dom'

class Draggable extends React.Component {

  state = {
    isDragging: false
  }

  draggingNode = null

  componentDidMount() {
    let parentNode = this.getParentNode()
    parentNode.addEventListener("mouseenter", this.onMouseEnter)
    parentNode.addEventListener("mousemove", this.onMouseMove)
    parentNode.addEventListener("mouseup", this.onMouseUp)
    parentNode.addEventListener("mouseup", this.onMouseLeave)
    this.draggingNode = ReactDOM.findDOMNode(this)
  }

  componentWillUnmount() {
    let parentNode = this.getParentNode()
    parentNode.removeEventListener("mouseenter", this.onMouseEnter)
    parentNode.removeEventListener("mousemove", this.onMouseMove)
    parentNode.removeEventListener("mouseup", this.onMouseUp)
    parentNode.removeEventListener("mouseup", this.onMouseLeave)
  }

  getParentNode() {
    return this.props.parentNode || ReactDOM.findDOMNode(this).parentNode
  }

  // dragging 중 창 밖으로 나간 경우, 다시 들어올 때 dragging을 취소시키기 위한 로직
  onMouseEnter = (e) => {
    if (e.fromElement == null || !this.getParentNode().contains(e.fromElement)) {
      this.setState({isDragging: false})
    }
  }

  // mouseDown 이벤트는 render에서 직접 달아주어야 함
  onMouseDown = (e) => {
    this.setState({isDragging: true})
    this.setPosition(e)
  }

  onMouseMove = (e) => {
    if (!this.state.isDragging) {
      return
    }
    this.setPosition(e)
  }

  onMouseUp = (e) => {
    this.setState({isDragging: false})
  }

  onMouseLeave = (e) => {
    this.setState({isDragging: false})
  }

  setPosition(e) {
    console.log("You have to override this function!")
    return false
  }
}

export default Draggable