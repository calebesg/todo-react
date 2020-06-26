import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './App.css';

import captalizeString from './utils/captalizeString';

import Form from './components/Form';
import Todo from './components/Todo';

interface TodoData {
  title: string,
  checked: boolean,
  posted: number
};

interface DateBR {
  day: {
    week: string,
    month: number
  },
  month: string
};

function App() {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [date, setDate] = useState<DateBR>();

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    async function loadTodos() {
      const response = await localStorage.getItem('@react-todos');

      if (!response) return;

      const data = JSON.parse(response) as TodoData[];

      setTodos(data);
      
      setTotal(data.length);
    }

    loadTodos();
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
    const currentTodo = todos.find(item => item.posted === id);

    if (!currentTodo) return;

    const filteredItems = todos.map(todo => {
      
      if (todo.posted === id) {
        todo.checked = !todo.checked;
      }

      return todo;
    });

    setTodos(filteredItems);
  }

  async function saveTodo(todo: TodoData) {
    const data = [todo, ...todos];

    await localStorage.setItem('@react-todos', JSON.stringify(data));

    setTodos(data);

    setTotal(total + 1);
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

        <Form saveTodo={saveTodo} />
        
        <main>
          <ul>
            {todos.map(todo => (
              <li key={todo.posted}>
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
