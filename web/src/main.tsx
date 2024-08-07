import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './index.scss';
import { OktaWrapper } from './config/okta.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OktaWrapper>
      <App />
    </OktaWrapper>
  </React.StrictMode>,
)
