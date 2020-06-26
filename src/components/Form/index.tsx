import React, { useState, FormEvent, ChangeEvent } from 'react';
import { FiPlus, FiCheck, FiX } from 'react-icons/fi';

import './styles.css';

interface TodoData {
  title: string,
  checked: boolean,
  posted: number
};

interface FormProps {
  saveTodo: (todo: TodoData) => void
};

const Form: React.FC<FormProps> = ({ saveTodo }) => {
  const [title, setTitle] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  function handleClickButtonAdd() {
    setVisible(!visible);

    setTitle('');
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const data = event.target.value;

    setTitle(data);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!title) return;

    const todo = {
      title,
      checked: false,
      posted: new Date().getTime()
    } as TodoData;

    saveTodo(todo);

    setTitle('');

    setVisible(false);    
  }

  return (
    <div className="form-add">

      <div className="line"></div>
      <button 
        className={visible ? 'close' : ''}
        onClick={handleClickButtonAdd}
      >
        {visible ? <FiX /> : <FiPlus />}
      </button>

      <form 
        onSubmit={handleSubmit}
        className={visible ? '' : 'hide'}
      >
        <input 
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="O que temos para hoje?"
        />
        <button type="submit">
          <FiCheck />
        </button>
      </form>
      
    </div>
  );
}

export default Form;
