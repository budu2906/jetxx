import './styles/reset-styles/normolize.css';
import './styles/reset-styles/reset.css';
import './styles/variables/variables.scss';
import './styles/style.scss';
import ReactDOM from 'react-dom/client';
import Routing from './app/routing/Routing';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Routing />
  </Provider>
);
