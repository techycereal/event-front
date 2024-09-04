import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header.jsx'
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <Header/>
    <App />
  </Provider>,
  </StrictMode>,
)
