import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './index.scss';
import { OktaWrapper } from './config/okta.tsx';
import { QueryWrapper } from './config/query.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OktaWrapper>
      <QueryWrapper>
        <App />
      </QueryWrapper>
    </OktaWrapper>
  </React.StrictMode>,
)
