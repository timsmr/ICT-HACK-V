import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.scss'
import App from './App'
import { RootStore, RootStoreContext } from './stores'

const rootElem = document.getElementById('root');

const store = new RootStore();

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem)
  root.render(
    <React.StrictMode>
      <RootStoreContext.Provider value={store}>
        <Router>
          <App />
        </Router>
      </RootStoreContext.Provider>
    </React.StrictMode>
  );
}


