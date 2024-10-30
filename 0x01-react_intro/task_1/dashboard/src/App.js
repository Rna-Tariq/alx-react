import logo from './Holberton-Logo.jpg';
import './App.css';

function App() {
  return (
    <div class="App">
      <div class="App-header">
        <img src={logo} class="App-logo" alt="logo"/>
        <h1>School dashboard</h1>
      </div>
      <div class="App-body">
        <p>Login to access the full dashboard</p>
      </div>
      <div class="App-footer">
        <p>Copyright 2020 - holberton School</p>
      </div>
    </div>
  );
}

export default App;
