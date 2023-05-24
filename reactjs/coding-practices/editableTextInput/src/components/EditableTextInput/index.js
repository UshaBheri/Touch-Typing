import {Component} from 'react'

class EditableTextInput extends Component {
  state = {text: '', isEditable: false}

  getText = event => {
    this.setState({text: event.target.value})
  }

  onChangeText = () => {
    this.setState(prevState => ({
      isEditable: !prevState.isEditable,
    }))
  }

  render() {
    const {isEditable, text} = this.state
    return (
      <div className="main-container">
        <div className="card-container">
          <h1 className="heading">Editable Text Input</h1>
          <div className="container">
            {isEditable === true ? (
              <div className="content">
                <p className="text">{text}</p>
                <button
                  className="button"
                  type="button"
                  onClick={this.onChangeText}
                >
                  Edit
                </button>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  value={text}
                  onChange={this.getText}
                  className="input"
                />
                <button
                  className="button"
                  type="button"
                  onClick={this.onChangeText}
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default EditableTextInput
