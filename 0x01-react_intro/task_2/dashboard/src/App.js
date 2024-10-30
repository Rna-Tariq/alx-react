import logo from './Holberton-Logo.jpg';
import './App.css';
import { getFooterCopy, getFullYear } from './utils';

function App() {
  return (
    <div class="App">
      <div class="App-header">
        <img src={logo} class="App-logo" alt="logo"/>
        <h1>School dashboard</h1>
      </div>
      <div class="App-body">
        <p>Login to access the full dashboard</p>
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email"></input>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password"></input>
          <button>OK</button>
        </form>
      </div>
      <div class="App-footer">
        <p>Copyright {getFullYear()} - {getFooterCopy()}</p>
      </div>
    </div>
  );
}

export default App;
