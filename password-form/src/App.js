import './App.css';
import PasswordForm from './components/PasswordForm';

function App() {
  return (
    <div className="App">
      <div className="left-side">
        <img src="https://placeimg.com/640/480/any" alt="Image" />
      </div>
      <div className="right-side">
        <h1>Simple Password Form</h1>
        <PasswordForm />
      </div>
    </div>
  );
}

export default App;
