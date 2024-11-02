import React from 'react';
import { createRoot } from 'react-dom/client';

import './styles.css'
import App from './app';

const domNode = document.querySelector('#root');
const root = createRoot(domNode);

root.render(<App />);
