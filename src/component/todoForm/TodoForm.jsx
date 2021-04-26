import React from 'react';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import IconButton from '@material-ui/core/IconButton';
import './todoForm.css';

export class TodoForm extends React.Component {
  state = {
    newTodo: '',
  }

  hendTodo = (event) => {
    this.setState({
      newTodo: event.target.value,
    })
  }

  addNewTodo = (e) => {
    e.preventDefault()
    const { newTodo } = this.state
    const { addTodo } = this.props

    addTodo(newTodo)

    this.setState({
      newTodo: '',
    })
  }

  render() {
    const { newTodo } = this.state;

    return (
      <>
       <form onSubmit={this.addNewTodo} className="form">
         <input
          value={newTodo}
          placeholder='write here'
          onChange={this.hendTodo}
          className="input"
        />
        <div className="buttonInput">
          <IconButton type='submit'>
            <NoteAddOutlinedIcon />
            add todo
          </IconButton>
        </div>
       </form>
      </>
    )
  }
}