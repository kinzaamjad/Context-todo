import React, { useState, useContext } from 'react';
import './App.css';


const TodoContext = React.createContext();


const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);


  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

 
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
   
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
};


const useTodoContext = () => {
  return useContext(TodoContext);
};

const TodoForm = () => {
  const { addTodo } = useTodoContext();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='text-center'>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new todo..."
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

const TodoList = () => {
  const { todos, toggleTodo, removeTodo } = useTodoContext();

  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`text-center ${todo.completed ? 'completed' : ''}`}
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.text}
          <button className="delete-button" onClick={() => removeTodo(todo.id)}>
            Delete
          </button>
        

        </li>

      ))}
    </ul>
  );
};

const App = () => {
  return (
    // Step 5: Wrap the TodoProvider around the components that need access to the context
    <TodoProvider>
      <div className="container">
        <h1 className="title">Todo App</h1>
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;

















// import React, {createContext} from 'react';
// import CompA from './components/context/CompA';

// const FName = createContext()
// const LName = createContext()


// const App = () => {
//   return (
//     <>
//       <FName.Provider value={"Name1"}>
//         <LName.Provider value={"Name2"}>
//           <CompA />
//         </LName.Provider>
//       </FName.Provider>
//     </>
//   );
// };

// export default App;
// export {FName, LName}