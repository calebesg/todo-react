import React, { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './App.css';

import captalizeString from './utils/captalizeString';

import Form from './components/Form';
import Todo from './components/Todo';

interface TodoData {
  id: number,
  title: string,
  checked: boolean,
  posted: Date
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
  const [date, setDate] = useState<DateBR>();

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const data = [
      { id: 1, title: 'Ir ao super mercado', checked: true, posted: new Date() },
      { id: 2, title: 'Levar as criaçãs para almoçar', checked: false, posted: subDays(new Date(), 3) },
      { id: 3, title: 'Ir embora do serviço', checked: true, posted: subDays(new Date(), 7) },
      { id: 4, title: 'Hora do rango', checked: true, posted: subDays(new Date(), 10) },
      { id: 5, title: 'Hora do rango', checked: false, posted: subDays(new Date(), 1) },
      { id: 6, title: 'Hora do rango', checked: true, posted: subDays(new Date(), 100) },
    ];

    setTodos(data);
    setTotal(data.length);
  }, []);

  useEffect(() => {
    const dateNow = format(new Date(), 'EEEE-dd-MMMM', { locale: ptBR });

    const date = dateNow.split('-');

    setDate({
      day: {
        week: captalizeString(date[0]),
        month: Number(date[1]),
      },
      month: captalizeString(date[2])
    });
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
            <h1>{date?.day.week}, <span>{date?.day.month}</span></h1>
            <p><span>{total}</span> Tarefas</p>
          </div>

          <p>{date?.month}</p>
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
