import React from 'react';
import logo from './logo.svg';
import './App.css';

//在渲染器进程 (网页) 中。
const { ipcRenderer } = window.electron;
ipcRenderer.on('main-msg', (event, arg) => {
  console.log(arg) // prints "好的"
})
ipcRenderer.send('renderer-msg', '帮我创建一个新的页面')

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React1232131
        </a>
      </header>
    </div>
  );
}

export default App;
