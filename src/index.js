import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'react-quill/dist/quill.snow.css';
import { AuthContextProvider } from './shared/context/auth-context';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
