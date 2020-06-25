import React from 'react';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FiCircle, FiCheckCircle } from 'react-icons/fi';

import './styles.css';

interface Todo {
  todo: {
    id: number,
    title: string,
    checked: boolean,
    posted: Date
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
      <span>{formatDistance(todo.posted, new Date(), { locale: ptBR })}</span>
    </button>
  );
}

export default Todo;
