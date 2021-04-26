import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Modal } from '../modal/Modal';
import { ModalCancel } from '../modal/ModalCancel';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import './EditTodo.css';


export class EditTodo extends React.Component {
  state = {
    name: this.props.todo.name,
    id: this.props.todo.id,
    nameSave: this.props.todo.name,
    modal: true,
    modalEdd: true,
    modalCancel: true,
  }

  editTodo = () => {
    this.setState(prev => ({
      modal: !prev.modal,
    }))
  }

  changesEditTodo = () => {
    this.setState(prev => ({
      modal: !prev.modal,
    }))
  }

  confirmation = (decision) => {
    const { name, id } = this.state;
    const { changeTodoName } = this.props;

    this.setState(prev =>({
      modal: !prev.modal
    }))

    if (decision) {
      changeTodoName(name, id)
    }

  }

  confirmationCancel = () => {
    this.setState(prev =>({
      modalCancel: !prev.modalCancel
    }))
  }

  confirmationCancelDecision = (decision) => {
  
    this.setState(prev =>({
      modalCancel: !prev.modalCancel
    }))

    if(decision) {
      this.setState({
        name: this.state.nameSave,
      })
    }
  }

  render() {
    const { name, modal, modalEdd, modalCancel } = this.state;

    return (
      <div>
        <div className='container__child'>New Todo: - {name}</div>
        <div className='container'>
          <Tooltip title="save changes">
              <IconButton onClick={this.editTodo}>
                <SaveIcon />
            </IconButton>
          </Tooltip>
          <TextField
            id="outlined-basic"
            label="Enter New Todo"
            variant="outlined"
            placeholder='enter new todo'
            value={name}
            onChange={(event) => {
              this.setState({
               name: event.target.value,
               })
            }} 
          />
          <Tooltip title="delete changes">
            <IconButton 
                aria-label="delete" 
                onClick={this.confirmationCancel}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          </div>
        <Modal modal={modal} confirmation={this.confirmation} modalEdd={modalEdd}/>
        <ModalCancel modal={modalCancel} confirmation={this.confirmationCancelDecision}/>
      </div>

    )
  }
}
