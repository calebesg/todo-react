import React from 'react';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FiCircle, FiCheckCircle } from 'react-icons/fi';

import './styles.css';

interface Todo {
  todo: {
    title: string,
    checked: boolean,
    posted: number
  },
  handleClickTodo: (id: number) => void
};

const Todo: React.FC<Todo> = ({ todo, handleClickTodo }) => {

  function handleClick() {
    handleClickTodo(todo.posted);
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
      <span>
        {formatDistance(new Date(todo.posted), new Date(), { locale: ptBR })}
      </span>
    </button>
  );
}

export default Todo;
