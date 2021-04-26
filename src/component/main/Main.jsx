import React from 'react';
import { TodoForm } from '../todoForm';
import { Route, Link } from 'react-router-dom';
import { EditTodo } from '../editTodo';
import { Modal } from '../modal/Modal';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import './Main.css';

const todoList = [
  {id: 1, name: 'test1'},
  {id: 2, name: 'test2'},
  {id: 3, name: 'test3'},
]


export class Main extends React.Component {
  state = {
    todos: [
      ...todoList
    ],
    modal: true,
    targetId: '',
    modalMain: true,
    todosN: [],

  }

  addTodo = (value) => {

    if(value) {
      this.setState(prev => ({
        todos: [
          ...prev.todos,
          {
            id: Math.floor(Math.random() * 100),
            name: value,
          }
        ]
      }))

      localStorage.setItem('id', JSON.stringify(this.state.todos))
    }

    return;
  }

  deleteTodos = (id) => {
  
    this.setState({
      targetId: id,
    })

    this.setState(prev =>({
      modal: !prev.modal
    }))

    localStorage.setItem('id', JSON.stringify(this.state.todos))
  }

  confirmation = (decision) => {
    const { targetId } = this.state;

    this.setState(prev =>({
      modal: !prev.modal
    }))

    if (decision) {
      this.setState(prev =>({
        todos: prev.todos.filter(todo => todo.id !== +targetId)
      }))
    }
  
  }

  changeTodoName = (name, id) => {
    
    this.setState(prev =>({
      todos: prev.todos.map(todo => {
        if (todo.id === id) {
          todo.name = name
        }

        return todo
      })
    }))

    localStorage.setItem('id', JSON.stringify(this.state.todos))
  }

  componentDidMount() {
      this.setState({
        todos: (JSON.parse(localStorage.getItem('id')) ? JSON.parse(localStorage.getItem('id')) : todoList)
      })
  }

  render() {
    const { todos, modal, modalMain } = this.state;

 
    return (
      <div className='main'>      
        <Route>
          <Link to='/listTodos' className='container__child'>
            <h1>TODO - List</h1>
          </Link>
        </Route>
        <Route path='/listTodos'>
          <TodoForm addTodo={this.addTodo} />

          {
           (todos).map(todo => (
              <ListItem key={todo.id} dense button className='container'>
                <div className='container'>{todo.name}</div>
                <Tooltip title="Edit">
                  <IconButton>
                    <Link to={`/${todo.name}`}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton 
                    aria-label="delete" 
                    onClick={(event) => (
                      this.deleteTodos(todo.id)
                    )}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItem >
            ))
          }
        </Route>
        {
          todos.map(todo => (
            <Route path={`/${todo.name}`}>
              <div className='container__child'>Old Todo: - {todo.name}</div>
              <EditTodo todo={todo} changeTodoName={this.changeTodoName} />
            </Route>
          ))
        }
        <Modal modal={modal} confirmation={this.confirmation} modalMain={modalMain} />
      </div>
    )
  }
}