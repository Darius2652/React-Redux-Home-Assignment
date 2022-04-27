import React from 'react';
import App from './App';
import './index.css';
import { storeFactory } from './components/redux/store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/cjs/react-dom.production.min';

import { COLUMNS } from './components/columns';
import { ITEMS } from './components/data';

const store = storeFactory(COLUMNS, ITEMS);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App
      store={store}
    />
  </Provider>
);
