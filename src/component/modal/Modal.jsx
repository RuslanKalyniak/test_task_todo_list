import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './Modal.css';

export class Modal extends React.Component {


  render() {
    const { modal, confirmation, modalEdd, modalMain } = this.props
  
    return (
      <div className={(modal) ? '' : 'modal'}>
        <div className='modal__content' hidden={modal}>
        <p className="container__child" hidden={modal}>{(modalEdd) ? 'save changes' : (modalMain) ? 'delete todo' : ''}</p>
            <Link to='/listTodos' >
              <Button
                className="ml-5"
                variant="contained"
                color="primary"
                onClick={() => (
                  confirmation(true)
                )}>
                Yes
              </Button>
            </Link>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => (
                confirmation(false)
              )}>
              No
            </Button>
        </div>
      </div>
    )
  }
}