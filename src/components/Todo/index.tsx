import React from 'react';
import { FiCircle, FiCheckCircle } from 'react-icons/fi';

import './styles.css';

interface Todo {
  todo: {
    id: number,
    title: string,
    checked: boolean,
    posted: string
  },
  handleClickTodo: (id: number) => void
};

const Todo: React.FC<Todo> = ({ todo, handleClickTodo }) => {

  function handleClick() {
    handleClickTodo(todo.id);
  }

  return (
    <button 
      onClick={handleClick} 
      className={todo.checked ? 'checked' : ''}
    >
      <div>
        {todo.checked ? <FiCheckCircle /> : <FiCircle />}
        <p>{todo.title}</p>
      </div>
      <span>{todo.posted}</span>
    </button>
  );
}

export default Todo;
