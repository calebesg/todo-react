import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import './App.css';

import Form from './components/Form';
import Todo from './components/Todo';

interface TodoData {
  id: number,
  title: string,
  checked: boolean,
  posted: string
};

interface DateBR {
  day: {
    week: string,
    month: number
  },
  month: string
}

function App() {
  const [todos, setTodos] = useState<TodoData[]>([]);
  //const [date, setDate] = useState<DateBR>({} as DateBR);

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const data = [
      { id: 1, title: 'Ir ao super mercado', checked: true, posted: '7:00 AM' },
      { id: 2, title: 'Levar as criaçãs para almoçar', checked: false, posted: '12:00 AM' },
      { id: 3, title: 'Ir embora do serviço', checked: true, posted: '18:40 PM' },
      { id: 4, title: 'Hora do rango', checked: true, posted: '20:10 PM' },
      { id: 5, title: 'Hora do rango', checked: false, posted: '20:10 PM' },
      { id: 6, title: 'Hora do rango', checked: true, posted: '20:10 PM' },
    ];

    setTodos(data);
    setTotal(data.length);
  }, []);

  useEffect(() => {
    const date = format(new Date(), 'MMMM-ddd', {locale: ptBR});

    console.log(date);
  }, []);

  function handleClickTodo(id: number) {
    const currentTodo = todos.find(item => item.id === id);

    if (!currentTodo) return;

    const filteredItems = todos.map(todo => {
      
      if (todo.id === id) {
        todo.checked = !todo.checked;
      }

      return todo;
    });

    setTodos(filteredItems);
  }

  return (
    <div id="page-home">
      <div className="page-home-content">

        <header>
          <div className="header-top">
            <h1>Terça, <span>th</span></h1>
            <p><span>{total}</span> Tasks</p>
          </div>

          <p>December</p>
        </header>

        <Form />
        
        <main>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                <Todo todo={todo} handleClickTodo={handleClickTodo} />
              </li>
            ))}
          </ul>
        </main>

      </div>
    </div>
  );
}

export default App;
