import React from 'react';
import './App.css';
import Header from './components/Header/Header.jsx'
import Todo from './Projects/Todo/Todo';
function App() {
  return (
    <div className='App'>
    <Header/>
    <Todo/>
    </div>
  );
}

export default App;
