import React from 'react';
import Button from '@material-ui/core/Button';
import './Modal.css';

export class ModalCancel extends React.Component {


  render() {
    const { modal, confirmation} = this.props
  
    return (
      <div className={(modal) ? '' : 'modal'}>
        <div className='modal__content' hidden={modal}>
        <p hidden={modal} className="container__child">cancel changes</p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => (
                confirmation(true)
              )}
            >
              Yes
            </Button>
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