import './styles/index.less';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './stores';
import { ELEMENT_ID_ROOT } from './consts/common';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById(ELEMENT_ID_ROOT),
);
